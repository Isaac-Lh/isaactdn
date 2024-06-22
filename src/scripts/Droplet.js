class Droplet {
    constructor() {
        this.initSelf();
        
        this.w = 10;
        this.h = 30;

        this.speed = randomInt(5,10);

    }

    initSelf() {
        this.x = Math.floor(Math.random() * cnv.width);
        this.y = randomInt(-400,-200);
        this.color = colors[randomInt(0,colors.length-1)];
    }

    update(deltaTime) {
        if (this.y >= cnv.height) {
            this.initSelf();

            return;
        }

        this.y += Math.floor(this.speed * deltaTime * 0.1);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(0);

        ctx.fillStyle = this.color;
        ctx.fillRect(0,0,this.w,this.h);
        ctx.restore();
    }
}