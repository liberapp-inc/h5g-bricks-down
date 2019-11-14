// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト
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
var StartMessage = (function (_super) {
    __extends(StartMessage, _super);
    function StartMessage() {
        var _this = _super.call(this) || this;
        _this.texts = [];
        _this.button = null;
        StartMessage.I = _this;
        _this.texts[0] = Util.newTextField("レンガくずし", Util.width / 12, FONT_COLOR, 0.5, 0.2, true, false);
        _this.texts[1] = Util.newTextField("レンガをタップして破壊", Util.width / 20, FONT_COLOR, 0.5, 0.3, true, false);
        _this.texts[2] = Util.newTextField("赤いブロックを落とさないように", Util.width / 20, FONT_COLOR, 0.5, 0.35, true, false);
        _this.texts.forEach(function (text) { GameObject.baseDisplay.addChild(text); });
        _this.button = new Button(null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, _this.onTap); // 透明な全画面ボタン
        PhysicsObject.deltaScale = 0;
        return _this;
    }
    StartMessage.prototype.onDestroy = function () {
        this.texts.forEach(function (text) { text.parent.removeChild(text); });
        this.texts = null;
        this.button.destroy();
        StartMessage.I = null;
    };
    StartMessage.prototype.update = function () {
        if (PhysicsObject.deltaScale > 0) {
            this.destroy();
        }
    };
    StartMessage.prototype.onTap = function () {
        PhysicsObject.deltaScale = 1;
        // this.destroy();  できない罠 このthis=this.button(呼び出し元)
    };
    StartMessage.I = null;
    return StartMessage;
}(GameObject));
__reflect(StartMessage.prototype, "StartMessage");
//# sourceMappingURL=StartMessage.js.map