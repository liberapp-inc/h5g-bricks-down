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

    constructor() {
        super();

        Player.I = this;
        this.x = 0.5*Util.width;
        this.y = 0.2*Util.height;
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
        if( this.line < 9 ){
            this.line++;
            const size = Util.h(BLOCK_SIZE_PER_H);
            let count = 5;
            let x = size * (-count / 2);
            let y = size * this.line;

            while( count > 0 ){
                if( count >= 2 && randBool(0.25) ){
                    x += size * 0.5;
                    new Block( x, y, 1 );
                    x += size * 1.5;
                    count -= 2;
                }
                else{
                    new Block( x, y, 0 );
                    x += size;
                    count -= 1;
                }
            }
        }
    }

    processCamera(){
        const camScale = Util.clamp( Util.height / (Util.height - (this.y - BLOCK_SIZE_PER_H*Util.height*2)), 0, 1 );
        Camera2D.scale += (camScale - Camera2D.scale) * 0.1;
        // Camera2D.x = (1 - 1/Camera2D.scale) * Util.width  * 0.5;
        Camera2D.x = -Util.w(0.5);
        Camera2D.y = (1 - 1/Camera2D.scale) * Util.height;
    }
}
