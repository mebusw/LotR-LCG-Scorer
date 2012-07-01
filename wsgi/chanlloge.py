#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import uuid
import bottle
import pymongo
import time
#import simplejson as json

bottle.debug(True)

mongo_con = pymongo.Connection(
  os.environ['OPENSHIFT_NOSQL_DB_HOST'],
  int(os.environ['OPENSHIFT_NOSQL_DB_PORT']))

mongo_db = mongo_con[os.environ['OPENSHIFT_APP_NAME']]
mongo_db.authenticate(os.environ['OPENSHIFT_NOSQL_DB_USERNAME'],
                      os.environ['OPENSHIFT_NOSQL_DB_PASSWORD'])

def user_find(userid):
  if not userid: return None
  return mongo_db.users.find_one({ '_id': userid})

def user_create(username, password):
  if not username: return None
  # check for pre existance
  tuser = user_find(username)
  if tuser: return None

  nuser = {
    '_id': username,
    'pw': password,
    'follower': [ ],
    'followee': [ ],
    'timeline': [ ],
    'posts': [ ],
    }
  userid = mongo_db.users.insert(nuser)
  return userid

def user_list():
  l = []
  for u in mongo_db.users.find():
    l.append(u['_id'])
  l.sort()
  return l

def user_follow(user, tuser):
  user['followee'].append(tuser['_id'])
  mongo_db.users.update({ '_id': user['_id']}, user)
  tuser['follower'].append(user['_id'])
  mongo_db.users.update({ '_id': tuser['_id']}, tuser)
  return

def user_unfollow(user, tuser):
  if tuser['_id'] in user['followee']:
    user['followee'].remove(tuser['_id'])
  mongo_db.users.update({ '_id': user['_id']}, user)
  if user['_id'] in tuser['follower']:
    tuser['follower'].remove(user['_id'])
  mongo_db.users.update({ '_id': tuser['_id']}, tuser)
  return

def user_auth(user, pw):
  if not user: return False
  return user['pw'] == pw

def post_create(user, content):
  npost = {
    '_id': uuid.uuid4().hex,
    'uid': user['_id'],
    'content': content,
    }
  post_id = mongo_db.posts.insert(npost)
  user['posts'].append(post_id)
  user['timeline'].append(post_id)
  mongo_db.users.update({ '_id': user['_id']}, user)
  for follower_uid in user['follower']:
    follower_user = user_find(follower_uid)
    if not follower_user: continue
    follower_user['timeline'].append(post_id)
    mongo_db.users.update({ '_id': follower_user['_id']}, follower_user)
  return

def post_find_by_id(post_id):
  if not post_id: return None
  return mongo_db.posts.find_one({ '_id': post_id})

#################################
# REST API Methods of CHALLONGE!
# http://challonge.com/api
#
#################################

@bottle.route('/tournaments/', method='GET')
def tournaments_index():
    return [u'foo', {u'bar': [u'baz', None, 1.0, 2]}]



@bottle.route('/home')
def home():
  session = get_session()
  if not session: bottle.redirect('/login')
  luser = user_find(session['uid'])
  if not luser: bottle.redirect('/logout')
  postlist = []
  for post_id in luser['timeline']:
    post = post_find_by_id(post_id)
    if post:
      postlist.insert(0, post)

  # bottle.TEMPLATES.clear()
  return bottle.template('timeline',
                         postlist=postlist,
                         userlist=user_list(),
                         page='timeline',
                         username=luser['_id'],
                         logged=True)

@bottle.route('/<name>')
def user_page(name):
  session = get_session()
  luser = user_find(session['uid'])
  if not luser: bottle.redirect('/logout')
  tuser = user_find(name)
  if not tuser: return bottle.HTTPError(code=404)
  himself = session['uid'] == tuser['_id']
  postlist = []
  for post_id in tuser['posts']:
    post = post_find_by_id(post_id)
    if post:
      postlist.insert(0, post)

  # bottle.TEMPLATES.clear()
  return bottle.template('user',
                         postlist=postlist,
                         userlist=user_list(),
                         page='user',
                         username=tuser['_id'],
                         logged=True,
                         is_following=tuser['_id'] in luser['followee'],
                         himself=himself)
  
@bottle.route('/<name>/statuses/<id>')
def status(name,id):
  session = get_session()
  post = post_find_by_id(id)
  if not post:
    return bottle.HTTPError(code=404, message='tweet not found')
  return bottle.template('single',
                         username=post['uid'],
                         tweet_id=id,
                         tweet_text=post['content'],
                         page='single',
                         logged=(session != None))

@bottle.route('/post', method='POST')
def post():
  session = get_session()
  if not session: bottle.redirect('/login')
  luser = user_find(session['uid'])
  if not luser: bottle.redirect('/logout')
  content = bottle.request.POST['content']
  post_create(luser, content)
  bottle.redirect('/home')

@bottle.route('/follow/<name>', method='POST')
def follow(name):
  session = get_session()
  if not session: bottle.redirect('/login')
  luser = user_find(session['uid'])
  if not luser: bottle.redirect('/logout')
  tuser = user_find(name)
  if tuser: user_follow(luser, tuser)
  bottle.redirect('/%s' % name)

@bottle.route('/unfollow/<name>', method='POST')
def unfollow(name):
  session = get_session()
  if not session: bottle.redirect('/login')
  luser = user_find(session['uid'])
  if not luser: bottle.redirect('/logout')
  tuser = user_find(name)
  if tuser: user_unfollow(luser, tuser)
  bottle.redirect('/%s' % name)

@bottle.route('/signup')
@bottle.route('/login')
def get_login():
  session = get_session()
  # bottle.TEMPLATES.clear()
  if session: bottle.redirect('/home')
  return bottle.template('login',
			 page='login',
			 error_login=False,
			 error_signup=False,
			 logged=False)

@bottle.route('/login', method='POST')
def post_login():
  if 'name' in bottle.request.POST and 'password' in bottle.request.POST:
    name = bottle.request.POST['name']
    password = bottle.request.POST['password']
    user = user_find(name)
    if user_auth(user, password):
      save_session(user['_id'])
      bottle.redirect('/home')
  return bottle.template('login',
			 page='login',
			 error_login=True,
			 error_signup=False,
			 logged=False)

@bottle.route('/logout')
def logout():
  invalidate_session()
  bottle.redirect('/')

@bottle.route('/signup', method='POST')
def post_signup():
  if 'name' in bottle.request.POST and 'password' in bottle.request.POST:
    name = bottle.request.POST['name']
    password = bottle.request.POST['password']
    if name not in reserved_usernames.split():
      userid = user_create(name, password)
      if userid:
        save_session(userid)
        bottle.redirect('/home')
    return bottle.template('login',
			   page='login',
			   error_login=False,
			   error_signup=True,
			   logged=False)






