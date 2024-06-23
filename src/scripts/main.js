const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");

const colors = ["#78ABA8", "#E7D37F", "#FD9B63", "#E88D67"];

const speed = 1;

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

window.onresize = () => {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
}

let mouseX = 0;
let mouseY = 0;

function setMouseCoords(x,y) {
    mouseX = x;
    mouseY = y;
};

// handle computer mouse mvse
document.addEventListener("mousemove", e => {
   setMouseCoords(e.clientX,e.clientY);
})

// handle phone mouse move
document.addEventListener("touchmove", e => {
    setMouseCoords(e.touches[0].clientX,e.touches[0].clientY);
});

let cX = 0;
let cY = 0;

let easing = 0.03;
let cursor = new Cursor();

let nutTex = document.getElementById("nut");

let hitSound = document.getElementById("hitHurt");
hitSound.volume = 0;

let audios = [];

function spawnParticles() {
    // emit particles
    for(i=0; i < 10; i++) {
        let size = randomInt(21,32);
        dustParticles.push(new Particle(nutTex,cX,cY,Math.random() * 2 - 1, 0.5 +Math.random() * 0.5,size,size));
    };

    let hs = new Audio(hitSound.src);
    hs.volume = 0.3;

    //play hit sound
    hs.play();
    audios.push(hs);

    hs.addEventListener("ended", () => {
        audios.splice(audios.indexOf(hs),1);
    });

    return;
};

window.addEventListener("click", spawnParticles);

// particles setup
let dustParticles = [];
let drops = [];

for(i=0;i<100;i++) {
    drops.push(new Droplet());
}

// delta time
let lastTime = 0;

function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Calculate the distance to move
    const dx = mouseX - cursor.x;
    const dy = mouseY - cursor.y;

    //update
    cX += Math.floor(dx * easing * deltaTime);
    cY += Math.floor(dy * easing * deltaTime);

    cursor.update(cnv.width,cX,cY);

    // droplets
    drops.forEach((drop) => {
        drop.update(deltaTime);
    })

    //particles update
    dustParticles.forEach((dp) => {
        if (dp.y >= cnv.height) {
            dustParticles.splice(dustParticles.indexOf(dp), 1);
        } else {
            dp.update(deltaTime);
        }
    })

    //draw
    ctx.clearRect(0,0,cnv.width,cnv.height);

    drops.forEach((drop) => {
        drop.draw(ctx);
    })

    dustParticles.forEach((dp) => {
        dp.draw(ctx)
    })
    
    cursor.draw(ctx);

    requestAnimationFrame(animate)
}
animate(0)