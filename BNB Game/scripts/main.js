// making context so, to avoid any conflict with other libraries methods names we use kaplay instance
import k from "./kaplayContext.js";
import { game } from "./scenes/game.js";
import gameOver from "./scenes/gameover.js";
import mainMenu from "./scenes/mainMenu.js";

console.log(k);
// load assets
k.loadSprite("chemical-bg", "../assets/graphics/chemical-bg.png");//arg1=chemical-bg as unique key/name given to an asset, arg2=location of the asset
k.loadSprite("platforms", "../assets/graphics/platforms.png");
k.loadSprite("sonic", "../assets/graphics/sonic.png", {
  sliceX: 8,//number of frames of sonic in a row, we have total 8 sonic/character /hero images
  sliceY: 2,
  anims: {
    // keys as name to animation
    run: { from: 0, to: 7, loop: true, speed: 30 },//defining run animation , from 0 frame to 7th frame, frame start from 0, loop forever, and speed 30 frame per second
    jump: { from: 8, to: 15, loop: true, speed: 100 },//defining jump animation
  },
})
k.loadSprite("ring", "../assets/graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});

k.loadSprite("motobug", "../assets/graphics/motobug.png", {
  sliceX: 5,//5 columns
  sliceY: 1,//1 row
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});


// load fonts
k.loadFont("mania", "../assets/fonts/mania.ttf");

// load sounds
k.loadSound('destroy', '../assets/sounds/destroy.wav');
k.loadSound("hurt", "../assets/sounds/Hurt.wav");
k.loadSound("hyper-ring", "../assets/sounds/HyperRing.wav");
k.loadSound("jump", "../assets/sounds/Jump.wav");
k.loadSound("ring", "../assets/sounds/Ring.wav");
k.loadSound("city", "../assets/sounds/city.mp3");



// creating scenes

// first scene: name of scene = main-menu and cb function = action/behaviour
k.scene("main-menu", mainMenu)


// second scene: playing game
k.scene('game', game)


// third scene: game over
k.scene('gameOver', gameOver)

// with it help we can go from one scene to another or default scene also set
k.go('main-menu');
k.go('game');
// k.go('gameOver');

window.onload = function () {
  const timing = performance.timing;
  const loadTime = timing.loadEventEnd - timing.navigationStart;
  console.log(`Page load time is ${loadTime} ms`);
};
