// Liberapp 2019 - Tahiti Katagai
// キーレンガ　落としたらミス
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
var KeyBlock = (function (_super) {
    __extends(KeyBlock, _super);
    function KeyBlock(px, py, type) {
        var _this = _super.call(this) || this;
        _this.scale = 1;
        _this.sizeW = BLOCK_SIZE_PER_H * Util.height * 0.995;
        _this.sizeH = _this.sizeW;
        _this.color = KEY_BLOCK_COLOR;
        _this.setDisplay(px, py, type);
        _this.setBody(px, py, type);
        _this.display.touchEnabled = false;
        return _this;
    }
    KeyBlock.prototype.onDestroy = function () {
    };
    KeyBlock.prototype.setDisplay = function (px, py, type) {
        if (this.display)
            this.display.parent.removeChild(this.display);
        var shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChild(this.display);
        shape.x = px;
        shape.y = py;
        shape.graphics.beginFill(this.color);
        switch (type) {
            case 0:
                shape.graphics.drawRect(-0.5 * this.sizeW, -0.5 * this.sizeH, this.sizeW, this.sizeH);
                break;
            case 1:
                shape.graphics.drawRect(-1.0 * this.sizeW, -0.5 * this.sizeH, this.sizeW, this.sizeH);
                shape.graphics.drawRect(+0.0 * this.sizeW, -0.5 * this.sizeH, this.sizeW, this.sizeH);
                break;
            case 2:
                shape.graphics.drawRect(-1.0 * this.sizeW, -1.0 * this.sizeH, this.sizeW, this.sizeH);
                shape.graphics.drawRect(+0.0 * this.sizeW, -1.0 * this.sizeH, this.sizeW, this.sizeH);
                shape.graphics.drawRect(+0.0 * this.sizeW, +0.0 * this.sizeH, this.sizeW, this.sizeH);
                break;
        }
        shape.graphics.endFill();
    };
    KeyBlock.prototype.setBody = function (px, py, type) {
        switch (type) {
            case 0:
                this.body = new p2.Body({ gravityScale: 1, mass: 1, position: [this.p2m(px), this.p2m(py)] });
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [0, 0], 0);
                break;
            case 1:
                this.body = new p2.Body({ gravityScale: 1, mass: 2, position: [this.p2m(px), this.p2m(py)] });
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [-0.5 * this.sizeW, 0], 0);
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [+0.5 * this.sizeW, 0], 0);
                break;
            case 2:
                this.body = new p2.Body({ gravityScale: 1, mass: 3, position: [this.p2m(px), this.p2m(py)] });
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [-0.5 * this.sizeW, -0.5 * this.sizeH], 0);
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [+0.5 * this.sizeW, -0.5 * this.sizeH], 0);
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [+0.5 * this.sizeW, +0.5 * this.sizeH], 0);
                break;
        }
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    };
    KeyBlock.prototype.fixedUpdate = function () {
        this.scale += (1 - this.scale) * 0.1;
        if (this.py < Camera2D.y - Util.height) {
            if (GameOver.I == null) {
                new GameOver();
                Player.I.setStateNone();
                PhysicsObject.deltaScale = 0.1;
            }
            var r = this.sizeH * Camera2D.scale;
            for (var i = 0; i < 4; i++) {
                var a = rand() * Math.PI; // 上方向のみ
                var vx = Math.cos(a);
                var vy = -Math.sin(a);
                var rv = r * (2 + i * 0.5);
                new EffectLine(this.display.x + vx * r, this.display.y + vy * r, vx * rv, vy * rv, this.color);
            }
            new EffectCircle(this.display.x, this.display.y, r, this.color);
            this.destroy();
            return;
        }
    };
    return KeyBlock;
}(PhysicsObject));
__reflect(KeyBlock.prototype, "KeyBlock");
//# sourceMappingURL=KeyBlock.js.map