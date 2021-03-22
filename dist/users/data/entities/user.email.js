"use strict";
exports.__esModule = true;
var nanoid_1 = require("nanoid");
var EmailUser = /** @class */ (function () {
    function EmailUser() {
        this.phone_number = null;
        this.photo_url = null;
        this.is_anonymous = false;
        this.is_email_verified = false;
        this.uid = nanoid_1.nanoid();
        this.display_name = '';
    }
    EmailUser.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return EmailUser;
}());
exports["default"] = EmailUser;
