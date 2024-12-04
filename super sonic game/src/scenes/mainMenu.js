import k from "../kaplayContext";
import { makeSonic } from "../entities/sonic";


export default function mainMenu() {
    // k.camera(0, 0, 768, 432);
    // k.drawImage("chemical-bg", 0, 0);
    // k.drawText("Super Sonic Game", 0, 0, 768, 100, "center", "white", "black", "bold 48px Arial", 0, 0);

    //setData use local storage to store data
    if (!k.getData('best-score')) {
        k.setData('best-score', 0);
    }
    k.onButtonPress('jump', () => k.go('game'));//we defines button at time of initialization of kaplay instance key=jump, it is an controler that control space and mouse click 

    //we register a button press event on jump controller and arg2= action=go to game scene
    //when ever jump controoler is pressed an event perform and it call an cb / action


    const bgPieceWidth = 1920;
    const height = 1080;

    // implementing infinite background scrolling
    const bgPieces = [
        // creating game object or actor(add()) and using component to add it to the scene(every thing inside add array is a component)
        k.add([
            k.sprite("chemical-bg"),
            k.pos(0, 0),
            k.scale(2),
            k.opacity(0.8),
            k.area()//for detecting collision, debugging purpose
        ]),//return game object
        k.add([
            k.sprite("chemical-bg"),
            k.pos(bgPieceWidth * 2, 0),//*2 because we scale the bg by 2 above, sue to it become 2x and on scroll that partsare more than bgPieceWidth*2 , so now distance covered is 2*bgPieceWidth
            k.scale(2),
            k.opacity(0.8),
            k.area()//for detecting collision, debugging
        ])
    ]


    // createing platforms game object and using component and adding it to the scene
    const platformWidth = 1920//1280;
    const platforms = [
        k.add([
            k.sprite("platforms"),
            k.pos(0, 450),//height - 300
            k.scale(4),

        ]),
        k.add([
            k.sprite("platforms"),
            k.pos(platformWidth * 4, 450),//height - 300
            k.scale(4)
        ])
    ]

    // text display on scene
    k.add([
        k.text("SONIC RING RUN", { font: "mania", size: 96 }),
        k.pos(k.center()),//k.center().x, 200
        k.anchor("center"),
    ])

    k.add([
        k.text("Press Space/Click/Touch to Play", { font: "mania", size: 32 }),
        k.pos(k.center().x, k.center().y - 100),
        k.anchor("center"),
    ])

    //adding sonic object to the scene
    makeSonic(k.vec2(200, 745))//x,y


    // infinite background scrolling
    k.onUpdate(() => {
        // check if piece1 is out of the screen or not
        if (bgPieces[1].pos.x < 0) {
            // set piece1 at position after piece2
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);

            //remove piece1 from bgPieces array and add it at the end
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0);//-100 is the scrolling speed velocity, moving to the left direction -ve

        // set piece2 at position after piece1
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);



        // for platforms
        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
            platforms.push(platforms.shift());
        }
        platforms[0].move(-3500, 0);
        platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
    })
}


`
onUpdate
note:- Register an event that runs every frame (~60 times per second) for all game objs with certain tag. onUpdate(tagname->we define unique tag while creating game object, action)

frames= videos with 60 fps

The key is that once you define onUpdate, it runs in a continuous loop, updating your game or app's state as long as the application is running, with the action data being passed into it for real-time updates.
`