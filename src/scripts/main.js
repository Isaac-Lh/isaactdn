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

/*
1)-add image wich represent cursor
2)-hide the cursor
3)-flip if in right side
*/

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

let cX = 0;
let cY = 0;

let easing = 0.03;
let cursor = new Cursor();

let nutTex = document.getElementById("nut");

window.addEventListener("click", e => {
    // emit particles
    for(i=0; i < 10; i++) {
        let size = randomInt(21,32);
        dustParticles.push(new Particle(nutTex,cX,cY,Math.random() * 2 - 1, 0.5 +Math.random() * 0.5,size,size));
    };

    //play hit sound
    let hitSound = new Audio("../../assets/audio/hitHurt.mp3");
    hitSound.volume = 0.3;
    hitSound.play();
});


let dustParticles = [];

// particles setup
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