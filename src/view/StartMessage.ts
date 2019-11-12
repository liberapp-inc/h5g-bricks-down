// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト

class StartMessage extends GameObject{

    static I:StartMessage = null;
    texts:egret.TextField[] = [];
    
    constructor() {
        super();

        StartMessage.I = this;
        this.texts[0] = Util.newTextField("レンガくずし", Util.width / 12, FONT_COLOR, 0.5, 0.2, true, false);
        this.texts[1] = Util.newTextField("レンガをタップして破壊", Util.width / 20, FONT_COLOR, 0.5, 0.3, true, false);
        this.texts[2] = Util.newTextField("赤いブロックを落とさないように", Util.width / 20, FONT_COLOR, 0.5, 0.35, true, false);
        this.texts.forEach( text =>{ GameObject.baseDisplay.addChild( text ); });

        GameObject.baseDisplay.once(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        PhysicsObject.deltaScale = 0;
    }

    onDestroy(){
        this.texts.forEach( text =>{ text.parent.removeChild( text ); });
        this.texts = null;
        StartMessage.I = null;
    }

    update() {}

    tap(e:egret.TouchEvent){
        PhysicsObject.deltaScale = 1;
        this.destroy();
    }
}
