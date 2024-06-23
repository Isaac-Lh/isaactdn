const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");

let nutTex = document.getElementById("nut");
let hammer = document.getElementById("hammer");
let block = document.getElementById("block");
let gear = document.getElementById("gear");
let wrench = document.getElementById("wrench");

let hitSound = document.getElementById("hitHurt");
let hitMetal = document.getElementById("hitMetal");

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

const easing = 0.02;
const cursor = new Cursor();

// arrays setup
let dustParticles = [];
let drops = [];
let audios = [];

// boxes
let boxes = [];
let currentBlock = null;
let cb = undefined;

let inBlock = false;

let partsTexs = [gear,wrench,nutTex];

function playSound(sound,volume) {
    let s = new Audio(sound.src);
    s.volume = volume;

    //play hit sound
    s.play();
    audios.push(s);

    s.addEventListener("ended", () => {
        audios.splice(audios.indexOf(s),1);
    });
}

function handleClick() {
    if (inBlock) {
        if (currentBlock != null) {
            currentBlock.x += randomInt(-20,20);
            currentBlock.y += randomInt(-20,20);

            currentBlock.shakes += 1;
        };

        // emit particles
        for(i=0; i < 10; i++) {
            let partTex = partsTexs[randomInt(0,partsTexs.length-1)]
            let size = randomInt(21,32);
            dustParticles.push(new Particle(partTex,cX,cY,Math.random() * 2-1, Math.random() * 1-0.5,size,size,true,false));
        };

        playSound(hitMetal,0.4);
        return
    }
    
    else {
        // emit particles
        for(i=0; i < 10; i++) {
            let size = randomInt(21,32);
            dustParticles.push(new Particle(nutTex,cX,cY,Math.random() * 2 - 1, 1 +Math.random() * 0.5,size,size,false,true));
        };

        playSound(hitSound,0.4);
        return;
    }
};

window.addEventListener("click", handleClick);

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

    boxes = boxes.filter(box => !box.mfd);

    if(cb == undefined) {
        let s = randomInt(100,150);
        boxes.push(new Box(block,randomInt(200,cnv.width-200),randomInt(0,cnv.height-100),s,s,3));
    }

    cb = boxes[0];

    inBlock = false;
    boxes.forEach(box => {
        // if in box
        boxes.forEach(box => {
            if (box.IsInPos(mouseX,mouseY)) {
                inBlock = true;
                currentBlock = box;
            }
        });
        box.update(deltaTime,cnv.height);
    });
    
    // droplets
    drops.forEach((drop) => {
        drop.update(deltaTime);
    })

    dustParticles = dustParticles.filter(dp => dp.markedForDeletion == false);

    //particles update
    dustParticles.forEach((dp) => {
        if (dp.bouncable) {
            if (dp.bounces >= 4) {
                dp.markedForDeletion = true;
            } else {
                if (dp.y >= cnv.height || dp.y < 0){
                    dp.bounces += 1;
                    dp.vY *= -1;
                }
                if (dp.x >= cnv.width || dp.x < 0){
                    dp.bounces += 1;
                    dp.vX *= -1;
                }
            }

        } else {
            if (dp.y >= cnv.height) {
                dp.markedForDeletion = true;
            }
        }

        dp.update(deltaTime);
    })

    //draw
    ctx.clearRect(0,0,cnv.width,cnv.height);

    drops.forEach((drop) => {
        drop.draw(ctx);
    })

    boxes.forEach(box => {
        box.draw(ctx);
    });

    dustParticles.forEach((dp) => {
        dp.draw(ctx)
    })
    
    cursor.draw(ctx);

    requestAnimationFrame(animate)
}
animate(0)