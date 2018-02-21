function jobYear(){var t=48,a=48,n=48,e=48,r=850-e-a,o=500-t-n,c=d3.select(".dm-job-year-graph").append("svg").attr("class","dm-job-year-graph").attr("width",r+e+a).attr("height",o+t+n).append("g").attr("transform","translate("+e+","+t+")"),s=d3.timeParse("%d-%b-%y"),i=d3.scaleTime().range([0,r]),d=d3.scaleLinear().range([o,0]),l=d3.line().x(function(t){return i(t.fecha)}).y(function(t){return d(t.total)}),u=d3.axisLeft(d).tickSize(-r).tickFormat(d3.format("d")).ticks(10);d3.csv("csv/data-ofertas-anyo.csv",function(t,a){if(t)throw t;a.forEach(function(t){t.fecha=s(t.fecha),t.total=+t.total}),i.domain(d3.extent(a,function(t){return t.fecha})),d.domain([0,d3.max(a,function(t){return t.total})]);var n=c.append("path").data([a]).attr("class","line").attr("d",l).attr("stroke-width","1.5").attr("fill","none"),e=n.node().getTotalLength();n.attr("stroke-dasharray",e+" "+e).attr("stroke-dashoffset",e).transition().duration(2500).ease(d3.easeLinear).attr("stroke-dashoffset",0),c.append("g").attr("class","x-axis").attr("transform","translate(0,"+o+")").call(d3.axisBottom(i)),c.append("g").attr("class","y-axis").call(u),c.selectAll("dot").data(a).enter().append("circle").attr("cx",function(t){return i(t.fecha)}).attr("cy",function(t){return d(t.total)}).attr("class","circles").attr("r",3),setTimeout(function(){c.selectAll("dot").attr("opacity","1");var t=[{note:{label:"1/10/09",title:"Primera oferta de UX",wrap:430,align:"middle"},y:335,x:85,dy:-240,dx:0}].map(function(t){return t.note=Object.assign({},t.note),t.subject={radius:6},t});window.makeAnnotations=d3.annotation().annotations(t).type(d3.annotationCalloutCircle).accessors({x:function t(a){return t(a.fecha)},y:function t(a){return t(a.total)}}).accessorsInverse({fecha:function(t){return i.invert(t.x)},total:function(t){return d.invert(t.y)}}).on("subjectover",function(t){t.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!1)}).on("subjectout",function(t){t.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!0)}),c.append("g").attr("class","annotation-test").call(makeAnnotations),c.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!0)},1e3)})}function centralizame(){var t=50,a=50,n=50,e=200,r=950-e-a,o=600-t-n,c=d3.select(".dm-job-city-graph").append("svg").attr("class","dm-job-city-chart").attr("width",r+e+a).attr("height",o+t+n).append("g").attr("transform","translate("+(e-a)+","+t+")"),s=d3.scaleLinear().range([0,r]),i=d3.scaleBand().range([o,0]),d=d3.format(".0%"),l=d3.axisBottom(s).tickSize(-o).tickFormat(function(t){return d(t/100)}).ticks(10),u=d3.axisLeft(i);d3.csv("csv/data-ciudades-porcentaje.csv",function(t,a){a.forEach(function(t){t.ciudad=t.ciudad,t.cantidad=+t.cantidad}),a.sort(function(t,a){return t.cantidad-a.cantidad}),s.domain([0,d3.max(a,function(t){return t.cantidad})]),i.domain(a.map(function(t){return t.ciudad})).paddingInner(.2).paddingOuter(.5),c.append("g").attr("class","xAxis").attr("transform","translate(0,"+o+")").call(l).append("text").attr("class","label").attr("transform","translate("+r+",0)").attr("y",-5).style("text-anchor","end").text("Frequency"),c.append("g").attr("class","yAxis").call(u),c.selectAll(".bar").data(a).enter().append("rect").attr("class","bar").attr("x",0).attr("height",i.bandwidth()).attr("y",function(t){return i(t.ciudad)}).transition().duration(1500).ease(d3.easePolyInOut).attr("width",function(t){return s(t.cantidad)})})}function remote(){var t=48,a=48,n=48,e=48,r=900-e-a,o=500-t-n,c=d3.select(".dm-job-remote-graph").append("svg").attr("class","dm-job-remote-chart").attr("width",r+e+a).attr("height",o+t+n).append("g").attr("transform","translate("+e+","+t+")"),s=d3.timeParse("%d-%b-%y"),i=d3.scaleTime().range([0,r]),d=d3.scaleLinear().range([o,0]),l=d3.line().x(function(t){return i(t.fecha)}).y(function(t){return d(t.total)}),u=d3.axisLeft(d).tickSize(-r).tickFormat(d3.format("d")).ticks(10);d3.csv("csv/data-remoto-mes.csv",function(t,a){if(t)throw t;a.forEach(function(t){t.fecha=s(t.fecha),t.total=+t.total}),i.domain(d3.extent(a,function(t){return t.fecha})),d.domain([0,d3.max(a,function(t){return t.total})]);var n=c.append("path").data([a]).attr("class","line").attr("d",l).attr("stroke-width","1.5").attr("fill","none"),e=n.node().getTotalLength();n.attr("stroke-dasharray",e+" "+e).attr("stroke-dashoffset",e).transition().duration(2500).ease(d3.easeLinear).attr("stroke-dashoffset",0),c.append("g").attr("class","xAxis").attr("transform","translate(0,"+o+")").call(d3.axisBottom(i)),c.append("g").attr("class","yAxis").call(u),c.selectAll("dot").data(a).enter().append("circle").attr("cx",function(t){return i(t.fecha)}).attr("cy",function(t){return d(t.total)}).attr("class","circles").attr("r",3)})}function multiple(){var t=48,a=48,n=48,e=48,r=850-e-a,o=500-t-n,c=d3.select(".dm-job-multiple-graph").append("svg").attr("class","dm-job-multiple-chart").attr("width",r+e+a).attr("height",o+t+n).append("g").attr("transform","translate("+e+","+t+")"),s=d3.scaleTime().range([0,r]),i=d3.scaleLinear().range([o,0]),d=d3.line().x(function(t){return s(t.fecha)}).y(function(t){return i(t.cantidad)});d3.csv("csv/data-line-puestos.csv",function(t,a){s.domain(d3.extent(a,function(t){return t.fecha})),i.domain([0,d3.max(a,function(t){return t.cantidad})]);var n=d3.nest().key(function(t){return t.puesto}).entries(a);console.log(n),n.forEach(function(t){c.append("path").attr("class","line").attr("d",d(t.values))}),c.append("g").attr("class","xAxis").attr("transform","translate(0,"+o+")").call(d3.axisBottom(s)),c.append("g").attr("class","yAxis").call(d3.axisLeft(i))})}jobYear(),centralizame(),remote(),multiple();