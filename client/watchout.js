// start slingin' some d3 here.
var enemyList = [1, 2, 3, 4];

var playerList = [{'top': '50px', 'left': '50px'}];

var enemies = d3.select(".board").selectAll("svg.enemies")
	.data(enemyList);

var player =d3.select(".mouse").selectAll("svg.player")
		.data(playerList);

var drag = d3.behavior.drag()
	.on('dragstart', function(){ 
		player.style("fill", "red");
	})
	.on("drag", function(){
		player.style("top", d3.event.y).style("left", d3.event.x);
	})
	.on("dragend", function(){
		player.style("fill", "black");
	});

var createPlayer = function(){
	player.enter()
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
		.attr("r", "12.5px")
		.call(drag);
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


// player.call(drag);