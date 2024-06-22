class Particle {
    constructor(imageSRC,x,y,vX,vY,sX,sY) {
        this.texture = new Image();
        this.texture.src = imageSRC;
        this.texture.style.imageRendering = "pixelated";

        this.x = x;
        this.y = y;
        this.w = sX;
        this.h = sY;
        this.angle = 0;

        this.vX = vX;
        this.vY = vY;

        this.markedForDeletion = false;
    }

    update(deltaTime) {
        this.x += this.vX * deltaTime;
        this.y += this.vY * deltaTime;
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = "red";
        ctx.drawImage(this.texture,-this.w/2,-this.h/2,this.w,this.h);

        ctx.restore();
    }
}