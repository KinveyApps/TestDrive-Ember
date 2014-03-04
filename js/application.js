/**
 * Copyright (c) 2014 Kinvey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Replace `appKey` and `appSecret` with the app credentials obtained through
// the Kinvey console.
var kinveyOptions = {
  appKey    : 'App Key',
  appSecret : 'App Secret',
  debug     : true // Show debug messages.
};

// Register the Kinvey initializer.
Ember.Application.initializer({
  name       : 'kinvey',
  initialize : function(container, application) {
    // `Kinvey.init` returns a boolean indicating whether there is an
    // active user. If so, reload the user to fetch all its attributes
    // (username, e-mail etc.).
    var isLoggedIn = Kinvey.init(container, application, kinveyOptions);
    if(isLoggedIn) {
      Kinvey.getActiveUser().reload();
    }
  }
});

// Register an initializer to inject the active user into our controllers.
Ember.Application.initializer({
  name       : 'activeUser',
  after      : 'kinvey',
  initialize : function(container, application) {
    application.inject('controller', 'activeUser', 'user:active');
  }
});

// Create the application.
var App = Ember.Application.create();