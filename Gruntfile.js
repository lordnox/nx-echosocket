var project = require('./project');

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    project: project
  , watch: {
      dist: {
        files: '<%= project.src %>/*'
      , tasks: ['coffee:dist', 'simplemocha:backend']
      }
    , test: {
        files: '<%= project.srcTest %>/specs/*'
      , tasks: ['coffee:test', 'simplemocha:backend']
      }
    , app: {
        files: ['<%= project.apppath %>/*.js', '<%= project.apppath %>/*.coffee'],
        tasks: ['start'],
        options: {
          nospawn: true
        }
      }
    }
  , nodemon: {
      app: {
        script: '<%= project.files.app %>'
      , options: {
          ext: 'js,coffee'
        , env: {
            PORT: project.server.devPort
          , DEBUG: 'nx-*'
          }
        }
      }
    }
  , simplemocha: {
      options: {
        globals: [
        'sinon'
      , 'chai'
      , 'should'
      , 'expect'
      , 'assert'
      , 'AssertionError'
        ]
      , timeout: 3000
      , ignoreLeaks: false
      , ui: 'bdd'
      , reporter: 'spec'
      }
    , backend: {
        src: [
          // add chai and sinon globally
          'test/support/globals.js'

          // tests
        , 'specs/{**,*}/*.js'
        , 'specs/{**,*}/*.coffee'
        ]
      }
    }
  });
};
