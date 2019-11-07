// Liberapp 2019 - Tahiti Katagai
// 床　進行に合わせて１ラインずつ下に下がっていく

class Ground extends PhysicsObject{

    sizeW:number;
    sizeH:number;

    constructor() {
        super();

        this.sizeH = Util.h(BLOCK_SIZE_PER_H);
        this.sizeW = this.sizeH * 5;
        const px = Util.w( 0.0 );
        const py = this.sizeH * 10;

        this.setDisplay( px, py );
        this.setBody( px, py );
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            this.display.parent.removeChild( this.display );

        const display = new egret.Shape();
        this.display = display;
        GameObject.gameDisplay.addChild(this.display);
        
        display.x = px;
        display.y = py;
        display.graphics.beginFill( BLOCK_COLOR3 );
        display.graphics.drawRect( -0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH );
        display.graphics.endFill();
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {position:[this.p2m(px), this.p2m(py)],type: p2.Body.STATIC} );
        const shape = new p2.Box( { width:this.sizeW, height:this.sizeH } );
        this.body.addShape(shape);
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    fixedUpdate() {
    }
}
