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