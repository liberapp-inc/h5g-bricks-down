// Liberapp 2019 Tahiti Katagai
// 物理エンジンp2オブジェクト
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
var PhysicsObject = (function (_super) {
    __extends(PhysicsObject, _super);
    function PhysicsObject() {
        return _super.call(this) || this;
    }
    PhysicsObject.prototype._delete = function () {
        this.onDestroy();
        if (this.body) {
            PhysicsObject.world.removeBody(this.body);
            this.body.displays = [];
            this.body = null;
        }
        if (this.display) {
            this.display.parent.removeChild(this.display);
            this.display = null;
        }
    };
    PhysicsObject.prototype.update = function () {
        if (this.display) {
            var body = this.body;
            var display = this.display;
            display.x = this.px;
            display.y = this.py;
            display.rotation = body.angle * 180 / Math.PI;
        }
        this.fixedUpdate();
    };
    PhysicsObject.prepare = function (pixelPerMeter) {
        PhysicsObject.pixelPerMeter = pixelPerMeter;
        PhysicsObject.meterPerPixel = 1 / pixelPerMeter;
        PhysicsObject.width = PhysicsObject.pixelToMeter(Util.width);
        PhysicsObject.height = PhysicsObject.pixelToMeter(Util.height);
        PhysicsObject.world = new p2.World();
        PhysicsObject.world.gravity = [0, PhysicsObject.height * 0.08];
        PhysicsObject.world.defaultContactMaterial.friction *= 2;
        PhysicsObject.lastTime = Date.now();
        PhysicsObject.deltaScale = 1;
    };
    PhysicsObject.progress = function () {
        var now = Date.now();
        var delta = (now - this.lastTime) * this.deltaScale;
        this.lastTime = now;
        if (delta > 0)
            PhysicsObject.world.step(1 / 60 * this.deltaScale, delta, 4);
    };
    PhysicsObject.pixelToMeter = function (pixel) { return pixel * PhysicsObject.meterPerPixel; };
    PhysicsObject.meterToPixel = function (meter) { return meter * PhysicsObject.pixelPerMeter; };
    PhysicsObject.prototype.m2p = function (meter) { return PhysicsObject.meterToPixel(meter); };
    PhysicsObject.prototype.p2m = function (pixel) { return PhysicsObject.pixelToMeter(pixel); };
    Object.defineProperty(PhysicsObject.prototype, "px", {
        get: function () { return PhysicsObject.meterToPixel(this.mx); },
        set: function (px) { this.mx = PhysicsObject.pixelToMeter(px); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhysicsObject.prototype, "py", {
        get: function () { return PhysicsObject.meterToPixel(this.my); },
        set: function (py) { this.my = PhysicsObject.pixelToMeter(py); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhysicsObject.prototype, "mx", {
        get: function () { return this.body.position[0]; },
        set: function (mx) { this.body.position[0] = mx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhysicsObject.prototype, "my", {
        get: function () { return this.body.position[1]; },
        set: function (my) { this.body.position[1] = my; },
        enumerable: true,
        configurable: true
    });
    PhysicsObject.deltaScale = 1;
    return PhysicsObject;
}(GameObject));
__reflect(PhysicsObject.prototype, "PhysicsObject");
//# sourceMappingURL=PhysicsObject.js.map