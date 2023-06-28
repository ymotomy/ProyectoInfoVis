var data_filter = dataset.filter((d) => d.Object_Type == 'Galaxy');
    contenedor2
      .append("path")
      .data([data_filter])
      .attr("d", line)
      // .attr("class", (d) => "line " + class2(d.Object_Type))
      .attr("class", (d) => "line " + class2(d[0].Object_Type))
      .attr("stroke", color['Galaxy'])
      .attr("fill", "transparent")
      .attr("stroke-width", 3)
      .on("click", (d) => select_object(class2(d[0].Object_Type)));
  var data_filter = dataset.filter((d) => d.Object_Type == 'Globular Cluster');
    contenedor2
      .append("path")
      .data([data_filter])
      .attr("d", line)
      .attr("class", "line " + class2('Globular Cluster'))
      .attr("stroke", color['Globular Cluster'])
      .attr("fill", "transparent")
      .attr("stroke-width", 3)
      .on("click", select_object(class2('Globular Cluster')));
  var data_filter = dataset.filter((d) => d.Object_Type == 'Open Cluster');
    contenedor2
      .append("path")
      .data([data_filter])
      .attr("d", line)
      .attr("class", "line " + class2('Open Cluster'))
      .attr("stroke", color['Open Cluster'])
      .attr("fill", "transparent")
      .attr("stroke-width", 3)
      .on("click", select_object(class2('Open Cluster')));
  var data_filter = dataset.filter((d) => d.Object_Type == 'Nebula');
    contenedor2
      .append("path")
      .data([data_filter])
      .attr("d", line)
      .attr("class", "line " + class2('Nebula'))
      .attr("stroke", color['Nebula'])
      .attr("fill", "transparent")
      .attr("stroke-width", 3)
      .on("click", select_object(class2('Nebula')));




let patterns = contenedor3.selectAll('pattern').data(dataset);
let nodes = contenedor3.selectAll('circle').data(dataset);

// EXIT - Remover los elementos antiguos que ya no existen en los nuevos datos.
patterns.exit().remove();
nodes.exit().remove();

// ENTER - Agregar nuevos elementos.
patterns = patterns
  .enter()
  .append("pattern")
  .attr("width", "1")
  .attr("height", "1")
  .attr("patternUnits", "objectBoundingBox")
  .append("image")
  .merge(patterns) // Combina enter y update
  .attr("id", (d) => "img" + d.Messier)
  .attr("class", (d) => d.Messier + " " + createClass(d.Object_Type))
  .attr("href", (d) => "img/" + d.Messier + ".png")
  .attr("width", (d) => 2 * escalaRadio(d.Dimensions))
  .attr("height", (d) => 2 * escalaRadio(d.Dimensions))
  .transition()
  .duration(TIEMPO_TRANSICION);

nodes = nodes
  .enter()
  .append("circle")
  .attr("cx", WIDTH3 / 2)
  .attr("cy", HEIGHT3 / 2)
  .style("stroke-width", 2)
  .call(
    d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
  )
  .merge(nodes) // Combina enter y update
  .attr("class", (d) => d.Messier + " " + createClass(d.Object_Type))
  .attr("r", (d) => escalaRadio(d.Dimensions))
  .attr("fill", (d) => "url(#img" + d.Messier + ")")
  .attr("stroke", (d) => color[d.Object_Type]);



