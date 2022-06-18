loc = null;
weather = null;
weathercode = null;
function preload() {
  loadJSON("https://ipwhois.app/json/", l =>
    loadJSON(`https://api.open-meteo.com/v1/forecast?latitude=${l.latitude}&longitude=${l.longitude}&current_weather=true`, w => {
      weathercode = w.current_weather.weathercode
      weather = w
      loc = l
    }))
}

arrayOfStars = null;

function setup() {
  createCanvas(600, 600);
  //frameRate(60);
  arrayOfStars = Array.from({ length: 10 }, (_, i) => {
    return {
      locationX: random(150, 480),
      locationY: random(150, 350),
      size: random(3, 4)
    }
  }
  )
  for (i = 0; i < 30; i++) {
    rain[i] = new Rain(random(200, 420), random(200, 550));
  }
}




function globe(day = false) {
  // land
  noStroke();
  fill('darkblue');
  arc(300, 425, 302, 110, radians(0), radians(180));
  arc(300, 440, 248, 110, radians(0), radians(180));

  //globe

  stroke('white')
  strokeWeight(5)
  if (day) fill(173, 216, 230, 80)
  else fill(0, 76, 102, 90)

  //that fourth value - fill(r,g,b,?) is for transparency! 
  circle(width / 2, height / 2, 400)


  //base
  noStroke()
  fill('white')
  rect(width / 2 - 75, height / 2 - 30 + 215, 150, 60)

  //gold decorations
  fill(235, 178, 45)
  circle(width / 2, height / 2 - 222, 30)
  rect(width / 2 - 20, height / 2 - 210, 40, 10, 2)

  rect(width / 2 - 80, height / 2 - 30 + 215, 160, 10, 2)
  rect(width / 2 - 80, height / 2 + 210 + 30, 160, 10, 2)


}


function drawClouds() {
  let cloudx1 = width / 2 + 20;
  let cloudx2 = width / 2 + 120;
  let cloudx3 = width / 2 - 30;
  let cloudy = height / 2 - 80;
  cloud(cloudx1, cloudy - 60);
  cloud2(cloudx2, cloudy - 10)
  cloud3(cloudx3, cloudy + 30)
  // cloudx1 = (cloudx1 + 0.1) % (width + 40);
  // cloudx2 = (cloudx2 + 0.3) % (width + 40);
  // cloudx3 = (cloudx3 + 0.2) % (width + 40);
}

function cloud(cloudx, cloudy) {
  fill(250)
  noStroke();
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx + 10, cloudy + 10, 90, 50);
  ellipse(cloudx - 20, cloudy + 10, 120, 50);
}
function cloud2(cloudx, cloudy) {
  fill(250)
  noStroke();
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx + 10, cloudy + 10, 70, 50);
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
}
function cloud3(cloudx, cloudy) {
  fill(250)
  noStroke();
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx + 10, cloudy + 10, 90, 50);
  ellipse(cloudx - 20, cloudy + 10, 85, 50);
}

function draw() {
  // background('green');
  // print(weather.current_weather.weathercode)
  // weathercode = 30

  let a = (new Date().getHours() > 6 && new Date().getHours() < 20)
  // a = true
  if (a) {
    background('lightblue');
    drawSun()
  } else {
    background('grey');
    if (weathercode < 51) stars()
    moon()

  }
  // if (weathercode < 4) birds()
  if (weathercode >= 3) drawClouds()
  globe(a)
  if (weathercode < 51 && a) {
    birds()
  }
  if (weathercode >= 51 && weathercode < 71) {
    for (i = 0; i < rain.length; i++) {
      rain[i].dropRain();
      rain[i].splash();
    }
  }
  if (weathercode >= 71 && weathercode < 95) {
    snowing();
  }
  if (weathercode >= 95) {
    for (i = 0; i < rain.length; i++) {
      rain[i].dropRain();
      rain[i].splash();
      // rain[i].dropRain();
      // rain[i].splash();
    }
    if (0.02 > random()) lightning()

  }
  noStroke()
  textSize(32);
  fill('ivory')
  text(loc.city, 15, 40);
  textSize(42)
  text(weather.current_weather.temperature + '°C', 15, 80);
}

function ground() {
  //noStroke();
  fill(170, 150, 146, 240);
  rect(0, 530, 600, 530);
}
var rain = [];
var rainingNow = true;
var bgcolor = (100, 100, 100);

