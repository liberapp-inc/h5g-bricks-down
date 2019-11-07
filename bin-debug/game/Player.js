// Liberapp 2019 - Tahiti Katagai
// タッチでブロック破壊
// 画面下でブロック生成
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.line = 0;
        _this.state = _this.stateNone;
        _this.step = 0;
        Player.I = _this;
        _this.x = 0.5 * Util.width;
        _this.y = 0.2 * Util.height;
        return _this;
    }
    Player.prototype.onDestroy = function () {
        Player.I = null;
    };
    Player.prototype.update = function () {
        this.state();
        this.processBricksLine();
        this.processCamera();
    };
    Player.prototype.setStateNone = function () {
        this.state = this.stateNone;
        this.step = 0;
    };
    Player.prototype.stateNone = function () { };
    Player.prototype.processBricksLine = function () {
        if (this.line < 9) {
            this.line++;
            var size = Util.h(BLOCK_SIZE_PER_H);
            var count = 5;
            var x = size * (-count / 2);
            var y = size * this.line;
            while (count > 0) {
                if (count >= 2 && randBool(0.25)) {
                    x += size * 0.5;
                    new Block(x, y, 1);
                    x += size * 1.5;
                    count -= 2;
                }
                else {
                    new Block(x, y, 0);
                    x += size;
                    count -= 1;
                }
            }
        }
    };
    Player.prototype.processCamera = function () {
        var camScale = Util.clamp(Util.height / (Util.height - (this.y - BLOCK_SIZE_PER_H * Util.height * 2)), 0, 1);
        Camera2D.scale += (camScale - Camera2D.scale) * 0.1;
        // Camera2D.x = (1 - 1/Camera2D.scale) * Util.width  * 0.5;
        Camera2D.x = -Util.w(0.5);
        Camera2D.y = (1 - 1 / Camera2D.scale) * Util.height;
    };
    Player.I = null;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map