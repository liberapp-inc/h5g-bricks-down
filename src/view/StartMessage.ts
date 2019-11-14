// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト

class StartMessage extends GameObject{

    static I:StartMessage = null;
    texts:egret.TextField[] = [];
    button:Button = null;
    
    constructor() {
        super();

        StartMessage.I = this;
        this.texts[0] = Util.newTextField("レンガくずし", Util.width / 12, FONT_COLOR, 0.5, 0.2, true, false);
        this.texts[1] = Util.newTextField("レンガをタップして破壊", Util.width / 20, FONT_COLOR, 0.5, 0.3, true, false);
        this.texts[2] = Util.newTextField("赤いブロックを落とさないように", Util.width / 20, FONT_COLOR, 0.5, 0.35, true, false);
        this.texts.forEach( text =>{ GameObject.baseDisplay.addChild( text ); });

        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, this.onTap ); // 透明な全画面ボタン
        PhysicsObject.deltaScale = 0;
    }

    onDestroy(){
        this.texts.forEach( text =>{ text.parent.removeChild( text ); });
        this.texts = null;
        this.button.destroy();
        StartMessage.I = null;
    }

    update() {
        if( PhysicsObject.deltaScale > 0 ){
            this.destroy();
        }
    }

    onTap(){
        PhysicsObject.deltaScale = 1;
        // this.destroy();  できない罠 このthis=this.button(呼び出し元)
    }
}
