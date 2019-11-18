// Liberapp 2019 - Tahiti Katagai
// キーレンガ　落としたらミス

class KeyBlock extends PhysicsObject{

    sizeW:number;
    sizeH:number;
    color:number;
    scale:number = 1;

    constructor( px:number, py:number, type:number ) {
        super();

        this.sizeW = BLOCK_SIZE_PER_H * Util.height * 0.75;//0.995;
        this.sizeH = this.sizeW;
        this.color = KEY_BLOCK_COLOR;
        this.setDisplay( px, py, type );
        this.setBody( px, py, type );

        this.display.touchEnabled = false;
     }

    onDestroy(){
    }

    setDisplay( px:number, py:number, type:number ){
        if( this.display )
            this.display.parent.removeChild(this.display);

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChild(this.display);
        shape.x = px;
        shape.y = py;
        shape.graphics.lineStyle(3, BLOCK_LINE_COLOR );
        shape.graphics.beginFill( this.color );
        switch( type ){
            case 0:
            shape.graphics.drawRect( -0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
            break;
            case 1:
            shape.graphics.drawRect( -1.0*this.sizeW, -0.5*this.sizeH, this.sizeW*2, this.sizeH );
            break;
            case 2:
            // shape.graphics.drawRect( -1.0*this.sizeW, -0.5*this.sizeH, this.sizeW*2, this.sizeH );
            shape.graphics.drawRect( -1.0*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
            shape.graphics.drawRect( +0.0*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
            shape.graphics.drawRect( -1.0*this.sizeW, -1.5*this.sizeH, this.sizeW, this.sizeH );
            break;
        }
        shape.graphics.endFill();
    }

    setBody( px:number, py:number, type:number ){
        switch( type ){
            case 0:
            this.body = new p2.Body( {gravityScale:1, mass:1, position:[this.p2m(px), this.p2m(py)]} );
            this.body.addShape(new p2.Box( { width:this.sizeW, height:this.sizeH } ), [0, 0], 0);
            break;
            case 1:
            this.body = new p2.Body( {gravityScale:1, mass:2, position:[this.p2m(px), this.p2m(py)]} );
            this.body.addShape(new p2.Box( { width:this.sizeW*2, height:this.sizeH } ), [-0*this.sizeW, 0], 0);
            break;
            case 2:
            this.body = new p2.Body( {gravityScale:1, mass:3, position:[this.p2m(px), this.p2m(py)]} );
            this.body.addShape(new p2.Box( { width:this.sizeW*2, height:this.sizeH } ), [-0*this.sizeW, 0], 0);
            this.body.addShape(new p2.Box( { width:this.sizeW, height:this.sizeH } ), [-0.5*this.sizeW, -1.0*this.sizeH], 0);
            break;
        }
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    fixedUpdate() {
        this.scale += (1 - this.scale) * 0.1;

        // if( GameOver.I == null ){
        //     Score.I.setPoint( this.Y / Util.h(BLOCK_SIZE_PER_H) );
        // }

        // 落ちたらミス
        if( this.py > Camera2D.y + Util.height ){
            if( GameOver.I == null ){
                new GameOver();
                Player.I.setStateNone();
                PhysicsObject.deltaScale = 0.1;

                // エフェクト
                const r = this.sizeH * Camera2D.scale;
                for( let i=0 ; i<4 ; i++ ) {
                    let a = rand() * Math.PI;   // 上方向のみ
                    let vx =  Math.cos( a );
                    let vy = -Math.sin( a );
                    let rv = r * ( 2 + i*0.5 );
                    new EffectLine(
                        this.display.x + vx * r,
                        this.display.y + vy * r,
                        vx * rv,
                        vy * rv,
                        this.color );
                }
                new EffectCircle( this.display.x, this.display.y, r, this.color );
                return;
            }
        }
    }
}
