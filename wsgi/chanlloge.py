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


#################################
# REST API Methods of CHALLONGE!
# http://challonge.com/api
#
#################################

@bottle.route('/tournaments/', method='GET')
def tournaments_index():
    return [u'index', {u'bar': [u'baz', None, 1.0, 2]}]

@bottle.route('/tournaments/<tid>', method='GET')
def tournaments_show(tid):
    return [u'show', {u'tid': [u'baz', None, 1.0, 2]}]







