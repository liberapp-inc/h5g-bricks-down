var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var Sdk = (function () {
    function Sdk() {
    }
    /**
     * SDKを読み込みます
     */
    Sdk.loadSdk = function () {
        return __awaiter(this, void 0, void 0, function () {
            var srcUrl, script, liberappSdk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("============================================================");
                        console.log("Liberapp.loadSdk:");
                        this.env = this.detectMode(location.origin);
                        console.log("env: ", this.env);
                        srcUrl = this.resolveSdkUrl(this.sdkPath);
                        console.log("srcUrl: ", srcUrl);
                        return [4 /*yield*/, this.loadScript(srcUrl)];
                    case 1:
                        script = _a.sent();
                        console.log("script:", script);
                        liberappSdk = window["LiberappSdk"];
                        if (!(this.env === "egret-wing")) return [3 /*break*/, 3];
                        return [4 /*yield*/, liberappSdk.enableDebug()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        console.log("liberappSdk:", liberappSdk);
                        return [2 /*return*/, liberappSdk];
                }
            });
        });
    };
    /** @internal */
    Sdk.detectMode = function (origin) {
        if (/^https:\/\/(.+)\.a\.liberapp\.net$/.test(origin)) {
            return "production";
        }
        if (/^https:\/\/(.+)\.a\.staging.\.liberapp\.net$/.test(origin)) {
            return "staging";
        }
        if (/^https:\/\/(.+)\.a\.development\.liberapp\.net$/.test(origin)) {
            return "development";
        }
        return "egret-wing";
    };
    /** @internal */
    Sdk.resolveSdkUrl = function (path) {
        var baseUrl = this.baseUrls[this.env];
        return "" + baseUrl + path;
    };
    /** @internal */
    Sdk.loadScript = function (srcUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var script = document.createElement("script");
                        script.async = false;
                        script.src = srcUrl;
                        script.onload = function () { return resolve(script); };
                        script.onerror = function () { return reject(new Error("Can not load script: src:" + srcUrl)); };
                        document.head.append(script);
                    })];
            });
        });
    };
    Sdk.baseUrls = {
        production: "https://liberapp.net",
        staging: "https://staging.liberapp.net",
        development: "https://localhost",
        "egret-wing": "https://staging.liberapp.net",
    };
    /// 違うバージョンのSDKを読み込むときは書き換えてください
    Sdk.sdkPath = "/dist/sdk/liberapp-ja-0_9.js";
    return Sdk;
}());
__reflect(Sdk.prototype, "Sdk");
//# sourceMappingURL=Sdk.js.map