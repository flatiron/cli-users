/*
 * flatiron-cli-users.js: Top-level include for the `flatiron-cli-users` module. 
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */

var common = require('flatiron').common;

var cliUsers = exports;

//
// Expose commands and name this plugin
//
cliUsers.commands = require('./commands');
cliUsers.name = 'cli-users';

//
// ### function attach (options)
// #### @options {Object} Options to use when attaching.
// Attaches the `flatiron-cli-users` behavior to the application.
//
cliUsers.attach = function (options) {
  var app = this;
  options = options || {};
  
  if (!app.plugins.cli) {
    throw new Error('`cli` plugin is required to use `flatiron-cli-users`');
  }
  else if (!app.config) {
    throw new Error('`app.config` must be set to use `flatiron-cli-users`');
  }
  
  if (app.config.stores.literal) {
    app.config.remove('literal');
  }
  
  cliUsers.app = app;
  cliUsers.before = options.before || {};
  common.templateUsage(app, cliUsers.commands);
  
  app.commands['users'] = app.commands['users'] || {};
  app.commands['users'] = common.mixin(app.commands['users'], cliUsers.commands);
  
  //
  // Setup aliases for `<app> users *` commands.
  //
  app.alias('login',  { resource: 'users', command: 'login' });
  app.alias('logout', { resource: 'users', command: 'logout' });
  app.alias('whoami', { resource: 'users', command: 'whoami' });
};

//
// ### function detach ()
// Detaches this plugin from the application.
//
cliUsers.detach = function () {
  var app = this;
  
  Object.keys(app.commands['users']).forEach(function (method) {
    if (cliUsers.commands[method]) {
      delete app.commands['config'][method];
    }
    
    cliUsers.commands.app = null;
  });
};