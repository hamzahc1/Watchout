// start slingin' some d3 here.
var RADIUS = 12.5;
var BOARD_SIZE = 500;

var enemyList = [1, 2, 3, 4];

var playerList = [{'width': 500, 'height': 500, 'r': 12.5}];

var enemies = d3.select(".board").selectAll("svg.enemies")
	.data(enemyList);

var player =d3.select(".mouse").selectAll("svg.player")
		.data(playerList);

var currentScore = d3.select(".current").select("span");
var highScore = d3.select(".highscore").select("span");
var collisions = d3.select(".collisions").select("span");

var drag = d3.behavior.drag()
	// .on("dragstart", function(){
	// 	player.style("fill", "red");
	// })
	.on("drag", function(){
		var dx = d3.event.x;
		var dy = d3.event.y;

		dx = dx < 487.5 ? dx : 487.5;
		dx = dx > 12.5 ? dx : 12.5;

		dy = dy < 487.5 ? dy : 487.5;
		dy = dy > 12.5 ? dy : 12.5;

		//d3.select(this).attr("transform", "translate(" + dx + ", " + dy + ")");
		player.select('circle').attr("cy", dy).attr("cx", dx);
	});


var createPlayer = function(){
	player.enter()
		.append("svg")
		.attr("width", function(d) {
			return d.width;
		})
		.attr("height", function(d) {
			return d.height;
		})
		.classed("player", true)
		.append("circle")
		.attr("cx", function(d) {
			return d.width/2;
		})
		.attr("cy", function(d) {
			return d.height/2;
		})
		.attr("r", function(d) {
			return d.r;
		})
		.attr("cursor", "pointer")
		.call(drag);
};

var createEnemies = function(){

	enemies.enter()
		.append("svg")
		.attr('width', 25)
		.attr('height', 25)
		.style("top", function(){
			return Math.floor(Math.random()*475);
		})
		.style("left", function(){
			return Math.floor(Math.random()*475);
		})
		.classed('enemies', true)
		.append("image")
		.attr("xlink:href", "asteroid.png")
		.attr('width', 25)
		.attr('height', 25); 
};

var checkCollision = function(enemyX, enemyY, playerX, playerY) {
	var xDiff = Math.abs(enemyX - playerX);
	var yDiff = Math.abs(enemyY - playerY);

	return xDiff < RADIUS*2 && yDiff < RADIUS*2;
};

var updateLocation = function() {
	var generate = function(n){
		var result = [];
		for(var i = 0; i<n; i++){
			result.push(Math.floor(Math.random()*475));
		}
		return result;
	};
	arrX = generate(enemyList.length);
	arrY = generate(enemyList.length);

	enemies
		.transition()
		.tween("custom", function(d,i){
			var oldX = Number(this.style.left.slice(0,-2));
			var oldY = Number(this.style.top.slice(0,-2));

			var xInterpolater = d3.interpolate(oldX, arrX[i]);
			var yInterpolater = d3.interpolate(oldY, arrY[i]);
			return function(t){
				var currentX = xInterpolater(t);
				var currentY = yInterpolater(t);

				var playerX = player.select('circle').attr('cx');
				var playerY = player.select('circle').attr('cy');

				if (checkCollision(currentX+RADIUS, currentY+RADIUS, playerX, playerY)) {

					restartGame();
				}
			};

		})
		.style('top', function(d,i) {
			return arrY[i];
		})
		.style('left', function(d,i) {
			return arrX[i];
		})
		.duration(750)
		.delay(1000);
};

var updateScore = function() {
	var score = Number(currentScore.text());
	score++;
	currentScore.text(score);
};

var restartGame = function() {
	var score = Number(currentScore.text());
	var currentHighScore = Number(highScore.text());

	if (score > currentHighScore) {
		highScore.text(score);
	}

	currentScore.text('0');
	setTimeout(function(){
		var numCollisions = Number(collisions.text()) + 1;
		collisions.text(numCollisions);
	}, 500);

	player.style("fill","red");
	setTimeout(function(){
		player.style("fill", "black");
	}, 500);
};

createPlayer();
createEnemies();
setInterval(updateLocation, 1200);
setInterval(updateScore, 500);

// player.call(drag);