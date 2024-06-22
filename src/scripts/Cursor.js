class Cursor {
    constructor() {
        this.texture = document.getElementById("hammer");
        
        this.x = 0;
        this.y = 0;

        this.angle = 0

        this.flipped = false;
    }

    update(w,x,y) {
        this.x = x;
        this.y = y;

        if(this.x > w/2) {
            this.flipped = true;
        } else this.flipped = false;
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x,this.y);
        ctx.rotate(toRad(this.angle));

        if(this.flipped) {
            ctx.scale(-1,1);
        } else ctx.scale(1,1);

        ctx.drawImage(this.texture,-this.texture.width/2,-this.texture.height/2);
        ctx.restore();
    }
}