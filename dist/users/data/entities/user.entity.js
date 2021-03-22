"use strict";
exports.__esModule = true;
var nanoid_1 = require("nanoid");
var User = /** @class */ (function () {
    function User() {
        this.display_name = '';
        this.phone_number = null;
        this.photo_url = null;
        this.is_anonymous = false;
        this.is_email_verified = false;
        this.is_mfa_enabled = false;
        this.uid = nanoid_1.nanoid(32);
        this.display_name = '';
    }
    User.prototype.toJson = function () {
        return JSON.parse(JSON.stringify(this));
    };
    User.prototype.toString = function () {
        return JSON.stringify(this);
    };
    User.fromJson = function (result) {
        if (result) {
            var user = new User();
            user.uid = result["uid"];
            user.email = result["email"];
            user.display_name = result["display_name"];
            user.phone_number = result["phone_number"];
            user.photo_url = result["photo_url"];
            user.is_anonymous = result["is_anonymous"];
            user.is_email_verified = result["is_email_verified"];
            user.is_mfa_enabled = result["is_mfa_enabled"];
            return user;
        }
        return null;
    };
    return User;
}());
exports["default"] = User;
