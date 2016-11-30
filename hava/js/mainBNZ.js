$(document).ready(function(){

/*JSON file
[
	{
		"city":"Izmir, Turkey",
		"date":"2015-1-3",
		"date1":"Saturday, January 3, 2015",
		"year":"2015",
		"month":"1",
		"day":"3",
		"dow":"",
		"meanT":"4",
		"maxT":"",
		"minT":""
	},
	...
]

*/

	//get data
	d3.json("https://raw.githubusercontent.com/abdullahoguk/d3-pg/master/weather-history/weather.json",
		function(error, data){
			if (error) return console.warn(error);

			//sort data
			d = data.sort(function comp(a, b) {
				return new Date(a.date).getTime() - new Date(b.date).getTime();});

			//convert temps to integer
    		d.forEach(function(d) {
    			d.meanT = parseInt(d.meanT,10);
    		})

    		//specify time notation
    		var parseDate = d3.timeParse("%Y-%m-%d");

    		//parse each date in data
			function type(d) {
			    d.date = parseDate(d.date);
			    d.meanT = +d.meanT;
			    return d;
			}

		    d.forEach(function(d) {
		    	type(d);
		    });



		    //chart preferences
			var svg = d3.select("#chart1"),
			    margin = {top: 20, right: 20, bottom: 110, left: 40},
			    margin2 = {top: 430, right: 20, bottom: 30, left: 40},
			    width = +svg.attr("width") - margin.left - margin.right,
			    height = +svg.attr("height") - margin.top - margin.bottom,
			    height2 = +svg.attr("height") - margin2.top - margin2.bottom;
			    dotRadius = 3;
				dotStroke = dotRadius - 2;

				innerTickSize = 5;
				outerTickSize = 2;


	//****SCALES
			//define scales (x,y for top chart) (x2 y2 for navigation chart)
			//x time series
			//y temperature series 		
			var x = d3.scaleTime()
					.domain(d3.extent(d, function(d) { return d.date; }))
					.range([0, width]);

			var x2 = d3.scaleTime()
					.domain(x.domain())
					.range([0, width]);

			var y = d3.scaleLinear()
			    		.domain([-15, 45])
			    		.range([height, 0]);

			var y2 = d3.scaleLinear()
						.domain(y.domain())
						.range([height2, 0]);

			
	//****GENERATOR methods
			//define axis generators
			var xAxis = d3.axisBottom(x)
						.tickSize(innerTickSize,outerTickSize);

			var xAxis2 = d3.axisBottom(x2)
						.tickSize(innerTickSize,outerTickSize);

			var yAxis = d3.axisLeft(y)
						.tickSize(innerTickSize,outerTickSize);


			//???brush generator
			var brush = d3.brushX()
			    .extent([[0, 0], [width, height2]])
			    .on("brush end", brushed);

			//???zoom generator
			var zoom = d3.zoom()
			    .scaleExtent([1, Infinity])
			    .translateExtent([[0, 0], [width, height]])
			    .extent([[0, 0], [width, height]])
			    .on("zoom", zoomed);


 

			//area generator of top chart
			var area = d3.area()
			    .x(function(d) { return x(d.date); })
			    .y0(height)
			    .y1(function(d) { return y(d.meanT); });

			//area generator of botom nav chart    
			var area2 = d3.area()
			    .x(function(d) { return x2(d.date); })
			    .y0(height2)
			    .y1(function(d) { return y2(d.meanT); });

			//line generator of top chart    
			var line = d3.line()
			    .x(function(d) { return x(d.date); })
			    .y(function(d) { return y(d.meanT); });

			//func to draw dots
			var drawDots = function () {
				var dotsg = focus.selectAll("g.dotsg")
					.remove();

				var dotsg = focus.selectAll("g.dotsg")
						.data(d)
						.enter()
						.append("g")
						.attr("class","dotsg")
						.attr("transform", "translate(0,0)");


						dotsg.append("circle")
							.attr("class","dots")
							.attr("cx", function(d){return x(new Date(d.date))})
							.attr("cy", function(d){return y(d.meanT)})
							.attr("r", dotRadius)
							.on('mouseenter',dotsME)
							.on("mouseleave",dotsML);

						dotsg.append("text")
							.text(function(d){return d.meanT})
							.attr("class","valueText")
							.attr("x", function(d){return x(new Date(d.date))})
							.attr("y", function(d){return y(d.meanT)-25})
							.style("display","none")
							.attr("text-anchor", "middle");
			};



	//****DRAW

			//?????????????
			svg.append("defs").append("clipPath")
			    .attr("id", "clip")
			  .append("rect")
			    .attr("width", width)
			    .attr("height", height);

			//focused area wil be shown in top chart. group them
			var focus = svg.append("g")
			    .attr("class", "focus")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			//group content of bottom navigation chart
			var context = svg.append("g")
			    .attr("class", "context")
			    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");



		//TOP Chart draw

			//draw area in top chart
			/*
			focus.append("path")
			    .datum(data)
			    .attr("class", "area area1")
				.attr("d", area);
			*/

			//draw line in top chart
			focus.append("path")
			    .datum(data)
			    .attr("class", "line")
				.attr("d", line);

			//draw top x axis
			focus.append("g")
			    .attr("class", "axis axis--x")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);

			//draw y axix
			focus.append("g")
			    .attr("class", "axis axis--y")
			    .call(yAxis);
			
			//Draw dots
			drawDots();




		//BOTTOM chart draw
			
			//draw area in bottom chart		
			context.append("path")
			    .datum(data)
			    .attr("class", "area area2")
			    .attr("d", area2);

			//draw bottom x axis
			context.append("g")
			    .attr("class", "axis axis--x")
			    .attr("transform", "translate(0," + height2 + ")")
			    .call(xAxis2);

			//????draw bottom brush
			context.append("g")
			    .attr("class", "brush")
			    .call(brush)
			    .call(brush.move, x.range());

			//????Draw zoom
			svg.append("rect")
			    .attr("class", "zoom")
			    .attr("width", width)
			    .attr("height", height)
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			    .call(zoom);


			//??on brushed
			function brushed() {
				if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
				
				//??
				var s = d3.event.selection || x2.range();
				
				//??
				x.domain(s.map(x2.invert, x2));
				focus.select(".area").attr("d", area);
				focus.select(".line").attr("d", line);
				focus.select(".axis--x").call(xAxis);
				drawDots();
				svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
			      .scale(width / (s[1] - s[0]))
			      .translate(-s[0], 0));
			}

			//???on zoom
			function zoomed() {
				if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
				var t = d3.event.transform;
				x.domain(t.rescaleX(x2).domain());
				focus.select(".area").attr("d", area);
				focus.select(".line").attr("d", line);
				focus.select(".axis--x").call(xAxis);
				drawDots();
				context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
			}

			//mouse enter on dots
			function dotsME() {
				g = d3.select(this);
				circle = g.select("circle");
				text = g.select(".valueText");
				text.style("display","block");
				text.text(d.meanT)
			}

			//mouse enter on dots
			function dotsML() {
				g = d3.select(this);
				circle = g.select("circle");
				text = g.select(".valueText");
				text.style("display","none");
			}


	//*****STYLE AND LISTENERS

			$(".dots").on('mouseenter',function(){
				$(this).animate({'stroke': 'rgb(141, 140, 137)','stroke-width': 0},100)
				$(this).animate({'stroke': 'rgb(255, 173, 6)','stroke-width': dotStroke+3},100)
			})

			$(".dots").on('mouseleave',function(){
				$(this).animate({'stroke': 'rgb(255, 173, 6)','stroke-width': 0},100)
				$(this).animate({'stroke': 'rgb(141, 140, 137)','stroke-width': dotStroke},100)
			})


		/*
			var a = function(){
				$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke + 16},400)
				$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke - 2},200)
				$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke},150)
			}

			setTimeout(a,300);
		*/



  		})//end of callback function
})//end of document ready

