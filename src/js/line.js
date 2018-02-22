var margin = { top: 48, right: 48, bottom: 48, left: 48 },
    width = 900 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

function jobYear() {

    var svg = d3.select('.dm-job-year-graph')
        .append('svg')
        .attr('class', 'dm-job-year-graph')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%d-%b-%y");

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
        .x(function(d) { return x(d.fecha); })
        .y(function(d) { return y(d.total); });

    var yAxis = d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(d3.format("d"))
        .ticks(10);

    d3.csv("csv/data-ofertas-anyo.csv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.fecha = parseTime(d.fecha);
            d.total = +d.total;
        });

        x.domain(d3.extent(data, function(d) { return d.fecha; }));
        y.domain([0, d3.max(data, function(d) { return d.total; })]);

        var path = svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline)
            .attr("stroke-width", "1.5")
            .attr("fill", "none");

        var totalLength = path.node().getTotalLength();


        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2500)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);


        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("cx", function(d) { return x(d.fecha); })
            .attr("cy", function(d) { return y(d.total); })
            .attr("class", "circles")
            .attr("r", 3);

        setTimeout(function() {

            svg.selectAll("dot")
                .attr("opacity", "1");
            //Add annotations
            var labels = [{
                note: {
                    title: "Primera oferta de UX: 1/10/09",
                    wrap: 430,
                    align: "middle"
                },
                y: 365,
                x: 95,
                dy: -240,
                dx: 0,
            },{
                note: {
                    title: "Primera oferta de Angular: 3/2/14",
                    wrap: 430,
                    align: "middle"
                },
                y: 330,
                x: 470,
                dy: -240,
                dx: 0,
            },{
                note: {
                    title: "Primera oferta de React: 10/2/16",
                    wrap: 430,
                    align: "middle"
                },
                y: 230,
                x: 630,
                dy: -190,
                dx: 0,
            }
            ].map(function(l) {
                l.note = Object.assign({}, l.note);
                l.subject = { radius: 6 };
                return l;
            });

            window.makeAnnotations = d3.annotation().annotations(labels).type(d3.annotationCalloutCircle).accessors({
                x: function x(d) {
                    return x(d.fecha);
                },
                y: function y(d) {
                    return y(d.total);
                }
            }).accessorsInverse({
                fecha: function fecha(d) {
                    return x.invert(d.x);
                },
                total: function total(d) {
                    return y.invert(d.y);
                }
            }).on('subjectover', function(annotation) {
                annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", false);
            }).on('subjectout', function(annotation) {
                annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", true);
            });

            svg.append("g").attr("class", "annotation-test").call(makeAnnotations);

            svg.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", true);
        }, 1000)


    });

}

function centralizame() {

    var margin = { top: 50, right: 50, bottom: 50, left: 200 };

    var svg = d3.select('.dm-job-city-graph')
        .append('svg')
        .attr('class', 'dm-job-city-chart')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleBand()
        .range([height, 0]);

    var formatPercent = d3.format(".0%");
    var formatChange = function(x) { return formatPercent(x / 100); };

    var xAxis = d3.axisBottom(x)
        .tickSize(-height)
        .tickFormat(formatChange)
        .ticks(10);

    var yAxis = d3.axisLeft(y);

    d3.csv('csv/data-ciudades-porcentaje.csv', function(err, data) {

        data.forEach(function(d) {
            d.ciudad = d.ciudad;
            d.cantidad = +d.cantidad;
        });

        data.sort(function(a, b) {
            return a.cantidad - b.cantidad;
        });

        x.domain([0, d3.max(data, function(d) { return d.cantidad; })]);

        y.domain(data.map(function(d) { return d.ciudad; }))
            .paddingInner(0.2)
            .paddingOuter(0.5);


        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "translate(" + width + ",0)")
            .attr("y", -5)
            .style("text-anchor", "end")
            .text("Frequency");

        svg.append("g")
            .attr("class", "yAxis")
            .call(yAxis);

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", y.bandwidth())
            .attr("y", function(d) { return y(d.ciudad); })
            .transition()
            .duration(1500)
            .ease(d3.easePolyInOut)
            .attr("width", function(d) { return x(d.cantidad); });
    });

}

function remote() {

    var svg = d3.select('.dm-job-remote-graph')
        .append('svg')
        .attr('class', 'dm-job-remote-chart')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%d-%b-%y");

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
        .x(function(d) { return x(d.fecha); })
        .y(function(d) { return y(d.total); });

    var yAxis = d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(d3.format("d"))
        .ticks(10);

    d3.csv("csv/data-remoto-mes.csv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.fecha = parseTime(d.fecha);
            d.total = +d.total;
        });

        x.domain(d3.extent(data, function(d) { return d.fecha; }));
        y.domain([0, d3.max(data, function(d) { return d.total; })]);

        var path = svg.append("path")
            .data([data])
            .attr("class", "lines")
            .attr("d", valueline)
            .attr("stroke-width", "1.5")
            .attr("fill", "none");

        var totalLength = path.node().getTotalLength();


        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2500)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);


        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "yAxis")
            .call(yAxis);

        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("cx", function(d) { return x(d.fecha); })
            .attr("cy", function(d) { return y(d.total); })
            .attr("class", "circles")
            .attr("r", 3);

    });

}

function multiple() {

    var svg = d3.select('.dm-job-multiple-graph')
        .append('svg')
        .attr('class', 'dm-job-multiple-chart')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseDate = d3.timeParse("%Y");

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var priceline = d3.line()
        .x(function(d) { return x(d.fecha); })
        .y(function(d) { return y(d.cantidad); })
        .curve(d3.curveMonotoneX);

    var yAxis = d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(d3.format("d"))
        .ticks(10);

    d3.csv("csv/data-line-puestos.csv", function(error, data) {

        data.forEach(function(d) {
            d.fecha = parseDate(d.fecha);
            d.cantidad = +d.cantidad;
        });

        x.domain(d3.extent(data, function(d) { return d.fecha; }));
        y.domain([0, d3.max(data, function(d) { return d.cantidad; })]);

        var dataComb = d3.nest()
            .key(function(d) { return d.puesto; })
            .entries(data);

        var colors = ["#b114c0", "#9C1B12", "#759CA7", "#CEBAC6", "#2D3065"]

        var color = d3.scaleOrdinal(colors);

        dataComb.forEach(function(d) {
            svg.append("path")
                .attr("class", "line")
                .style("stroke", function() {
                    return d.color = color(d.key)
                })
                .attr("d", priceline(d.values));
        });


        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "yAxis")
            .call(yAxis);

        d3.selectAll(".line").each(function(d, i) {
            var totalLength = d3.select('.line').node().getTotalLength();

            d3.selectAll('.line').attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(4000)
                .delay(200 * i)
                .ease(d3.easeExpIn)
                .attr("stroke-dashoffset", 0)
                .style("stroke-width", 2)
        })

    });
}

jobYear();
centralizame();
remote();
multiple();
