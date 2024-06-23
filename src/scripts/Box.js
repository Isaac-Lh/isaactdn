class Box {
    constructor(img,x,y,w,h,color) {
        this.img = img;

        this.bX = x;
        this.bY = y;

        this.x = this.bX;
        this.y = this.bY;

        this.w = w;
        this.h = h;

        this.color = color;
    }

    IsInPos(x,y) {
        //detect col
        return (x >= this.x &&  // right of the left edge AND
            x <=this.x + this.w &&  // left of the right edge AND
            y >= this.y &&  // below the top AND
            y <= this.y + this.h    // above the bottom
        );     
    }

    update(deltaTime) {
    
    }

    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
        ctx.restore();
    }
}