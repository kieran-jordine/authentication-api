"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var crypto = __importStar(require("crypto"));
var fs = __importStar(require("fs"));
var jwt = __importStar(require("jsonwebtoken"));
var argon2 = __importStar(require("argon2"));
var Encryption = /** @class */ (function () {
    function Encryption(modulusLength, algorithm, //sha256
    encoding) {
        if (modulusLength === void 0) { modulusLength = 2048; }
        if (algorithm === void 0) { algorithm = 'sha512'; }
        if (encoding === void 0) { encoding = 'base64'; }
        this.modulusLength = modulusLength;
        this.algorithm = algorithm;
        this.encoding = encoding;
        this.jwtOptions = {
            algorithm: 'RS512',
            expiresIn: '1h'
        };
    }
    Encryption.prototype.jwtSign1 = function (payload) {
        try {
            //return jwt.sign(payload, 'secret')
            var privateKey = fs.readFileSync(__dirname + '/private-key.pem');
            return jwt.sign(payload, privateKey, this.jwtOptions);
        }
        catch (e) {
            throw e;
        }
    };
    Encryption.prototype.jwtVerify1 = function (token) {
        try {
            var publicKey = fs.readFileSync(__dirname + '/public-key.pem');
            return jwt.verify(token, publicKey, this.jwtOptions);
        }
        catch (e) {
            throw e;
        }
    };
    Encryption.prototype.argonHash = function (plain) {
        return argon2.hash(plain);
    };
    Encryption.prototype.argonVerify = function (hash, plain) {
        return argon2.verify(hash, plain);
    };
    Encryption.prototype.encryptSymmetric = function (data, id) {
        var algo = 'AES256';
        var inputEncode = 'utf8';
        var outputEncode = 'hex';
        var ivLength = 16;
        var key32 = Buffer.from(id); //32 length
        var iv = crypto.randomBytes(ivLength);
        var cipher = crypto.createCipheriv(algo, key32, iv);
        var enc = cipher.update(data, inputEncode, outputEncode);
        enc += cipher.final(outputEncode);
        return { enc: enc, iv: iv.toString('hex') };
    };
    Encryption.prototype.decryptSymmetric = function (data, id, iv) {
        var algo = 'AES256';
        var inputEncode = 'utf8';
        var outputEncode = 'hex';
        var key32 = Buffer.from(id); //32 length
        var decipher = crypto.createDecipheriv(algo, key32, Buffer.from(iv, 'hex'));
        var dec = decipher.update(data, outputEncode, inputEncode);
        dec += decipher.final();
        return dec;
    };
    Encryption.prototype.encrypt = function (message) {
        if (!this.filesExists())
            this.generateKeys();
        var publicKey = fs.readFileSync(__dirname + '/public-key.pem', 'utf8');
        var enc = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: this.algorithm
        }, Buffer.from(message));
        return enc.toString(this.encoding);
    };
    Encryption.prototype.decrypt = function (message) {
        var privateKey = fs.readFileSync(__dirname + '/private-key.pem', 'utf8');
        var dec = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: this.algorithm
        }, Buffer.from(message, this.encoding)).toString();
        return dec;
    };
    Encryption.prototype.sign1 = function (data) {
        var key = {
            key: fs.readFileSync(__dirname + '/private-key.pem', 'utf8'),
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING
        };
        var sign = crypto.sign(this.algorithm, Buffer.from(data), key);
        return sign.toString(this.encoding);
    };
    Encryption.prototype.verify1 = function (data, signature) {
        var key = {
            key: fs.readFileSync(__dirname + '/public-key.pem', 'utf8'),
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING
        };
        return crypto.verify(this.algorithm, Buffer.from(data), key, Buffer.from(signature, this.encoding));
    };
    Encryption.prototype.sign2 = function (data) {
        var sign = crypto.createSign(this.algorithm);
        sign.update(data).end();
        var signature = sign.sign(fs.readFileSync(__dirname + '/private-key.pem', 'utf8'));
        return signature.toString(this.encoding);
    };
    Encryption.prototype.verify2 = function (data, signature) {
        var verifier = crypto.createVerify(this.algorithm);
        verifier.update(data);
        return verifier.verify(fs.readFileSync(__dirname + '/public-key.pem', 'utf8'), Buffer.from(signature, this.encoding));
    };
    Encryption.prototype.generateKeys = function () {
        var keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: this.modulusLength,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        });
        fs.writeFileSync(__dirname + '/public-key.pem', keyPair.publicKey);
        fs.writeFileSync(__dirname + '/private-key.pem', keyPair.privateKey);
    };
    Encryption.prototype.filesExists = function () {
        return fs.existsSync(__dirname + '/public-key.pem') && fs.existsSync(__dirname + '/private-key.pem');
    };
    return Encryption;
}());
exports["default"] = new Encryption();
