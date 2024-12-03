import k from "../kaplayContext";

// games object = entities
export function makeSonic(pos) {
    const sonic = k.add([
        k.sprite("sonic", { anim: "run" }),
        k.scale(4),
        k.area(),
        k.anchor("center"),//html anchor element
        k.pos(pos),
        // k.body({ jumpForce: 1700 }),
        k.body(
            {
                jumpForce: 1700
            }
        ),

        //can add different methods to this current game object
        {//keys of func is any name

            scoreIncrementUI: null,
            setControls() {//arrow func dont have there own this, so sont use arrow func here
                k.onButtonPress("jump", () => {
                    console.log(this);
                    if (this.isGrounded()) {//we only have ground when we use body component above
                        this.play("jump");//arg= name of animation
                        this.jump();//args = jump force, we already defined jump force in body component
                        k.play("jump", { volume: 0.5 });//to play sound
                    }
                });
            },
            setEvents() {
                this.onGround(() => {
                    this.play("run");
                });
            }
        }
    ])

    // creating child game obj of sonic, for show score increment
    sonic.scoreIncrementUI = sonic.add([//k.add= entire canvas ma add hoga game object , sonic.add= sonic game object ma add hoga as child
        k.text('', { font: 'mania', size: 24 }),
        k.color(255, 255, 0),
        k.anchor('center'),
        k.pos(30, -10)//position relative to sonic game object
    ])

    return sonic
}