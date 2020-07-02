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
var Social = (function () {
    function Social() {
    }
    Social.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sdk, _a, _b, entryCount, entries, playerEntry, rawData, p1, p1Name, p1Score;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Sdk.loadSdk()];
                    case 1:
                        sdk = _c.sent();
                        this.sdk = sdk;
                        Toast.show({ text: "ログイン中・・・", delay: 30000, canHide: true });
                        return [4 /*yield*/, sdk.initializeAsync()];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, sdk.startGameAsync()];
                    case 3:
                        _c.sent();
                        Toast.show({ text: this.playerName + "\u3055\u3093\u3088\u3046\u3053\u305D\uFF01", delay: 30000, canHide: true });
                        _a = this;
                        return [4 /*yield*/, sdk.getLeaderboardAsync("default")];
                    case 4:
                        _a.leaderboard = _c.sent();
                        return [4 /*yield*/, Promise.all([
                                this.leaderboard.getEntryCountAsync(),
                                this.leaderboard.getEntriesAsync(3, 0),
                                this.leaderboard.getPlayerEntryAsync(),
                                this.sdk.player.getDataAsync(['level',])
                            ])];
                    case 5:
                        _b = _c.sent(), entryCount = _b[0], entries = _b[1], playerEntry = _b[2], rawData = _b[3];
                        this.playerEntry = playerEntry;
                        this.rawData = rawData;
                        if (this.hasBest) {
                            Toast.show({ text: "\u4ECA\u306E\u3068\u3053\u308D" + entryCount + "\u4EBA\u4E2D" + this.bestRank + "\u4F4D\u3067\u3059", delay: 3000 });
                        }
                        else {
                            p1 = entries[0];
                            if (p1) {
                                console.log(p1);
                                p1Name = p1.getPlayer().getName();
                                p1Score = p1.getScore();
                                Toast.show({ text: entryCount + "\u4EBA\u304C\u904A\u3093\u3067\u3044\u307E\u3059!\n\u4E00\u756A\u306F" + p1Name + "\u3055\u3093\n\u30B9\u30B3\u30A2\u306F" + p1Score + "\u3067\u3059", delay: 3000 });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Social, "hasBest", {
        get: function () {
            return !!this.myBestEntry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Social, "bestScore", {
        get: function () {
            return this.hasBest ? this.myBestEntry.getScore() : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Social, "bestRank", {
        get: function () {
            return this.hasBest ? this.myBestEntry.getRank() : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Social, "playerEntry", {
        set: function (playerEntry) {
            console.log("myBest:", this.myBestEntry, playerEntry);
            this.myBestEntry = playerEntry;
            Score.bestScore = Social.bestScore;
            Score.bestRank = Social.bestRank;
        },
        enumerable: true,
        configurable: true
    });
    Social.setScore = function (score) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("setScore " + score);
                        Toast.show({ text: "\u30CF\u30A4\u30B9\u30B3\u30A2\u3092\u9001\u4FE1\u4E2D", delay: 30000, canHide: true });
                        _a = this;
                        return [4 /*yield*/, this.leaderboard.setScoreAsync(score)];
                    case 1:
                        _a.playerEntry = _b.sent();
                        Toast.show({ text: "\u9806\u4F4D\u306F" + this.bestRank + "\u4F4D\u3067\u3057\u305F", delay: 3000 });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Social, "playerName", {
        get: function () {
            return this.sdk.player.getName() || "名無し";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Social, "hasData", {
        // level
        get: function () {
            return !!this.rawData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Social, "level", {
        get: function () {
            if (this.hasData && 'level' in this.rawData)
                return this.rawData['level'];
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Social.setLevel = function (level) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rawData['level'] = level;
                        console.log("setLevel " + level + " " + this.rawData['level']);
                        Toast.show({ text: "\u9054\u6210\u30EC\u30D9\u30EB\u3092\u9001\u4FE1\u4E2D", delay: 30000, canHide: true });
                        return [4 /*yield*/, this.sdk.player.setDataAsync({ level: level, })];
                    case 1:
                        _a.sent();
                        //this.rawData = await this.sdk.player.getDataAsync(['level',]);
                        Toast.show({ text: "\u9001\u4FE1\u5B8C\u4E86", delay: 1500 });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Social;
}());
__reflect(Social.prototype, "Social");
//# sourceMappingURL=Social.js.map