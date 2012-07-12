#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import uuid
import bottle
#import pymongo
import MySQLdb
import time
import simplejson as json

from bottle import route, request, response

bottle.debug(True)

conn = MySQLdb.connect(host=os.environ['OPENSHIFT_DB_HOST'], port=int(os.environ['OPENSHIFT_DB_PORT']), user=os.environ['OPENSHIFT_DB_USERNAME'],passwd=os.environ['OPENSHIFT_DB_PASSWORD'], db=os.environ['OPENSHIFT_APP_NAME'], charset="utf8")


#################################
# RESTful API Methods of LOTR!
# 
#
#################################

@route('/packages', method='GET')
def packages_index():
    #query var
    page = request.query.page or '1'
    
    sql = 'SELECT * from package'
    cursor = conn.cursor()
    cursor.execute(sql)
    cds = cursor.fetchall()
    print cds
    
    r = ['package', 'index', {'page': page}, []]
    for c in cds:
        a = c[0:4]
        a.append(unicode(c[4]))
        r[3].append(a)
            
    
    return json.dumps(r, ensure_ascii=False)


@route('/packages/<pid>', method='GET')
def packages_show(pid):
    #query var
    page = request.query.page or '1'
    
    sql = 'SELECT * from package where id=%s' % pid
    cursor = conn.cursor()
    cursor.execute(sql)
    cds = cursor.fetchall()
    print cds
    
    return json.dumps(['package', 'show', {'pid': pid}, [u'baz', None, 1.0, 2, {u'page': page}], unicode(cds), '>>>'], ensure_ascii=False)

@route('/static/<filename:path>')
def server_static(filename):
    return bottle.static_file(filename, root='./wsgi/static')


if __name__ == '__main__':
    bottle.default_app()
    bottle.run(reloader=True)



