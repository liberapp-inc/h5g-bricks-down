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
        switch (randI(0, 3)) {
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
        return _this;
    }
    Block.prototype.onDestroy = function () {
        var _this = this;
        Block.blocks = Block.blocks.filter(function (obj) { return obj != _this; });
    };
    Block.prototype.setDisplay = function (px, py, type) {
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
    Block.prototype.setBody = function (px, py, type) {
        switch (type) {
            case 0:
                this.body = new p2.Body({ gravityScale: 0, mass: 1, position: [this.p2m(px), this.p2m(py)] });
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [0, 0], 0);
                break;
            case 1:
                this.body = new p2.Body({ gravityScale: 0, mass: 2, position: [this.p2m(px), this.p2m(py)] });
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [-0.5 * this.sizeW, 0], 0);
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [+0.5 * this.sizeW, 0], 0);
                break;
            case 2:
                this.body = new p2.Body({ gravityScale: 0, mass: 3, position: [this.p2m(px), this.p2m(py)] });
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [-0.5 * this.sizeW, -0.5 * this.sizeH], 0);
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [+0.5 * this.sizeW, -0.5 * this.sizeH], 0);
                this.body.addShape(new p2.Box({ width: this.sizeW, height: this.sizeH }), [+0.5 * this.sizeW, +0.5 * this.sizeH], 0);
                break;
        }
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    };
    Block.prototype.fixedUpdate = function () {
        this.scale += (1 - this.scale) * 0.1;
        if (this.py >= Util.height) {
            if (Player.I.state != Player.I.stateNone) {
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
    Block.prototype.drop = function () {
        this.body.setZeroForce();
        this.body.gravityScale = 1.0;
    };
    Block.blocks = [];
    return Block;
}(PhysicsObject));
__reflect(Block.prototype, "Block");
//# sourceMappingURL=Block.js.map