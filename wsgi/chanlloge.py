#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import uuid
import bottle
#import pymongo
import time
import simplejson as json

from bottle import route, request, response

bottle.debug(True)



#################################
# REST API Methods of CHALLONGE!
# http://challonge.com/api
#
#################################

@route('/tournaments/', method='GET')
def tournaments_index():
    #query var
    page = request.query.page or '1'
    
    return json.dumps(['tournaments', 'index', [u'utf8', u"\u8ffd\u8e2a\u5495\u565c", None, 1.0, 2, {u'page': page}]], ensure_ascii=False)


@route('/tournaments/<tid>', method='GET')
def tournaments_show(tid):
    return json.dumps(['tournaments', 'show', {'tid': tid}, [u'baz', None, 1.0, 2]])


@route('/tournaments/<tid>', method='POST')
def tournaments_publish(tid):
    #form fields
    name = request.forms.get('name')
    
    return json.dumps(['tournaments', 'publish', {'tid': tid}, [u'baz', None, 1.0, 2, {'name': name}]])



@route('/tournaments/<tid>/participants', method='GET')
def participants_index(tid):
    return json.dumps(['participants', 'index', {'tid': tid}, [u'baz', None, 1.0, 2]])

@route('/tournaments/<tid>/participants/<pid>', method='PUT')
def participants_update(tid, pid):
    name = request.forms.get('name')
    return json.dumps(['participants', 'update', {'tid': tid}, {'pid': pid}, [u'baz', None, 1.0, 2, {'name': name}]])


@route('/static/<filename:path>')
def server_static(filename):
    return bottle.static_file(filename, root='./wsgi/static')


if __name__ == '__main__':
    bottle.default_app()
    bottle.run(reloader=True)



