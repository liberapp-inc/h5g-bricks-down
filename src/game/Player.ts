// Liberapp 2019 - Tahiti Katagai
// タッチでブロック破壊
// 画面下でブロック生成

class Player extends GameObject{

    static I:Player = null;

    x:number;
    y:number;
    line:number = 0;
    state:()=>void = this.stateNone;
    step:number = 0;

    ground:Ground = null;
    keyBlock:KeyBlock = null;

    constructor() {
        super();

        Player.I = this;
        this.x = 0.5*Util.width;
        this.y = 0.2*Util.height;

        this.ground = new Ground();

        // key block
        const blocksize = Util.h(BLOCK_SIZE_PER_H);
        let x = 0;
        let y = 0;
        this.keyBlock = new KeyBlock( x, y, 2 );
        Camera2D.x = -Util.w(0.5);
    }

    onDestroy(){
        Player.I = null;
    }

    update() {
        this.state();
        this.processBricksLine();
        this.processCamera();
    }

    setStateNone(){
        this.state = this.stateNone;
        this.step = 0;
    }
    stateNone(){}

    processBricksLine(){
        // 進行に合わせてブロックライン生成
        let headLine = ( Camera2D.y + Util.h(1.0) ) / Util.h(BLOCK_SIZE_PER_H);
        if( this.line < headLine ){
            this.line++;
            const size = Util.h(BLOCK_SIZE_PER_H);
            const signLR = randBool() ? +1 : -1;
            let count = BLOCKS;
            let x = (size * (-count / 2) + size * 0.5) * signLR;
            let y = size * this.line;
            this.ground.my = size * (this.line + 1);
            while( count > 0 ){
                if( count >= 3 && randBool(0.3) ){
                    x += size * signLR;
                    new Block( x, y, 2 );
                    x += size * 2.0 * signLR;
                    count -= 3;
                }
                else
                if( count >= 2 && randBool(0.4) ){
                    x += size * 0.5 * signLR;
                    new Block( x, y, 1 );
                    x += size * 1.5 * signLR;
                    count -= 2;
                }
                else{
                    new Block( x, y, 0 );
                    x += size * signLR;
                    count -= 1;
                }
            }
        }
    }

    processCamera(){
        // キーブロックが着地しているなら
        const vy = this.keyBlock.body.velocity[1];
        if( vy <= Util.h(0.01) ){
            let camY = this.keyBlock.Y - Util.h(0.3);
            Camera2D.y = Util.lerp( Camera2D.y, camY, 1/32 );
        }
    }
}
