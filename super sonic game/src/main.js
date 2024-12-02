// making context so, to avoid any conflict with other libraries methods names we use kaplay instance
import k from "./kaplayContext";
import { game } from "./scenes/game";
import mainMenu from "./scenes/mainMenu";

console.log(k);
// load assets
k.loadSprite("chemical-bg", "graphics/chemical-bg.png");//arg1=chemical-bg as unique key/name given to an asset, arg2=location of the asset
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("sonic", "graphics/sonic.png", {
  sliceX: 8,//number of frames of sonic in a row, we have total 8 sonic/character /hero images
  sliceY: 2,
  anims: {
    // keys as name to animation
    run: { from: 0, to: 7, loop: true, speed: 30 },//defining run animation , from 0 frame to 7th frame, frame start from 0, loop forever, and speed 30 frame per second
    jump: { from: 8, to: 15, loop: true, speed: 100 },//defining jump animation
  },
})
k.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});

k.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 5,//5 columns
  sliceY: 1,//1 row
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});


// load fonts
k.loadFont("mania", "fonts/mania.ttf");

// load sounds
k.loadSound('destroy', 'sounds/destroy.wav');
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("city", "sounds/city.mp3");



// creating scenes

// first scene: name of scene = main-menu and cb function = action/behaviour
k.scene("main-menu", mainMenu)


// second scene: playing game
k.scene('game', game)


// third scene: game over
k.scene('gameover', () => { })

// with it help we can go from one scene to another or default scene also set
k.go('main-menu');
k.go('game');