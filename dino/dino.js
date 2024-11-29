

// // Import Kaboom.js as an ES module
// import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// // Initialize Kaboom.js
// kaboom({
//     background: [0, 0, 0], // Light gray background like Chrome's game
//     // width: 800,
//     // height: 400,
// });

// // Load assets
// loadSprite("dino", "./dino.jpg"); // Dinosaur sprite
// loadSprite("cactus", "./tree.jpg"); // Cactus sprite
// loadSprite("ground", "./ground.jpg"); // Ground sprite


// // Game Scene
// scene("game", () => {
//     let score = 0;

//     // Add score text
//     const scoreLabel = add([
//         text("Score: 0", { size: 24 }),
//         pos(10, 10),
//         { value: 0 },
//     ]);

//     // Add the ground
//     const floor = add([
//         sprite("ground", { width: width(), tiled: true }),
//         pos(0, height() - 170),
//         area(),
//         "ground",
//     ]);

//     // Scroll the ground
//     floor.onUpdate(() => {
//         floor.move(-200, 0); // Moves the ground to the left
//         if (floor.pos.x <= -floor.width / 2) {
//             floor.pos.x = 0; // Reset ground position for endless scrolling
//         }
//     });

//     // Add the dinosaur
//     const dino = add([
//         sprite("dino"),
//         pos(50, height() - 390),
//         area(),
//         body(),
//         scale(1.5),
//         "dino",
//     ]);

//     // Jump mechanic
//     onKeyPress("space", () => {
//         // if (dino.isGrounded()) {
//         dino.jump(500);
//         // }
//     });

//     // Add obstacles
//     function spawnCactus() {
//         const cactus = add([
//             sprite("cactus"),
//             pos(width(), height() - 190),
//             area(),
//             move(LEFT, 200),
//             "cactus",
//         ]);

//         // Destroy cactus when it moves off-screen
//         cactus.onUpdate(() => {
//             if (cactus.pos.x < -cactus.width) {
//                 destroy(cactus);
//             }
//         });

//         // Spawn another cactus after a random delay
//         wait(rand(1, 3), spawnCactus);
//     }
//     spawnCactus();

//     // Update score
//     dino.onUpdate(() => {
//         score += dt() * 10; // Increase score over time
//         scoreLabel.text = `Score: ${Math.floor(score)}`;
//     });

//     // Collision detection
//     dino.onCollide("cactus", () => {
//         go("gameover", { score: Math.floor(score) });
//     });
// });


// // Game Over Scene
// scene("gameover", ({ score }) => {
//     add([
//         text(`Game Over\nScore: ${score}\nPress R to Restart`, { size: 24 }),
//         pos(width() / 2, height() / 2),
//         anchor("center"), // Replaces origin() with anchor()
//     ]);

//     onKeyPress("r", () => go("game")); // Restart the game
// });


// // Start the game
// go("game");


import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
// start kaplay
kaplay();//get all methods from kaplay

// load assets not available in screen until we use sprite('dino')
loadSprite("dino", "./dino.jpg", {
    sliceX: 2, // how many sprites are in the X axis
    sliceY: 2, // how many sprites are in the Y axis
    anims: {
        crack: { from: 0, to: 3, loop: false },
        ghosty: { from: 4, to: 4 },
    },
});
loadSprite("ground", "./ground.jpg");
// now add something to the game object and its components
const player1 = add([
    // this is a component that draws a rectangle
    rect(30, 30, "red"),

    pos(100, 100),
    color(0, 0, 0),
    "player1"//tags are used to identify objects by naming them, this is a custom tag , multiple tags can be added or multiple game objects can have the same tag
]);//inside array we define its behavior or properties

const p2 = add([
    sprite("dino", { width: 150, height: 150, }),
    pos(0, 100), 'player1'
]);

console.log(get("player1"));



// window.onkeydown = (e) => {
//     console.log(e.key, player1);
//     player1.move(-2100, 0)
//     p2.move(0, 1000)
//     p2.use(sprite("ground", { width: 150, height: 150, }), "player1")//existing components can be replaced with new ones,updated

//     p2.unuse("player1")
// }

// window.onkeyup = (e) => {

//     p2.move(-0, -1000)
// }


// can access the components of the game object properties
console.log(player1.c("pos")); // all the state exclusive to the pos() component


if (p2.is("player1"))
    debug.log("I can see you!");




// Creating Game Objects
// The first way to create game objects is the make() function: It assembles a game object from a list of components, but without attaching it to the scene. For that, we use the add() function.
const bullet = make([rect(6, 18), pos(80, 80)]);

// add(bullet);


// nested game objects
const player = add([rect(32, 32), pos(80, 80)]);

const head = player.add([circle(16), pos(0, -16)]);

const gun = player.add([sprite("ground", { width: 32, height: 32 }), pos(0, 16)])


// Scenes and go() use to switch between screens in the game
scene("game", ({ score, level }) => {
    add([
        // a component
        // rect(32, 32),
        sprite("dino", {
            width: 150, // the width of the sprite
            height: 150, // the height of the sprite
            frame: 1, // the frame of the sprite
            flipX: true, // flip the sprite in the X axis
            flipY: true, // flip the sprite in the Y axis
            anim: "crack", // the animation to play at the start
        }),
        "player1"
    ]);
});

window.onkeyup = (e) => {
    go("game", { score: 100, level: 1 });
}