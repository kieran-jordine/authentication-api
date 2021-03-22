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
var cors_1 = __importDefault(require("cors"));
var user_routes_1 = __importDefault(require("./users/routes/user.routes"));
var sqlite_db_1 = __importDefault(require("./database/sqlite-db/sqlite-db"));
//import sqliteDb from './database/sqlite-db/sqlite-db'
//import User from './users/data/entities/user.entity'
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(cors_1["default"]());
app.use(user_routes_1["default"]);
app.use('/user', user_routes_1["default"]); //router object
//default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ message: err });
    //next(err) 
});
exports["default"] = app;
function f() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, e_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 3, , 4]);
                    //const secret = Mfa.secret()
                    //console.log('secret', secret)
                    //const token = Mfa.totpToken(secret)
                    //const v1 = Mfa.totpVerify(token, secret)
                    //console.log(token, v1)
                    //await sqliteDb.deleteById('users', "pGavs9zbBjsgd5tfgGDvn6tFjB46rsco")
                    //console.log(await sqliteDb.clear('auth'))
                    _b = (_a = console).log;
                    _c = ['auth'];
                    return [4 /*yield*/, sqlite_db_1["default"].retrieve('auth')];
                case 1:
                    //const secret = Mfa.secret()
                    //console.log('secret', secret)
                    //const token = Mfa.totpToken(secret)
                    //const v1 = Mfa.totpVerify(token, secret)
                    //console.log(token, v1)
                    //await sqliteDb.deleteById('users', "pGavs9zbBjsgd5tfgGDvn6tFjB46rsco")
                    //console.log(await sqliteDb.clear('auth'))
                    _b.apply(_a, _c.concat([_g.sent()]));
                    _e = (_d = console).log;
                    _f = ['users'];
                    return [4 /*yield*/, sqlite_db_1["default"].retrieve('users')];
                case 2:
                    _e.apply(_d, _f.concat([_g.sent()]));
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _g.sent();
                    console.error(e_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
f();
