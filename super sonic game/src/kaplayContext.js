// create to not pollute the global namespace, conflict with other libraries

// import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs"
import kaplay from "kaplay";

// initialize you game
// kaplay()


console.log(window.innerWidth);

let k = null;
// if (window.innerWidth < 768) {
//     k = kaplay({
//         width: 768,
//         height: 432,
//         letterbox: true,
//         background: [0, 0, 0],
//         global: false,
//         touchToMouse: true,
//         buttons: {//controls/buttons to move the player
//             //creating jump controller
//             jump: {
//                 keyboard: ["space"],
//                 mouse: "left",
//             },
//         },
//         debug: true,
//         debugKey: "d"//to show debug information, on pressing this key
//         ,
//     })
// } else {
k = kaplay({
    width: 1920,
    height: 1080,
    letterbox: true,//to maintain aspect ratio of the canvas to different screen sizes
    background: [0, 0, 0],
    global: false,
    touchToMouse: true,
    buttons: {//controls/buttons to move the player
        //creating jump controller
        jump: {
            keyboard: ["space"],
            mouse: "left",
        },
    },
    debug: true,
    debugKey: "d"//to show debug information, on pressing this key
    ,
})
// }


export default k