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

        this.easing = 0.01;
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
        let dx = this.bX -this.x;
        let dy = this.bY - this.y;

        this.x += Math.floor(dx * this.easing * deltaTime);
        this.y += Math.floor(dy * this.easing * deltaTime);
    }

    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
        ctx.restore();
    }
}