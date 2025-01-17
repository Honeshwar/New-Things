import k from "../kaplayContext.js";

export function makeEnemy(pos) {
    const enemy = k.add([
        k.sprite("motobug", { anim: "run" }),
        k.scale(2),
        // k.color(255, 0, 0),
        k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }),//-5 relative to enemy object
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),// give methods to check is enemy is offscreen or not
        "enemy"//tagname
    ])

    return enemy
}