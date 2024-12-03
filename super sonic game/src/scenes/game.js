import { makeEnemy } from "../entities/enemy";
import { makeRings } from "../entities/rings";
import { makeSonic } from "../entities/sonic";
import k from "../kaplayContext";

export function game() {
    k.setGravity(3100);//aaram se nicha aayanga
    const citySound = k.play("city", { loop: true, volume: 0.5 });

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
    let score = 0,
        scoreMultiplier = 0// for enemy hit score
    // create score game object
    const scoreTextGameObject = k.add([
        k.text("SCORE: " + score, { font: "mania", size: 72 }),
        k.pos(20, 20),
        k.area(),
        k.scale(2)
    ])
    // scoreTextGameObject.onUpdate(() => {
    //     scoreTextGameObject.text = "SCORE: " + score
    // })

    k.loop(1, () => {//loop is method that call a function every 1 second or arg1 is time in minutes, arg2 is callback function
        gameSpeed += 50
    })
    //adding sonic object to the scene
    const sonicGameObject = makeSonic(k.vec2(200, 745))//x,y
    sonicGameObject.setControls();
    sonicGameObject.setEvents()
    //game object have onCollide method and it call onCollide callback function when it collide with other/any game object
    // arg1 = tagname of other game object
    sonicGameObject.onCollide('enemy', (enemy) => {//onCollide method pass enemy game object that collide as arg1

        //when our hero collide with enemy but our hero is not in ground it jump on enemy
        if (!sonicGameObject.isGrounded()) {
            k.play('destroy', { volume: 0.5 })//to play sound
            k.play('hyper-ring', { volume: 0.5 })//to play sound
            k.destroy(enemy)//destroy enemy;
            sonicGameObject.jump()//jump our hero from enemy top
            scoreMultiplier += 1
            score += score * scoreMultiplier

            scoreTextGameObject.text = "SCORE: " + score
            sonicGameObject.scoreIncrementUI.text = `x${scoreMultiplier}`

            k.wait(1, () => {
                sonicGameObject.scoreIncrementUI.text = ""
            })

            return
        }

        k.setData('current-score', score)
        k.play('hurt', { volume: 0.5 })//to play sound

        k.go("gameOver", { citySound })//pass city sound to game over scene because we want to stop city sound in gameover scene
    })

    //ring collision
    sonicGameObject.onCollide('ring', (ring) => {
        k.destroy(ring)//destroy enemy;
        k.play('hyper-ring', { volume: 0.5 })//to play sound
        score += 1
        scoreTextGameObject.text = "SCORE: " + score
        sonicGameObject.scoreIncrementUI.text = "+1"

        k.wait(1, () => {
            sonicGameObject.scoreIncrementUI.text = ""
        })

    })


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


    // enemy, spawn  means birth , birth of enemy
    const spawnEnemy = () => {
        const enemy = makeEnemy(k.vec2(1950, 773))

        enemy.onUpdate(() => {
            if (gameSpeed < 3000) {
                enemy.move(-(gameSpeed + 300), 0);
                return;
            }
            enemy.move(-gameSpeed, 0)
        });

        enemy.onExitScreen(() => {
            // destroy enemy if it goes out of screen
            if (enemy.pos.x < 0) k.destroy(enemy);
        });

        const waitTime = k.rand(0.5, 2.5);

        k.wait(waitTime, spawnEnemy);// infinite recursion call, spawnEnemy()
    }

    spawnEnemy();


    // create rings that our hero collect
    const spawnRing = () => {
        // console.log(k.vec2(1950, 745));
        const ring = makeRings(k.vec2(1950, 745));//similar as {x:1950, y:745}
        ring.onUpdate(() => {
            if (gameSpeed < 3000) {
                ring.move(-(gameSpeed + 300), 0);
                return;
            }
            ring.move(-gameSpeed, 0)
        });

        ring.onExitScreen(() => {
            // destroy ring if it goes out of screen
            if (ring.pos.x < 0) k.destroy(ring);
        });

        const waitTime = k.rand(0.5, 2.5);

        k.wait(waitTime, spawnRing);// infinite recursion call, spawnRing()

    }

    spawnRing();




    k.onUpdate(() => {

        if (sonicGameObject.isGrounded()) scoreMultiplier = 0 // reset score multiplier when hero jump on ground after collide with one enemy

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