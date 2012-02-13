/*
 * commands.js: CLI Commands related to managing users.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */

var cliUsers = require('./flatiron-cli-users');

exports.usage = [
  '`<app> users *` commands allow you to work with new',
  'or existing Nodejitsu user accounts',
  '',
  '<app> users available <username>',
  '<app> users changepassword',
  '<app> users create',
  '<app> users forgot <username> <shake>',
  '<app> users login',
  '<app> users logout',
  '<app> users signup',
  '<app> users whoami',
  '',
  'You will be prompted for additional user information',
  'as required.'
];

exports.login = function (callback) {
  cliUsers.app.setupUserNoWarn(callback);
};

//
// Usage for `<app> login`
//
exports.login.usage = [
  'Allows the user to login',
  '',
  '<app> users login',
  '<app> login'
];

//
// ### function logout (callback)
// #### @callback {function} Continuation to pass control to when complete.
// Attempts to logout current user by removing the name from application config.
//
exports.logout = function (callback) {
  cliUsers.app.config.clear('username');
  cliUsers.app.config.clear('password');

  cliUsers.app.config.save(function (err) {
    if (err) {
      return callback(err, true);
    }
    
    cliUsers.app.log.info('User has been logged out');
    callback();
  });
};

//
// Usage for `<app> logout`
//
exports.logout.usage = [
  'Logs out the current user',
  '',
  '<app> logout',
  '<app> users logout'
];

//
// ### function whoami (callback)
// #### @callback {function} Continuation to pass control to when complete.
// Retrieves the name of the current logged in user
//
exports.whoami = function (callback) {
  var username = cliUsers.app.config.get('username') || 'not logged in'
  cliUsers.app.log.info('You are: ' + username.magenta);
};

//
// Usage for `<app> logout`
//
exports.whoami.usage = [
  'Displays the current logged in user',
  '',
  '<app> whoami',
  '<app> users whoami'
];