function drawGrass(x1, y1, maxLength) {

    var totalLength = 0;
    var currentLength = 0;



    while (totalLength < maxLength) {
        var height = random(2, 10);
        currentLength = random(2, 6);


        if (currentLength + totalLength > maxLength) {
            currentLength = maxLength - totalLength;
        }

        fill(color(55, random(150, 255), 55));
        stroke(color(0,0,255));
        rect(x1 + totalLength, y1 - height, currentLength, height, 2, 2, 0, 0, 0);
        noStroke();
        rect(x1 + totalLength, y1 - height+1, currentLength, height-1, 2, 2, 0, 0, 0);


        totalLength += currentLength;
    }

}

function drawTopsoil(x1, y1, maxLength) {
    var maxX = x1 + maxLength;
    var width = random(1, 3);
    var totalLength = x1 + width;

    push();

    noStroke();

    fill(_.sample(greens));



    while (totalLength < maxX) {

        ellipse(totalLength, y1, width, random(1, 3));

        totalLength += random(1, 3);
    }



    pop();
}

function speckleBlock(x1, y1, width, height, density) {
    var totalArea = 0;
    var maxArea = width * height;
    var spots = [];
    var maxX = x1 + width;
    var maxY = y1 + height;
    var count = 50;

    function overlap(rect1, rect2) {
        var overlapper = rect1.x1 <= rect2.x2 & rect1.x2 >= rect2.x1 & rect1.y1 <= rect2.y2 & rect1.y2 >= rect2.y1;
        return overlapper;
    }



    push();
    noStroke();

    while (totalArea / maxArea <= density) {
        count--;
        fill(_.sample(dirts));


        width = random(4, 20);
        height = random(4, 20);

        var originX = random(x1, maxX - width - 4);
        var originY = random(y1, maxY - height - 4);

        var spot = {
            x1: originX,
            x2: originX + width,
            y1: originY,
            y2: originY + height
        }

        //var doesItOverlap = _.some(spots, function(r) {
        //return overlap(spot, r);
        //});

        //if (doesItOverlap) {
        //continue;
        //}


        rect(spot.x1, spot.y1, width, height, 2, 2, 2, 2);

        totalArea += width * height;


        //spots.push(spot);

    }

    pop();
}

function drawBlock(x1, y1, width, height) {
    push();

    fill(_.sample(tileBackgrounds));

    rect(x1, y1, width, height);

    pop();

}

function drawTile(x1, y1, width, height, density) {

    noStroke();
    drawBlock(x1, y1, width, height);
    speckleBlock(x1, y1, width, height, density);
    speckleBlock(x1, y1, width, height, density);

    drawGrass(x1, y1, width);
   // drawTopsoil(x1, y1, width);
    //drawTopsoil(x1, y1, width);

    drawGrass(x1, y1, width);


}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("#7ec0ee");


    greens = [
        color("#316516"),
        color("#557D24"),
        color("#D9F895"),
        color("#B8F348"),
        color("#65AE2D")
    ]

    tileBackgrounds = [
        color(53, 49, 13, 255)
    ]

    dirts = [
        color(53, 49, 13, 122),
        color(98, 73, 33, 122),
        color(37, 39, 25, 122)
    ];


    for (var i = 300; i >= 0; i-=20) {
      drawTile(i,100,20,20,.75);
    };



}

function mouseClicked() {
  console.log(mouseX,mouseY);
  console.log(Math.ceil(mouseX/20)*20,Math.ceil(mouseY/20));
  drawTile(Math.floor(mouseX/20)*20,Math.floor(mouseY/20)*20,20,20,.75);
}

function draw() {



}