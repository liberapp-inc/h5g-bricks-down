// Liberapp 2019 - Tahiti Katagai
// レンガ

class Block extends PhysicsObject{

    static blocks:Block[] = [];
    sizeW:number;
    sizeH:number;
    color:number;
    scale:number = 1;

    constructor( px:number, py:number, type:number ) {
        super();

        Block.blocks.push(this);
        this.sizeW = BLOCK_SIZE_PER_H * Util.height * 0.995;
        this.sizeH = this.sizeW;
        switch( randI(0,3) ){
            case 0: this.color = BLOCK_COLOR;   break;
            case 1: this.color = BLOCK_COLOR2;  break;
            case 2: this.color = BLOCK_COLOR3;  break;
        }
        this.setDisplay( px, py, type );
        this.setBody( px, py, type );

        this.display.touchEnabled = true;
        this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.display.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBegin, this);
    }

    onDestroy(){
        this.display.parent.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        Block.blocks = Block.blocks.filter( obj => obj != this );
    }

    // touch
    touchBegin(e:egret.TouchEvent) {
        new EffectCircle( this.display.x, this.display.y, this.sizeW, this.color );
        this.destroy();
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
            shape.graphics.drawRect( -1.5*this.sizeW, -0.5*this.sizeH, this.sizeW*3, this.sizeH );
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
            this.body.addShape(new p2.Box( { width:this.sizeW*3, height:this.sizeH } ), [ 0.0*this.sizeW, 0], 0);
            break;
        }
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    fixedUpdate() {
        this.scale += (1 - this.scale) * 0.1;

        if( this.py < Camera2D.y - Util.height ){
            this.destroy();
            return;
        }
    }

    drop(){
        this.body.setZeroForce();
        this.body.gravityScale = 1.0;
    }
}
