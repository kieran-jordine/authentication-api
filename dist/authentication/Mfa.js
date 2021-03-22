"use strict";
exports.__esModule = true;
var otplib_1 = require("otplib");
var Mfa = /** @class */ (function () {
    function Mfa() {
    }
    Mfa.prototype.secret = function () {
        return otplib_1.authenticator.generateSecret();
    };
    Mfa.prototype.authenticatorToken = function (secret) {
        return otplib_1.authenticator.generate(secret);
    };
    Mfa.prototype.authenticatorVerify = function (token, secret) {
        return otplib_1.authenticator.verify({ token: token, secret: secret });
    };
    Mfa.prototype.totpToken = function (secret) {
        return otplib_1.totp.generate(secret);
    };
    Mfa.prototype.totpVerify = function (token, secret) {
        return otplib_1.totp.verify({ token: token, secret: secret });
    };
    return Mfa;
}());
exports["default"] = new Mfa();
