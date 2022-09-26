/* reference:

*/

/* ------------------------------ GUI Parameters ------------------------------ */
// var params = {
//     displayMode: true,
//     test: 12
// };

// var gui = new dat.gui.GUI();
// gui.add(params, "displayMode");
// gui.add(params, "s").min(20).max(350).step(1);


/* ------------------------------ setup ------------------------------ */
let heartArr = [];
let col1 = '#F0E9D8'; // colorset1: yellow
let col2 = '#789BD6'; // colorset2: blue
let col3 = "#B80E25"; // colorset3: red
let minX = 0;
let maxX = 0;
let minY = 0;
let maxY = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    //rectMode(CENTER);
    //angleMode(DEGREES);
    frameRate(15);

    stroke(col3);
    heart(8, 4); //scal=10: how big is the heart?
    // test();
}

function draw() {
    background(250);
    //colorNoise(col3);
    drawHeart(col3, 5, 2.6, 10);
    fillCanvas(col3);
}

function keyPressed() {
    if (keyCode == '83') {
        saveCanvas('img', 'jpg');
    };
}


function colorNoise(col) {
    let paintColor = color(col);
    let paintAlpha;
    noStroke();

    for (let j = 0; j < height; j += random(2, 5)) {
        for (let i = 0; i < width; i += random(1, 5) * 3) {
            let centerX = width / 2;
            let centerY = height / 2;
            let d = dist(centerX, centerY, i, j);
            rectMode(CENTER);
            if (d > 100) {
                paintAlpha = random(0.08)
                paintColor.setAlpha(paintAlpha)
                fill(paintColor)

                if (random(3) < 2) {
                    rect(i + random(-5, 10), j + random(-5, 5), random(10), random(5))
                } else {
                    rect(i + random(-15, 10), j + random(-2, 2), random(2), random(20))
                }
            } else {
                paintAlpha = (random(15, 100) + random(15, 100) + random(15, 100)) / 3 / 100;
                paintColor.setAlpha(paintAlpha)
                fill(paintColor)
                if (random(3) < 2) {
                    rect(i + random(-5, 5), j + random(-5, 5), random(20), random(35))
                } else {
                    rect(i + random(-10, 10), j + random(-3, 3), random(20), random(5))
                }
            }
            //console.log(paintAlpha, i, j);
        }
    }
}

function drawHeart(col, posXlimit, randomMin, yMax) {
    let paintColor = color(col);
    let paintAlpha;
    noStroke();

    push();
    translate(width / 2, height / 2 - 10);

    for (let i = 0; i < heartArr.length; i++) {
        paintAlpha = (random(15, 100) + random(15, 100) + random(15, 100)) / 3 / 100
        paintColor.setAlpha(paintAlpha);
        fill(paintColor);
        let posX = heartArr[i].x;
        let posY = heartArr[i].y;
        if (posX < posXlimit && posX > -posXlimit) {
            if (random(3) > randomMin) {
                rect(posX + random(-5, 5), posY + random(-5, 5), random(5), random(15))
            }
        } else if (posY > maxY - yMax) {
            rect(posX + random(-5, 5), posY, random(2), random(5))
        } else {
            if (random(3) < 2) {
                rect(posX + random(-5, 5), posY + random(-5, 5), random(15), random(22))
            } else {
                rect(posX + random(-10, 10), posY + random(-3, 3), random(20), random(8))
            }
        }
    }
    pop();
}

function fillCanvas(col) {

    let paintColor = color(col);
    let paintAlpha;
    noStroke();

    for (let j = 0; j < height; j += random(2, 5)) {
        for (let i = 0; i < width; i += random(1, 5) * 3) {
            paintAlpha = random(0.08);
            paintColor.setAlpha(paintAlpha)
            fill(paintColor)
            if (random(3) < 2) {
                rect(i + random(-5, 10), j + random(-5, 5), random(10), random(5))
            } else {
                rect(i + random(-15, 10), j + random(-2, 2), random(2), random(20))
            }
        }
    }

}

function test() {

    for (let j = -height / 2; j < height / 2; j += random(2, 5)) {
        for (let i = 0; i < width; i += random(1, 5) * 3) {
            // heartArr.forEach(pt => {
            //     stroke(col3);
            //     point(heartArr[pt].x, heartArr[pt].y);
            // })
            for (let k = 0; k < heartArr.length; k++) {
                if (j === int(heartArr[k].y)) {
                    console.log(heartArr[k].x, j);
                }
            }
        }
    }
}

function heart(scal, numRing) {

    // let minX = 0;
    // let maxX = 0;
    // let minY = 0;
    // let maxY = 0;
    push();
    translate(width / 2, height / 2);
    for (let t = -PI; t < numRing * TWO_PI; t += PI / 360) {
        //let scal2 = scal * (random() + random()) / 2;
        let scal2 = scal * random();
        let x = 16 * pow(sin(t), 3) * scal2;
        let y = (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)) * scal2;
        y = -y;
        point(x, y);
        if (x < minX) { minX = x } else if (x > maxX) { maxX = x };
        if (y < minY) { minY = y } else if (y > maxY) { maxY = y };
        heartArr.push({ x, y });
    };
    // line(minX, minY, minX, maxY);
    // line(maxX, minY, maxX, maxY);
    console.log(heartArr);
    console.log(maxY);
    // console.log(minX, minY, maxX, maxY);
    pop();
}



class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawQuad(w, h) {
        this.deltaW = w;
        this.deltaH = h;

        let vertexLean = random(0.95, 1);
        quad(this.x, this.y,
            this.x + this.deltaW, this.y,
            this.x + this.deltaW * vertexLean, this.y + this.deltaH * vertexLean,
            this.x, this.y + this.deltaH);
        // beginShape();
        // vertex(this.x, this.y);
        // vertex(this.x + this.deltaW, this.y);
        // vertex(this.x, this.y + this.deltaH);
        // vertex(this.x + this.deltaW * vertexLean, this.y + this.deltaH * vertexLean);
        // endShape(CLOSE);
    }
}