function Rain(x, y) {

  this.x = x;
  this.y = y;
  //this.gravity = 9.8;
  this.length = 15;
  this.r = 0;
  this.opacity = 200;


  this.dropRain = function () {
    noStroke();
    fill(255);
    //rect(this.x, this.y,3,15);
    ellipse(this.x, this.y, 3, this.length);
    this.y = this.y + 6 //+ frameCount / 60;
    if (this.y > 560) {
      this.length = this.length - 5;
      //this.y= random(0,-100);
    }
    if (this.length < 0) {
      this.length = 0;
    }
  }

  this.splash = function () {
    strokeWeight(2);
    //stroke(245, 200/frameCount);
    stroke(245, this.opacity);
    noFill();
    if (this.y > 318) {
      ellipse(this.x, 450, this.r * 2, this.r / 2);
      this.r++;
      this.opacity = this.opacity - 10;

      //keep the rain dropping
      if (this.opacity < 0) {
        this.y = random(190, 250);
        this.length = 15;
        this.r = 0;
        this.opacity = 200;
      }
    }
  }
}




function drawSun() {

  fill(245, 187, 87);
  stroke(245, 187, 87);
  push();
  translate(width / 2 - 70, height / 2 - 100);
  rotate(radians(frameCount / 2));
  ellipse(0, 0, 60, 60);
  line(0, -60, 0, -40);
  line(0, 40, 0, 60);
  line(-45, -45, -30, -30);
  line(45, -45, 30, -30);
  line(-60, 0, -40, 0);
  line(40, 0, 60, 0);
  line(-45, 45, -30, 30);
  line(45, 45, 30, 30);
  pop();
  noFill();
}

////////////////////////////NIGHT
// var slider;
let img;
function current_weather() { return "night"; } //rainy, sunny, snow

function preLoad() {
  img = loadImage('images/moon.pg');

  //why wont my image load? I put the function in the draw mode and it just messes up my whole slider, so I removed it for now because then it doesnt work at all.. HELP???!!!I WANT TO ADD A PNG Of A REAL MOON INSTEAD OF THIS ONE AND ITS JUST NOT HAVING IT FOR ME ...... 
}


function moon() {
  noStroke()
  fill(32, 32, 32);
  circle(260, 210, 140);
  fill(50, 50, 50);
  circle(280, 210, 40);
  fill(51, 52, 53);
  circle(220, 200, 27);
  fill(51, 52, 53);
  circle(240, 250, 20);

  // noStroke();
  // fill(230, 230, 180);
  // ellipse(200, 200, 190, 190);

  // noStroke();
  // fill(0, 26, 51);
  // ellipse(270, 200, 200, 200);


}


//// SNOWING ?///////

let snowflakes = []; // array to hold snowflake objects


function snowing() {
  let t = frameCount / 120; // update time
  if (weather.current_weather.weathercode === 0) {
    //
  }
  // create a random number of snowflakes each frame
  if (0.3 > random()) {
    snowflakes.push(new snowflake()); // append snowflake object

  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(180, 250);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 4.5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function (time) {
    // x position follows a circle

    let w = 0.2; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + 25 + this.radius * sin(angle * 3) * 0.4;

    // let w = 0.6; // angular speed
    // let angle = w * time + this.initialangle;
    // this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height - 175) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function () {
    stroke("white")
    ellipse(this.posX, this.posY, this.size);
  };
}

function birds() {
  pile(150, 300, 10)
  pile(114, 270, -10)
  pile(133, 300, 5)
}

function pile(x, y, angle) {
  push()
  strokeWeight(1)
  stroke("black")
  noFill()
  translate(x + (frameCount / 10) % 320, (y - (frameCount % 3200) / 30 - angle + sin((frameCount + angle) / 10)))
  curve(0, 0, 20, 61, 15, 65, 15, 65);
  pop()
}

function lightning() {
  var xCoord1 = 360;
  var yCoord1 = 360;
  var xCoord2 = 360;
  var yCoord2 = 360;

  // function setup() {
  //   createCanvas(400, 400);
  //   drawBackground();
  //   xCoord2 = 0;
  //   yCoord2 = height / 2;
  // }


  for (var i = 0; i < 200; i++) {
    xCoord1 = xCoord2;
    yCoord1 = yCoord2;
    xCoord2 = xCoord1 + int(random(-10, 10));
    yCoord2 = yCoord1 + int(random(-10, 20));
    strokeWeight(random(5, 8));
    strokeJoin(MITER);
    line(xCoord1, yCoord1, xCoord2, yCoord2);

    if ((xCoord2 > width) | (xCoord2 < 0) | (yCoord2 > 420) | (yCoord2 < 0)) {
      // clear();
      // drawBackground();
      xCoord2 = int(random(300, 400));
      yCoord2 = 160;
      stroke(255, 255, random(0, 255));
    }
  }


  // function drawBackground() {
  //   for (var i = 0; i < 500; i++) {
  //     stroke(i - 255, 30, 50);
  //     line(0, i, width, i);
  //   }
  // }
}



console.log(arrayOfStars)
function stars() {


  for (let stars of arrayOfStars) {
    fill('gold')
    // ellipse(350, 480, 5);
    ellipse(stars.locationX, stars.locationY + 50, stars.size, stars.size);

  }

}