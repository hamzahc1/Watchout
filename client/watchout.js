// start slingin' some d3 here.
var enemyList = [1, 2, 3, 4];

var playerList = [{'top': '50px', 'left': '50px'}];

var enemies = d3.select(".board").selectAll("svg.enemies")
	.data(enemyList);

var createPlayer = function(){
	d3.select(".mouse").selectAll("svg.player")
		.data(playerList)
		.enter()
		.append("svg")
		.attr("width", "25px")
		.attr("height", "25px")
		.style("top", function(d){
			return d.top;
		})
		.style("left", function(d){
			return d.left;
		})
		.classed("player", true)
		.append("circle")
		.attr("cx", "12.5px")
		.attr("cy", "12.5px")
		.attr("r", "12.5px");
};

var createEnemies = function(){

	enemies.enter()
		.append("svg")
		.attr('width', '25px')
		.attr('height', '25px')
		.style("top", function(){
			return Math.random()*475 + 'px';
		})
		.style("left", function(){
			return Math.random()*475 + 'px';
		})
		.classed('enemies', true)
		.append("image")
		.attr("xlink:href", "asteroid.png")
		.attr('width', '25px')
		.attr('height', '25px');
};

var updateLocation = function() {
	enemies
		.style('top', function() {
			return Math.random()*475 + 'px';
		})
		.style('left', function() {
			return Math.random()*475 + 'px';
		});
};

createPlayer();
createEnemies();
setInterval(updateLocation, 1000);