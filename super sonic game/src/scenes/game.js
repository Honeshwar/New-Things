import { makeSonic } from "../entities/sonic";
import k from "../kaplayContext";

export function game() {
    k.setGravity(3100);//aaram se nicha aayanga

    // const bgPieceWidth = 1920;
    // const height = 1080;

    // // implementing infinite background scrolling
    // const bgPieces = [
    //     // creating game object or actor(add()) and using component to add it to the scene(every thing inside add array is a component)
    //     k.add([
    //         k.sprite("chemical-bg"),
    //         k.pos(0, 0),
    //         k.scale(2),
    //         k.opacity(0.8),
    //         k.area()//for detecting collision, debugging purpose
    //     ]),//return game object
    //     k.add([
    //         k.sprite("chemical-bg"),
    //         k.pos(bgPieceWidth * 2, 0),//*2 because we scale the bg by 2 above, sue to it become 2x and on scroll that partsare more than bgPieceWidth*2 , so now distance covered is 2*bgPieceWidth
    //         k.scale(2),
    //         k.opacity(0.8),
    //         k.area()//for detecting collision, debugging
    //     ])
    // ]


    // // createing platforms game object and using component and adding it to the scene
    // const platformWidth = 1920//1280;
    // const platforms = [
    //     k.add([
    //         k.sprite("platforms"),
    //         k.pos(0, 450),//height - 300
    //         k.scale(4)
    //     ]),
    //     k.add([
    //         k.sprite("platforms"),
    //         k.pos(platformWidth * 4, 450),//height - 300
    //         k.scale(4)
    //     ])
    // ]


    // creating objector actor in scene game

    const bigPieceWidth = 1920;
    const bigPieceHeight = 1080;

    const chemicalBg = [
        k.add([
            k.sprite("chemical-bg"),
            k.pos(0, 0),
            k.scale(2),
            k.area()

        ]),
        k.add([
            k.sprite("chemical-bg"),
            k.pos(bigPieceWidth * 2, 0),
            k.scale(2),
            k.area()
        ])
    ]

    // platform
    const platformWidth = 1280;

    const platforms = [
        k.add([
            k.sprite("platforms"),
            k.pos(0, 450),
            k.scale(4),
            k.area()
        ]),
        k.add([
            k.sprite("platforms"),
            k.pos(bigPieceWidth * 4, 450),
            k.scale(4),
            k.area()
        ])
    ]

    let gameSpeed = 300;
    k.loop(1, () => {//loop is method that call a function every 1 second or arg1 is time in minutes, arg2 is callback function
        gameSpeed += 50
    })
    //adding sonic object to the scene
    const sonicGameObject = makeSonic(k.vec2(200, 745))//x,y
    sonicGameObject.setControls();
    sonicGameObject.setEvents()

    // making ground game object for sonic game object so  sonic obj can jump and on gravity it not fall down
    k.add([
        k.rect(1920, 300),
        k.pos(0, 832),
        k.opacity(0.5),
        k.area(),
        k.body({
            isStatic: true//fixed object
        })
    ])

    k.onUpdate(() => {

        if (chemicalBg[1].pos.x < 0) {
            chemicalBg[0].moveTo(chemicalBg[1].pos.x + chemicalBg[1].width * 2, -sonicGameObject.pos.y / 10 - 50)
            chemicalBg.push(chemicalBg.shift())
        }
        chemicalBg[0].move(-100, 0)
        chemicalBg[1].moveTo(chemicalBg[0].pos.x + chemicalBg[0].width * 2, -sonicGameObject.pos.y / 10 - 50)


        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platforms[0].width * 4, 450)
            platforms.push(platforms.shift())
        }
        platforms[0].move(-gameSpeed, 0)
        platforms[1].moveTo(platforms[0].pos.x + platforms[0].width * 4, 450)
    })
}