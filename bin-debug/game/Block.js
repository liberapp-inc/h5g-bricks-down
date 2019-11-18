// Liberapp 2019 - Tahiti Katagai
// レンガ
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
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(px, py, type) {
        var _this = _super.call(this) || this;
        _this.scale = 1;
        Block.blocks.push(_this);
        _this.sizeW = BLOCK_SIZE_PER_H * Util.height * 0.995;
        _this.sizeH = _this.sizeW;
        switch (type) {
            case 0:
                _this.color = BLOCK_COLOR;
                break;
            case 1:
                _this.color = BLOCK_COLOR2;
                break;
            case 2:
                _this.color = BLOCK_COLOR3;
                break;
        }
        _this.setDisplay(px, py, type);
        _this.setBody(px, py, type);
        _this.display.touchEnabled = true;
        _this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
        _this.display.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchBegin, _this);
        return _this;
    }
    Block.prototype.onDestroy = function () {
        var _this = this;
        this.display.parent.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        Block.blocks = Block.blocks.filter(function (obj) { return obj != _this; });
    };
    // touch
    Block.prototype.touchBegin = function (e) {
        new EffectCircle(this.display.x, this.display.y, this.sizeW, this.color);
        this.destroy();
    };
    Block.prototype.setDisplay = function (px, py, type) {
        if (this.display)
            this.display.parent.removeChild(this.display);
        var shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChild(this.display);
        shape.x = px;
        shape.y = py;
        shape.graphics.lineStyle(3, BLOCK_LINE_COLOR);
        shape.graphics.beginFill(this.color);
        switch (type) {
            case 0:
                shape.graphics.drawRect(-0.5 * this.sizeW, -0.5 * this.sizeH, this.sizeW, this.sizeH);
                break;
            case 1:
                shape.graphics.drawRect(-1.0 * this.sizeW, -0.5 * this.sizeH, this.sizeW * 2, this.sizeH);
                break;
            case 2:
                shape.graphics.drawRect(-1.5 * this.sizeW, -0.5 * this.sizeH, this.sizeW * 3, this.sizeH);
                break;
        }
        shape.graphics.endFill();
    };
    Block.prototype.setBody = function (px, py, type) {
        switch (type) {
            case 0:
                this.body = new p2.Body({ gravityScale: 1, mass: 1, position: [this.p2m(px), this.p2m(py)] });
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [0, 0], 0);
                break;
            case 1:
                this.body = new p2.Body({ gravityScale: 1, mass: 2, position: [this.p2m(px), this.p2m(py)] });
                this.body.addShape(new p2.Box({ width: this.sizeW * 2, height: this.sizeH }), [-0 * this.sizeW, 0], 0);
                break;
            case 2:
                this.body = new p2.Body({ gravityScale: 1, mass: 3, position: [this.p2m(px), this.p2m(py)] });
                this.body.addShape(new p2.Box({ width: this.sizeW * 3, height: this.sizeH }), [0.0 * this.sizeW, 0], 0);
                break;
        }
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    };
    Block.prototype.fixedUpdate = function () {
        this.scale += (1 - this.scale) * 0.1;
        if (this.py > Player.I.ground.Y + Util.h(0.25)) {
            if (GameOver.I == null) {
                Score.I.addPoint();
            }
            this.destroy();
            return;
        }
    };
    Block.blocks = [];
    return Block;
}(PhysicsObject));
__reflect(Block.prototype, "Block");
//# sourceMappingURL=Block.js.map