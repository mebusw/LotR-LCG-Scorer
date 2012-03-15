OpenShift - Twt Mongo Demo

This repository is designed to be used with http://openshift.redhat.com/
applications.  To use, just follow the quickstart below.

Quickstart
==========

1) Create an account at http://openshift.redhat.com/

2) Create a python application and attach mongodb to it:

    rhc app create -a twt -t python-2.6
    rhc app cartridge add -a twt -c mongodb-2.0

3) Add this upstream repo

    cd twt
    git remote add upstream -m master git://github.com/openshift/openshift-twt-mongo-demo.git
    git pull -s recursive -X theirs upstream master

4) Then push the repo upstream

    git push

5) That's it, you can now browse to your application at:

    http://twt-$yournamespace.rhcloud.com
