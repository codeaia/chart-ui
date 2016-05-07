//python -m SimpleHTTPServer 8000

$(document).ready(function(){

	d3.json("https://raw.githubusercontent.com/codeaia/chart-ui/gh-pages/data1.json", 
		function(error, data){
			if (error) return console.warn(error);
  			d=data 
  			height = 500;
  			width = 600;
  			padding = 50;
  			dotRadius = height/50;
  			dotStroke = dotRadius - 2;



  			innerTickSize = 5;
  			outerTickSize = 2;

//SCALE
/*
	xDomain = d3.extent(d,function(i){
		return parseInt(i.note1)
	});



	yDomain = d3.extent(data,function(i){
		return parseInt(i.value)
	}); 
*/

	//x axis
	note_scale = d3.scale.linear()
		.domain([0,7])
		.range([0,width]);

	//y axis
	value_scale = d3.scale.linear()
		.domain([0,100])
		.range([height,0]);





//DRAW

  			var chartsvg = d3.select("#chart1").append("svg")
  				.attr("height", height+padding*2)
  				.attr("width",width+padding*2)
  				.append('g')
  				.attr("class","chart")
  				.attr('transform', 'translate(' + padding + ',' + padding + ')'); //Whole chart
			

			var c = chartsvg.selectAll("circle")
				.data(d)
				.enter()
				.append("circle")
				.attr("class","dots")
				.attr("cx",function(d){return note_scale(d.note1)})
				.attr("cy", function(d){return value_scale(d.value)})
				.attr("r", dotRadius);
//		console.log(c);
/*
		var cattr = c
			.attr("cx",function(d){return d.note1;})
			.attr("cy", function(d){return d.value;})
			.attr("radius", "5")
			console.log(c);
*/			


			
				//c = chartsvg.selectAll("circle")


				chartsvg.selectAll("circle")
					.attr("type",function(d){return d.note;})
					.attr("value",function(d){return d.value;})








//LINES
/*
			line = d3.svg.line()
				.x(function(d) {return d.note1})
				.y(function(d) {return d.value})

			d3.select(".chart").append("svg:path")
				.attr("class", "line")
				.attr("d", line(data));

*/


//AXISES
			xAxis = d3.svg.axis().scale(note_scale)
				.orient("bottom")
				.ticks(7)
				.tickSize(innerTickSize,outerTickSize)

				//.ticks(["e", "Midterm", "HW1", "HW2", "HW3", "Quiz", "Final", "Average"])

			yAxis = d3.svg.axis().scale(value_scale)
				.orient("left")
				.ticks(10)
				.tickSize(innerTickSize,outerTickSize)
			

			 
			chartsvg.append("svg:g")
				.attr("class" , "xaxis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)


			chartsvg.append("svg:g")
				.attr("class" , "yaxis")
				.attr("transform", "translate(0, 0)")
				.call(yAxis)


			




//STYLE AND LISTENERS

		$(".dots").on('mouseenter',function(){
				$(this).animate({'stroke': 'rgb(141, 140, 137)','stroke-width': 0},100)

				$(this).animate({'stroke': 'rgb(255, 173, 6)','stroke-width': dotStroke+3},100)
				//cx = parseInt($(this).attr("cx")) + 5;
				//$(this).attr("cx",""+cx)

			
			})

			$(".dots").on('mouseleave',function(){
				$(this).animate({'stroke': 'rgb(141, 140, 137)','stroke-width': dotStroke},100)
				//cx =  parseInt($(this).attr("cx")) - 5;
				//$(this).attr("cx",""+cx);
			})


			
			var a = function(){
				$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke + 16},400)
				$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke - 2},200)

				$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke},150)

			}



			var b = function(){
				$('.dots').animate({'stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke + 2},300)
				$('.dots').animate({'stroke': 'rgb(245, 34, 18)','stroke-width': 0},100)

				//$('.dots').animate({'stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke},150)

			}
			

			var c = function(){

				$('.dots').css({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(141, 140, 137)'})
				//$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(141, 140, 137)','stroke-width': dotStroke + 2},500)
				//$('.dots').animate({'fill' : 'rgb(251, 117, 96)','stroke': 'rgb(141, 140, 137)','stroke-width': 0},500)
				$('.dots').attr("r", dotRadius + 2);
				//$('.dots').animate({'stroke-width': dotStroke + 2, "fill" : "rgb(141, 140, 137)"},300)



				//$('.dots').css({'fill' : 'rgb(141, 140, 137)','stroke': 'rgb(251, 117, 96)'})
				$('.dots').animate({'fill' : 'rgb(141, 140, 137)','stroke': 'rgb(251, 117, 96)','stroke-width': dotStroke + 2},200)
				$('.dots').attr("r", dotRadius);
				//$('.dots').animate({'fill' : 'rgb(141, 140, 137)','stroke': 'rgb(251, 117, 96)','stroke-width': 0},200)

				//$('.dots').animate({'fill' : "rgb(141, 140, 137)",'stroke': 'rgb(251, 117, 96)','stroke-width': dotStroke + 2},500)
				//$('.dots').animate({'fill' : "rgb(41, 140, 137)",'stroke': 'rgb(251, 117, 961)','stroke-width': 0},500)


				//$('.dots').animate({'stroke': 'rgb(245, 34, 18)','stroke-width': dotStroke},150)

			}


			setTimeout(a,300);

			//setInterval(c,200);





  		})//end of callback function









})

