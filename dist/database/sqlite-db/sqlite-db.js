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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var sqlite3_1 = __importDefault(require("sqlite3"));
var sqlite_1 = require("sqlite");
var nanoid_1 = require("nanoid");
var SqliteDb = /** @class */ (function () {
    function SqliteDb() {
        var _this = this;
        sqlite_1.open({
            filename: __dirname + '/sqlite-database.db',
            driver: sqlite3_1["default"].Database,
            mode: sqlite3_1["default"].OPEN_READWRITE | sqlite3_1["default"].OPEN_CREATE
        })
            .then(function (db) {
            _this.db = db;
            var usersTable = "CREATE TABLE IF NOT EXISTS users (\n                uid TEXT PRIMARY KEY,\n                created_at TEXT,\n                updated_at TEXT,\n                email TEXT,\n                password TEXT,\n                display_name TEXT,\n                phone_number TEXT,\n                photo_url TEXT,\n                is_anonymous INTEGER DEFAULT 0,\n                is_email_verified INTEGER DEFAULT 0,\n                is_mfa_enabled INTEGER DEFAULT 0)";
            var authTable = "CREATE TABLE IF NOT EXISTS auth (\n                uid TEXT PRIMARY KEY,\n                created_at TEXT,\n                updated_at TEXT,\n                user_uid TEXT,\n                secret TEXT)";
            Promise.all([_this.db.run(usersTable), _this.db.run(authTable)]);
        });
    }
    SqliteDb.prototype.executeSql = function (sql) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.db.run(sql)];
                }
            });
        });
    };
    SqliteDb.prototype.tables = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.db.all("SELECT name, sql FROM sqlite_master WHERE type='table'")];
                }
            });
        });
    };
    SqliteDb.prototype.describeTables = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.db.all("pragma table_info('users')")];
                }
            });
        });
    };
    SqliteDb.prototype.insert = function (tableName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var date, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        if (!data.uid) {
                            data.uid = nanoid_1.nanoid(32);
                        }
                        date = new Date().toISOString();
                        data.created_at = date;
                        data.updated_at = date;
                        sql = "INSERT INTO " + tableName + " (" + Object.keys(data) + ") VALUES (" + Object.keys(data).map(function (k) { return '?'; }) + ")";
                        return [2 /*return*/, this.db.run(sql, Object.values(data))];
                }
            });
        });
    };
    SqliteDb.prototype.update = function (tableName, values, id) {
        return __awaiter(this, void 0, void 0, function () {
            var el, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        values.updated_at = new Date().toISOString();
                        el = '';
                        el = Object.keys(values).reduce(function (acc, item) {
                            return acc + ' ' + item + ' = ?,';
                        }, '');
                        el = el.replace(/,$/, ' ');
                        sql = "UPDATE " + tableName + " SET" + el + "WHERE uid = ?";
                        return [2 /*return*/, this.db.run(sql, __spreadArray(__spreadArray([], Object.values(values)), [id]))];
                }
            });
        });
    };
    SqliteDb.prototype.retrieve = function (tableName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.db.all("SELECT * FROM " + tableName)];
                }
            });
        });
    };
    SqliteDb.prototype.retrieveById = function (tableName, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.db.get("SELECT * FROM " + tableName + " WHERE uid = ?", id)];
                }
            });
        });
    };
    SqliteDb.prototype.retrieveByProperty = function (tableName, props) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        el = '';
                        el = Object.keys(props).reduce(function (acc, item) {
                            return acc + ' ' + item + ' = ? AND';
                        }, '');
                        el = el.replace(/AND$/, '');
                        return [2 /*return*/, this.db.get("SELECT * FROM " + tableName + " WHERE " + el, Object.values(props))];
                }
            });
        });
    };
    SqliteDb.prototype.clear = function (tableName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.db.run("DELETE FROM " + tableName)];
                }
            });
        });
    };
    SqliteDb.prototype.deleteById = function (tableName, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.db.run("DELETE FROM " + tableName + " WHERE uid = ?", id)];
                }
            });
        });
    };
    SqliteDb.prototype.deleteByProperty = function (tableName, property, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureInitialization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.db.run("DELETE FROM " + tableName + " WHERE " + property + " = ?", value)];
                }
            });
        });
    };
    SqliteDb.prototype.deleteTable = function (tableName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.executeSql("DROP TABLE IF EXISTS " + tableName)];
            });
        });
    };
    SqliteDb.prototype.ensureInitialization = function (tries) {
        if (tries === void 0) { tries = 0; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.db) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                    case 1:
                        _a.sent();
                        if (!this.db) {
                            if (tries < 3) {
                                this.ensureInitialization(++tries);
                            }
                            return [2 /*return*/, false];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, true];
                }
            });
        });
    };
    return SqliteDb;
}());
exports["default"] = new SqliteDb();
