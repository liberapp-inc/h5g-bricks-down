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
        _this.ground = null;
        _this.keyBlock = null;
        Player.I = _this;
        _this.x = 0.5 * Util.width;
        _this.y = 0.2 * Util.height;
        _this.ground = new Ground();
        // key block
        var blocksize = Util.h(BLOCK_SIZE_PER_H);
        var x = 0;
        var y = 0;
        _this.keyBlock = new KeyBlock(x, y, 2);
        Camera2D.x = -Util.w(0.5);
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
        // 進行に合わせてブロックライン生成
        var headLine = (Camera2D.y + Util.h(1.0)) / Util.h(BLOCK_SIZE_PER_H);
        if (this.line < headLine) {
            this.line++;
            var size = Util.h(BLOCK_SIZE_PER_H);
            var signLR = randBool() ? +1 : -1;
            var count = BLOCKS;
            var x = (size * (-count / 2) + size * 0.5) * signLR;
            var y = size * this.line;
            this.ground.my = size * (this.line + 1);
            while (count > 0) {
                if (count >= 3 && randBool(0.3)) {
                    x += size * signLR;
                    new Block(x, y, 2);
                    x += size * 2.0 * signLR;
                    count -= 3;
                }
                else if (count >= 2 && randBool(0.4)) {
                    x += size * 0.5 * signLR;
                    new Block(x, y, 1);
                    x += size * 1.5 * signLR;
                    count -= 2;
                }
                else {
                    new Block(x, y, 0);
                    x += size * signLR;
                    count -= 1;
                }
            }
        }
    };
    Player.prototype.processCamera = function () {
        // キーブロックが着地しているなら
        var vy = this.keyBlock.body.velocity[1];
        if (vy <= Util.h(0.01)) {
            var camY = this.keyBlock.Y - Util.h(0.3);
            Camera2D.y = Util.lerp(Camera2D.y, camY, 1 / 32);
        }
    };
    Player.I = null;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map