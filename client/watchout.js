// start slingin' some d3 here.
var dataSet = [1, 2, 3, 4];

var enemies = d3.select(".board").selectAll("svg")
	.data(dataSet);

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

createEnemies();
setInterval(updateLocation, 1000);