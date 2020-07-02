// @see https://github.com/idealx/egret-eui-modal/blob/master/src/components/Toast.ts
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var DefaultToastOptions = {
    text: "",
    delay: 3000,
    canHide: false
};
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast(maxWidth) {
        var _this = _super.call(this) || this;
        _this.queue = [];
        _this.rect = new eui.Rect();
        _this.rect.alpha = 0;
        _this.label = new eui.Label();
        _this.label.maxWidth = maxWidth;
        _this.rect.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onRectCreationComplete, _this);
        _this.label.addEventListener(eui.UIEvent.RESIZE, _this.onLabelResized, _this);
        GameObject.baseDisplay.addChild(_this.rect);
        return _this;
    }
    Toast.prototype.update = function () {
    };
    Toast.show = function (poptions) {
        var options = __assign({}, DefaultToastOptions, poptions);
        if (!this.I) {
            this.I = new Toast(Util.width * 0.6);
        }
        this.I.show(options);
    };
    Toast.prototype.onDestroy = function () {
        var i = Toast.I;
        Toast.I = undefined;
        if (!i) {
            return;
        }
        i.rect.parent.removeChild(i.rect);
        i.rect.removeChildren();
        i.rect = undefined;
        i.label = undefined;
    };
    Toast.prototype.show = function (options) {
        console.log("Toast.show");
        if (this.currentOptions) {
            if (this.currentOptions.canHide) {
                this.currentTween.setPaused(true);
                this.currentTween = undefined;
                this.currentOptions = undefined;
                this.queue = [];
            }
            else {
                this.queue.push(options);
                return;
            }
        }
        this.currentOptions = options;
        this.toastText = options.text;
        this.currentTween = egret.Tween.get(this.rect);
        this.currentTween.to({ alpha: 1 }, 300).wait(options.delay).call(this.onStartHide, this);
    };
    Toast.prototype.onStartHide = function () {
        console.log("Toast.onStartHide");
        if (this.currentTween === undefined) {
            return;
        }
        this.currentTween = egret.Tween.get(this.rect);
        this.currentTween.to({ alpha: 0 }, 300).call(this.onCompleteHide, this);
    };
    Toast.prototype.onCompleteHide = function () {
        console.log("Toast.onCompleteHide");
        this.currentTween = undefined;
        this.currentOptions = undefined;
        if (0 === this.queue.length) {
            this.destroy();
            return;
        }
        var options = this.queue.shift();
        this.show(options);
    };
    Toast.prototype.onRectCreationComplete = function () {
        console.log("Toast.onRectCreationComplete");
        this.rect.fillColor = 0x000000;
        this.rect.fillAlpha = 0.6;
        this.rect.horizontalCenter = 0;
        this.rect.verticalCenter = 0;
        this.rect.ellipseWidth = 30;
        this.rect.ellipseHeight = 30;
        this.label.x = 20;
        this.label.y = 20;
        this.label.size = 28;
        this.rect.addChild(this.label);
        this.toastText = "";
    };
    Object.defineProperty(Toast.prototype, "toastText", {
        set: function (text) {
            console.log("Toast.toastText:");
            this.label.text = text;
        },
        enumerable: true,
        configurable: true
    });
    Toast.prototype.onLabelResized = function () {
        console.log("Toast.onLabelResized:");
        this.rect.width = this.label.width + 40;
        this.rect.height = this.label.height + 40;
        this.rect.x = (Util.width - this.rect.width) / 2;
        this.rect.y = (Util.height - this.rect.height) / 2;
    };
    return Toast;
}(GameObject));
__reflect(Toast.prototype, "Toast");
//# sourceMappingURL=Toast.js.map