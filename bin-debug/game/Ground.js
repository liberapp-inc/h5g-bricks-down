// Liberapp 2019 - Tahiti Katagai
// 床　進行に合わせて１ラインずつ下に下がっていく
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
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground() {
        var _this = _super.call(this) || this;
        _this.sizeH = Util.h(BLOCK_SIZE_PER_H);
        _this.sizeW = _this.sizeH * 5;
        var px = Util.w(0.0);
        var py = _this.sizeH * 10;
        _this.setDisplay(px, py);
        _this.setBody(px, py);
        return _this;
    }
    Ground.prototype.setDisplay = function (px, py) {
        if (this.display)
            this.display.parent.removeChild(this.display);
        var display = new egret.Shape();
        this.display = display;
        GameObject.gameDisplay.addChild(this.display);
        display.x = px;
        display.y = py;
        display.graphics.beginFill(BLOCK_COLOR3);
        display.graphics.drawRect(-0.5 * this.sizeW, -0.5 * this.sizeH, this.sizeW, this.sizeH);
        display.graphics.endFill();
    };
    Ground.prototype.setBody = function (px, py) {
        this.body = new p2.Body({ position: [this.p2m(px), this.p2m(py)], type: p2.Body.STATIC });
        var shape = new p2.Box({ width: this.sizeW, height: this.sizeH });
        this.body.addShape(shape);
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    };
    Ground.prototype.fixedUpdate = function () {
    };
    return Ground;
}(PhysicsObject));
__reflect(Ground.prototype, "Ground");
//# sourceMappingURL=Ground.js.map