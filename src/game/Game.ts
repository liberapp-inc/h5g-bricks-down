// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PIXEL_PER_METER = 1;
const BLOCK_SIZE_PER_H = 1/10;

const SAVE_KEY_BESTSCORE = "bricks-down-bestScore";

const BACK_COLOR = 0x0060e0;    // index.htmlで設定
const FONT_COLOR = 0xe85a4f;
const BLOCK_COLOR = 0xd8c3a5;
const BLOCK_COLOR2 = 0xe98074;
const BLOCK_COLOR3 = 0x8e8d8a;
const KEY_BLOCK_COLOR = 0xff0000;

class Game {

    static loadSceneGamePlay() {
        PhysicsObject.deltaScale = 1;
        new Score();
        new Player();
        new StartMessage();
    }
}
