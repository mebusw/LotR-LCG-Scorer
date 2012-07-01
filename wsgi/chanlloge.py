#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import uuid
import bottle
#import pymongo
import time
import simplejson as json

bottle.debug(True)



#################################
# REST API Methods of CHALLONGE!
# http://challonge.com/api
#
#################################

@bottle.route('/tournaments/', method='GET')
def tournaments_index():
    return json.dumps(['tournaments', 'index', [u'baz', None, 1.0, 2]])

@bottle.route('/tournaments/<tid:int>', method='GET')
def tournaments_show(tid):
    return json.dumps(['tournaments', 'show', {'tid': tid}, [u'baz', None, 1.0, 2]])

@bottle.route('/tournaments/<tid>', method='POST')
def tournaments_publish(tid):
    return json.dumps(['tournaments', 'publish', {'tid': tid}, [u'baz', None, 1.0, 2]])



@bottle.route('/tournaments/<tid>/participants', method='GET')
def participants_index(tid):
    return json.dumps(['participants', 'index', {'tid': tid}, [u'baz', None, 1.0, 2]])

@bottle.route('/tournaments/<tid>/participants/<pid>', method='PUT')
def participants_update(tid, pid):
    return json.dumps(['participants', 'update', {'tid': tid}, {'pid': pid}, [u'baz', None, 1.0, 2]])


#@bottle.route('/static/<filename>')
#def server_static(filename):
#    return bottle.static_file(filename, root='/Users/mebusw/Desktop/lotr-cloud/lotr/wsgi/static')

@bottle.route('/scorer/<path:path>')
def server_static(path):
    return bottle.static_file(path, root='/Users/mebusw/Desktop/lotr-cloud/lotr/wsgi/static/lotr-scorer')


if __name__ == '__main__':
    bottle.default_app()
    bottle.run(reloader=True)



