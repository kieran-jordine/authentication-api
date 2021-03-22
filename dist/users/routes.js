"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var Routes = /** @class */ (function () {
    function Routes(app) {
        this.app = app;
        this.configureRoutes();
    }
    Routes.prototype.configureRoutes = function () {
        console.log('configure routes');
        this.app.route('/')
            .all([
            function (req, res, next) {
                next();
            }
        ])
            .get(function (req, res) {
            res.status(200).send('Hello from N3M3S1S');
        });
        this.routerObject();
        this.app.route('/error')
            //.all((req, res, next) => {next('ALL ERROR')})
            .get(function (req, res) {
            //res.status(200).send('Error in N3M3S1S')
            throw Error('ERRORR');
        });
    };
    Routes.prototype.routerObject = function () {
        var router = express_1["default"].Router();
        router.use(function (req, res, next) {
            console.log('route on a router');
            next();
        });
        router.get('/router', [
            function (req, res) {
                res.status(200).send('N3M3S1S from a router object');
            }
        ]);
        this.app.use('/', router);
    };
    return Routes;
}());
exports["default"] = Routes;
