"use strict";
exports.__esModule = true;
var nanoid_1 = require("nanoid");
var User = /** @class */ (function () {
    function User() {
        this.phone_number = null;
        this.photo_url = null;
        this.is_anonymous = false;
        this.is_email_verified = false;
        this.uid = nanoid_1.nanoid(32);
        this.display_name = '';
    }
    User.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return User;
}());
exports["default"] = User;
