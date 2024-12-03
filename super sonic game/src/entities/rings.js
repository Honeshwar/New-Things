import k from "../kaplayContext"

export function makeRings(pos) {
    const rings = k.add([
        k.sprite("ring", { anim: "spin" }),
        k.scale(4),
        k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }),//-5 relative to enemy object
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),// give methods to check is enemy is offscreen or not
        "ring"//tagname
    ])

    return rings
}