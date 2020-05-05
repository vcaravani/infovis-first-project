/** infovis first project */

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 420 - margin.left - margin.right,
height = 360 - margin.top - margin.bottom;

// visualization flag
var onX = "x"
var onY = "y"
var excluse = "z"

 
d3.json("data/data.json").then(function(data){


    var svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
      .domain([0,d3.max(data, function (d) {
              return d["x"]+50;
          })+50])
      .range([ 0, width ]);

    var xAxis = svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .on('click', updatePlot);
      
    // Add X axis label:
    var xAxisLabel = svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text(onX);

    // Scale the range of the data
          // to do
    
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) {
              return d["y"];})+50])
      .range([ height, 0])

    var yAxis = svg.append("g")
      .attr("id", "y-axis")
      .call(d3.axisLeft(y))
      .on('click', updatePlot);

    // Y axis label:
    var yAxisLabel = svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text(onY)
      
    // div and tooltip to show values in graph
    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d[onX]); } )
        .attr("cy", function (d) { return y(d[onY]); } )
        .attr("r", 5.5)
        .style("fill", "#69b3a2")
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                  .duration('300')
                  .attr("r", 7);
            div.transition()
                .duration(200)
                .style("opacity", 1);
            div.html((onX)+": "+(d[onX])+"\n"+(onY)+": "+(d[onY]))
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 25) + "px");
      })
      .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('400')
                .attr("r", 5);
            div.transition()
                .duration('400')
                .style("opacity", 0);
      });


      // function that update the plot on axis-click event  
      function updatePlot() {

          target = this.id
         
          if (target === "x-axis"){
    
            // Update X axis
            x.domain([0, d3.max(data, function (d) {
                  return d[excluse]})+50])
            xAxis.transition().duration(1000).call(d3.axisBottom(x))
    
            xAxisLabel.text(excluse)
    
            // Update plot 
            svg.selectAll("circle")
              .data(data)
              .transition()
              .duration(1000)
                .attr("cx", function (d) { return x(d[excluse]); } )
                .attr("cy", function (d) { return y(d[onY]); } )
    
            // update flag
            let tmp = onX
            onX = excluse
            excluse = tmp
          }
          else
          {
            // update Y axis
            y.domain([0,d3.max(data, function (d) {
                  return d[excluse]})+50])
            yAxis.transition().duration(1000).call(d3.axisLeft(y))
            yAxisLabel.text(excluse)
    
            // Update plot 
            svg.selectAll("circle")
              .data(data)
              .transition()
              .duration(1000)
                .attr("cx", function (d) { return x(d[onX]); } )
                .attr("cy", function (d) { return y(d[excluse]); } )
    
            // update flag
            let tmp = onY
            onY = excluse
            excluse = tmp
    
          }
        }
    })
    
     