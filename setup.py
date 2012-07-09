from setuptools import setup

setup(name='OpenShift Mongo Twt',
      version='1.0',
      description='OpenShift Twitter clone using MongoDB',
      author='mebusw',
      author_email='mebusw@163.com',
      url='https://github.com/openshift/openshift-twt-mongo-demo',
      # dont install bottle requirement, bottle is included in source
      install_requires=['pymongo', 'Flask>=0.7.2', 'simplejson'],
      test_suite='tst',
     )
