# flatiron-cli-users

Encapsulated commands for managing users in flatiron CLI apps

## Example
At its core `flatiron-cli-users` is a broadway-compatible plugin which can be used by any `flatiron` application:

``` js
  var flatiron = require('flatiron'),
      app = flatiron.app;

  //
  // Configure the Application to be a CLI app with
  // a JSON configuration file `test-config.json`
  //
  app.name = 'app.js';
  app.config.file({ file: 'test-config.json' });
  app.use(flatiron.plugins.cli, {
    usage: 'A simple CLI app using flatiron-cli-users'
  });

  //
  // Expose CLI commands using `flatiron-cli-users`
  //
  app.use(require('flatiron-cli-users'));
  
  if (!module.parent) {
    //
    // Start the application
    //
    app.start();
  }
```

If you run the above script:

``` bash
  $ node app.js users create
```

The output will be:

```
  TODO: Put output here.
```

And the contents of `test-config.json` will be: 

```
  TODO: Put result here.
```

## API Documentation

### Commands exposed

``` bash
  $ node examples/app.js help users
  help:   `app.js users *` commands allow you to work with new
  help:   or existing Nodejitsu user accounts
  help:   
  help:   app.js users available <username>
  help:   app.js users changepassword
  help:   app.js users confirm <username> <inviteCode>
  help:   app.js users create
  help:   app.js users forgot <username> <shake>
  help:   app.js users login
  help:   app.js users logout
  help:   app.js users whoami
  help:   
  help:   You will be prompted for additional user information
  help:   as required.
```

### Options

``` js
  {
    //
    // TODO: Document additional options specific to this plugin.
    //
    
    //
    // Set of functions which will execute before named commands: get, set, list, delete
    //
    before: { list: function () { ... } }
  }
```

## Installation

### Installing npm (node package manager)
```
  curl http://npmjs.org/install.sh | sh
```

### Installing flatiron-cli-users
```
  [sudo] npm install flatiron-cli-users
```

## Run Tests
Tests are written in vows and give complete coverage of all APIs and storage engines.

``` bash
  $ npm test
```

#### Author: [Charlie Robbins](http://nodejitsu.com)
#### License: MIT