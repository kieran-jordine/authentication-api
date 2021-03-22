"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var encryption_1 = __importDefault(require("../../authentication/encryption"));
var user_entity_1 = __importDefault(require("../data/entities/user.entity"));
var middleware_1 = require("../middleware/middleware");
var services_1 = __importDefault(require("../services/services"));
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
    middleware_1.checkIfEmailValid, middleware_1.checkIfPasswordStrong,
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, user, _b, token;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    user = new user_entity_1["default"]();
                    user.email = email;
                    _b = user;
                    return [4 /*yield*/, encryption_1["default"].argonHash(password)];
                case 1:
                    _b.password = _c.sent();
                    return [4 /*yield*/, services_1["default"].createUserWithEmailAndPassword(user)];
                case 2:
                    _c.sent();
                    delete user.password;
                    token = encryption_1["default"].jwtSign1({ id: user.uid });
                    res.header("Access-Control-Expose-Headers", "Authorization")
                        .header('Authorization', "Bearer " + token)
                        .status(200).json(user);
                    return [2 /*return*/];
            }
        });
    }); },
]);
router.all('/current-user', [
    middleware_1.checkAuthentication,
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.status(200).json(req.body.user);
            return [2 /*return*/];
        });
    }); }
]);
router.all('/fetch-signin-methods', [
    function (req, res) {
        var email = req.body.email;
        res.status(200).json('fetch signin methods');
    }
]);
router.all('/mfa_status', [
    middleware_1.checkAuthentication,
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var mfa_enabled, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mfa_enabled = req.body.mfa_enabled;
                    return [4 /*yield*/, services_1["default"].setMfaStatus(req.body.user.uid, mfa_enabled)];
                case 1:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [2 /*return*/];
            }
        });
    }); }
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
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, user, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, services_1["default"].signinWithEmailAndPassword(email, password)];
                case 1:
                    user = _b.sent();
                    if (user) {
                        req.body.user = user;
                        next();
                    }
                    else {
                        next('Error retrieving user');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    next(e_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var user, code, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    user = req.body.user;
                    if (!!user.is_mfa_enabled) return [3 /*break*/, 1];
                    next();
                    return [3 /*break*/, 3];
                case 1:
                    code = req.body.multi_factor_code;
                    return [4 /*yield*/, services_1["default"].verify2ndFactor(code, user.uid)];
                case 2:
                    if (_a.sent()) {
                        next();
                    }
                    else {
                        next('Invalid multi-factor code');
                    }
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    res.status(500).json(e_2.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            try {
                user = req.body.user;
                token = encryption_1["default"].jwtSign1({ id: user.uid });
                res.header("Access-Control-Expose-Headers", "Authorization")
                    .header('Authorization', "Bearer " + token)
                    .status(200).json(user);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
            return [2 /*return*/];
        });
    }); }
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
