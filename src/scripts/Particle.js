class Particle {
    constructor(img,x,y,vX,vY,sX,sY,alphable,bouncable) {
        this.texture = img

        this.x = x;
        this.y = y;
        this.w = sX;
        this.h = sY;
        this.angle = 0;

        this.vX = vX;
        this.vY = vY;

        this.alpha = 1;

        this.alphable = alphable;
        this.bouncable = bouncable;

        this.markedForDeletion = false;

        this.bounces = 0;
    }

    update(deltaTime) {
        this.x += this.vX * deltaTime;
        this.y += this.vY * deltaTime;

        if (this.alphable) {
            if(this.alpha > 0.0) {
                this.alpha = (this.alpha - 0.02).toFixed(2);
            } else {
                this.markedForDeletion = true
            }
        }

        this.angle += toRad(15);
    }

    draw(ctx) {
        ctx.save();

        ctx.globalAlpha  = this.alpha;

        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = "red";
        ctx.drawImage(this.texture,-this.w/2,-this.h/2,this.w,this.h);

        ctx.restore();
    }
}