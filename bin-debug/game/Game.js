// Liberapp 2019 - Tahiti Katagai
// ゲームシーン
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PIXEL_PER_METER = 1;
var BLOCK_SIZE_PER_H = 1 / 10; //1/10;
var BLOCKS = 5;
// const SAVE_KEY_BESTSCORE = "bricks-down-bestScore";
var BACK_COLOR = 0x0060e0; // index.htmlで設定
var FONT_COLOR = 0xffffff;
var BLOCK_COLOR = 0xd8c3a5;
var BLOCK_COLOR2 = 0xe98074;
var BLOCK_COLOR3 = 0x8e8d8a;
var KEY_BLOCK_COLOR = 0xff0000;
var BLOCK_LINE_COLOR = 0xe0e0e0;
var Game = (function () {
    function Game() {
    }
    Game.loadSceneGamePlay = function () {
        PhysicsObject.deltaScale = 1;
        Camera2D.initial();
        new Score();
        new Player();
        new StartMessage();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map