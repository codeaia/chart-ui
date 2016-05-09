//python -m SimpleHTTPServer 8000

$(document).ready(function(){

//https://raw.githubusercontent.com/codeaia/chart-ui/gh-pages/data1.json
//http://localhost:8000/data1.json 
	d3.json("https://raw.githubusercontent.com/codeaia/chart-ui/gh-pages/data1.json", 
		function(error, data){
			if (error) return console.warn(error);
  			d=data 
  			height = 450;
  			width = 550;
  			padding = 100;
  			dotRadius = height/50;
  			dotStroke = dotRadius - 2;


  			innerTickSize = 5;
  			outerTickSize = 2;




//SCALE


	var note_scale = d3.scale.linear()
		.domain([1,7])
		.range([0,width])
		//.range();

	//y scale
	var value_scale = d3.scale.linear()
		.domain([0,100])
		.range([height,0]);
		
		


//ZOOM
		
 
         function zoomed() {
            chartsvg.attr("transform", "translate(" + d3.event.translate + ")" + 
               "scale(" + d3.event.scale + ")");
         };
  			var zoom = d3.behavior.zoom()
  				.scaleExtent([0.75,7])
  				.on("zoom",zoomed);



//BLUR
		var blurDiv = d3.select("#blurdiv")
  				.style("height", height +padding*2 + "px")
  				.style("width",width + padding*2 +  "px")
  				.attr("align","center");
  				





//DRAW
	
  			var wholesvg = d3.select("#chart1").append("svg")
  				.attr("height", height+padding*2)
  				.attr("width",width+padding*2)
  				.attr("class","chartsvg")
  				.call(zoom);

  				var chartsvg = wholesvg.append('g')
  				.attr("class","chart")
  				.attr('transform', 'translate(' + padding + ',' + padding + ')')
  				
  				 //Whole chart
				


	//AXISES
			xAxis = d3.svg.axis().scale(note_scale)
				.orient("bottom")
				.ticks(7)
				.tickSize(innerTickSize,outerTickSize)

			yAxis = d3.svg.axis().scale(value_scale)
				.orient("left")
				.ticks(10)
				.tickSize(innerTickSize,outerTickSize)
			

			 
			chartsvg.append("svg:g")
				.attr("class" , "xaxis")
				.attr("transform", "translate(40," + height + ")")
				.call(xAxis);
				
				

			chartsvg.append("svg:g")
				.attr("class" , "yaxis")
				.attr("transform", "translate(0, 0)")
				.call(yAxis)


			ticks = d3.selectAll(".xaxis .tick text")
				.data(d)
				.text(function(d){return d.note});

		//LINES
	

			line = d3.svg.line()
				.x(function(d) {return note_scale(d.note1)})
				.y(function(d) {return value_scale(d.value)});


			var lines = chartsvg.append("path")
				.data([d])
				.attr("class", "line")
				.attr("d", line(d) )
				.attr("transform", "translate(40,0)")



		//DOTS GROUP(each of them contains a circle and text)


			var dotsg = chartsvg.selectAll("g.dotsg")
				.data(d)
				.enter()
				.append("g")
				.attr("class","dotsg")
				.attr("transform", "translate(40,0)")

				dotsg.append("circle")
					.attr("class","dots")
					.attr("cx",function(d){return note_scale(d.note1)})
					.attr("cy", function(d){return value_scale(d.value)})
					.attr("r", dotRadius)
				
				dotsg.append("text")
					.text(function(d){return d.value})
					.attr("class","valueText")
					.attr("x",function(d){return note_scale(d.note1)})
					.attr("y", function(d){return value_scale(d.value)-25})
					.style("display","none")
					.attr("text-anchor", "middle");


				//NAME
					var name = wholesvg.append("text")
						.data(d)
						.attr("class","nameText")
						.text(function(d){return d.name})
						.attr("x" , (width+(2*padding))/2)
						.attr("y", height+2*padding-15)
						.attr("text-anchor", "middle")


//STYLE AND LISTENERS

		$(".dots").on('mouseenter',function(){
				$(this).animate({'stroke': 'rgb(141, 140, 137)','stroke-width': 0},100)
				$(this).animate({'stroke': 'rgb(255, 173, 6)','stroke-width': dotStroke+3},100)
							
			})

				$(".dots").on('mouseleave',function(){
				$(this).animate({'stroke': 'rgb(255, 173, 6)','stroke-width': 0},100)
				$(this).animate({'stroke': 'rgb(141, 140, 137)','stroke-width': dotStroke},100)
				
			})


		dotsg.on("mouseenter",function(d,i){
			g = d3.select(this);
			circle = g.select("circle");
			text = g.select(".valueText");
			text.style("display","block");
			text.text(d.value)

		})

		dotsg.on("mouseleave",function(d,i){
			g = d3.select(this);
			circle = g.select("circle");
			text = g.select(".valueText");
			text.style("display","none");

		})

			var a = function(){
				$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke + 16},400)
				$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke - 2},200)

				$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke},150)

			}



			setTimeout(a,300);

			

  		})//end of callback function

})

