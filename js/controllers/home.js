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

// Define the home controller.
App.HomeController = Ember.Controller.extend({
  // Actions.
  actions: {
    /**
     * Pings the Kinvey service.
     */
    ping: function() {
      var _this = this;
      Kinvey.ping().then(function(value) {
        _this.set('response', value);
      });
    },

    /**
     * Signs out the user.
     */
    signout: function() {
      var _this = this;
      return Kinvey.getActiveUser().logout().catch(function(error) {
        _this.set('error', error);
      });
    },

    /**
     * Creates a new user.
     */
    signup: function() {
      var _this = this;
      return Kinvey.User.signup().catch(function(error) {
        _this.set('error', error);
      });
    }
  }
});