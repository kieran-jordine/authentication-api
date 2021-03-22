"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
router.get('/', function (req, res) {
    res.status(200).send('user home');
});
router.all('/confirm-password', [
    function (req, res) {
        var _a = req.body, action_code = _a.action_code, new_password = _a.new_password;
        res.status(200).json('confirm password ');
    }
]);
router.all('/create-user-with-email-and-password', [
    function (req, res) {
        var _a = req.body, email = _a.email, password = _a.password;
        res.status(200).json(req.body);
    },
]);
router.all('/current-user', [
    function (req, res) {
        res.status(200).json('current user');
    }
]);
router.all('/fetch-signin-methods', [
    function (req, res) {
        var email = req.body.email;
        res.status(200).json('fetch signin methods');
    }
]);
router.all('/is-signin-with-email-link', [
    function (req, res) {
        var link = req.body.link;
        res.status(200).json('is signin with email link');
    }
]);
router.all('/send-password-reset-link', [
    function (req, res) {
        var email = req.body.email;
        res.status(200).json('send password reset link');
    }
]);
router.all('/send-signin-with-email-link', [
    function (req, res) {
        var email = req.body.email;
        res.status(200).json('send signin with email link');
    }
]);
router.all('/language-code', [
    function (req, res) {
        var language_code = req.body.language_code;
        res.status(200).json('set language code');
    }
]);
router.all('/signin-anonymously', [
    function (req, res) {
        res.status(200).json('signin anonymously');
    }
]);
router.all('/signin-with-email-and-link', [
    function (req, res) {
        res.status(200).json('signin with email and link');
    }
]);
router.all('/signin-with-email-and-password', [
    function (req, res) {
        res.status(200).json('signin with email and password');
    }
]);
router.all('/signin-with-credential', [
    function (req, res) {
        res.status(200).json('signin with credential');
    }
]);
router.all('/signin-with-phone', [
    function (req, res) {
        res.status(200).json('signin with phone');
    }
]);
router.all('/signin-with-token', [
    function (req, res) {
        res.status(200).json('signin with token');
    }
]);
router.all('/signout', [
    function (req, res) {
        res.status(200).json('signout');
    }
]);
router.all('/verify-phone-number', [
    function (req, res) {
        res.status(200).json('verify phone number');
    }
]);
exports["default"] = router;
