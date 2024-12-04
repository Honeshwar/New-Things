import k from "../kaplayContext";

export default function gameOver(citySfx) {
    console.log(citySfx);
    citySfx.citySound.paused = true;

    let bestScore = k.getData("best-score");
    let currentScore = k.getData("current-score");



    const rankGrade = ["F", "E", "D", "C", "B", "A", "S"];
    const rankValue = [50, 80, 100, 200, 300, 400, 500];

    let currentRank = "F";
    let bestRank = "F";

    for (let value of rankValue) {
        if (value < currentScore) {
            currentRank = rankGrade[rankValue.indexOf(value)];
        }

        if (value < bestScore) {
            bestRank = rankGrade[rankValue.indexOf(value)];
        }
    }

    if (bestScore < currentScore) {
        k.setData("best-score", currentScore);
        bestScore = currentScore;
        bestRank = currentRank;
    }


    k.add([
        k.text("GAME OVER", { font: "mania", size: 96 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 300),
    ]);

    k.add([
        k.text(`best Score: ${bestScore}`, { font: "mania", size: 96 }),
        k.anchor("center"),
        k.pos(k.center().x - 400, k.center().y - 180),
    ]);

    k.add([
        k.text(`Current Score: ${currentScore}`, { font: "mania", size: 96 }),
        k.anchor("center"),
        k.pos(k.center().x + 400, k.center().y - 180),
    ])


    const bestRankBox = k.add([
        k.rect(400, 400, { radius: 4 }),
        k.color("#000000"),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x - 400, k.center().y + 100),
    ]);

    bestRankBox.add([
        k.text(bestRank, { font: "mania", size: 96 }),
        k.anchor("center"),
    ])


    const currentRankBox = k.add([
        k.rect(400, 400, { radius: 4 }),
        k.color("#000000"),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x + 400, k.center().y + 100),
    ]);

    currentRankBox.add([
        k.text(currentRank, { font: "mania", size: 96 }),
        k.anchor("center"),
    ])

    k.wait(1, () => {
        k.add([
            k.text("Press Space/Click/Touch to Play Again", {
                font: "mania",
                size: 64,
            }),
            k.anchor("center"),
            k.pos(k.center().x, k.center().y + 400),
        ]);
        k.onButtonPress("jump", () => k.go("game"));

    }
    )
}