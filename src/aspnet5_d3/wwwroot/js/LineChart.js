"use strict";
var Charts;
(function (Charts) {
    var LineChart = (function () {
        function LineChart(width, height, data) {
            this.number = 0;
            // See https://gist.github.com/mbostock/1642989 for a similar sample..
            // and here https://gist.github.com/mbostock/1642989 for a tutorial
            this._width = width;
            this._height = height;
            // declaratively define the scale of each access - returns a function definition which
            // can be used to map domain points to svg (screen) points
            var mapy = d3.scale.linear().domain([0, d3.max(data)]).range([this._height, 0]);
            var mapx = d3.scale.linear().domain([0, data.length]).range([0, this._width]);
            var body = d3.select('#graph');
            // Create the main svg element
            var vis = body
                .append("svg")
                .attr("width", this._width)
                .attr("height", this._height);
            vis.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", this._width)
                .attr("height", this._height);
            // Define how both x and y axis' will appear when rendered - rendering is 
            // calculated automatically from the mapping functions defined earlier
            var xAxis = d3.svg.axis().scale(mapx)
                .orient("bottom").ticks(1);
            var yAxis = d3.svg.axis().scale(mapy)
                .orient("left").ticks(5);
            // Create a transform group to hold the axes 
            var xaxisg = vis.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            var yaxisg = vis.append("svg:g")
                .attr("class", "y axis")
                .call(yAxis);
            // Define the data line we want to draw in terms of our mapping functions..
            var line = d3.svg.line()
                .interpolate("basis")
                .x(function (d, i) { return mapx(i); })
                .y(function (d) { return mapy(d); });
            var g = vis.append("svg:g");
            var path = g
                .attr("clip-path", "url(#clip)")
                .append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);
            var that = this;
            tick();
            // Finally, create a transform group for the data line and pass the data array
            // into the line - this will result in an svg path element.. 
            //var g = vis.append("svg:g");
            //g.append("svg:path").attr("d", line(data));
            function tick() {
                // push a new data point onto the back
                data.push(that.currentValue);
                // redraw the line, and slide it to the left
                path
                    .attr("d", line)
                    .attr("transform", null)
                    .transition()
                    .duration(500)
                    .ease("linear")
                    .attr("transform", "translate(" + mapx(-1) + ",0)")
                    .each("end", tick);
                // pop the old data point off the front
                data.shift();
            }
        }
        Object.defineProperty(LineChart.prototype, "currentValue", {
            get: function () {
                return this._currentValue;
            },
            set: function (value) {
                this._currentValue = value;
            },
            enumerable: true,
            configurable: true
        });
        return LineChart;
    })();
    Charts.LineChart = LineChart;
    ;
})(Charts || (Charts = {}));
