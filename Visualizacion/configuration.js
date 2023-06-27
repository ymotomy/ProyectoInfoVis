let dataset = d3.csv('data/dataset3.csv', d => {
    return {
      Messier: d.Messier,
      NGC: d.NGC,
      Object_Type: d.Object_Type === 'Emission Nebula' || d.Object_Type === 'Planetary Nebula' || d.Object_Type === 'Reflection Nebula' || d.Object_Type === 'Supernova remnant' ? 'Nebula' : d.Object_Type,
      Magnitude: parseInt(d.Magnitude),
      Constellation: d.Constellation,
      Distance: parseInt(d.Distance),
      Dimensions: (d.Dimensions/3.14)**(0.5),
      Discoverer: d.Discoverer,
      Year: d.Year,
      Name: d.Name
    };
  }).then(data => {
    createVis1(data);
    createVis2(data);
    createVis3(data);

    d3.select("#filter").on("change", (event) => {
      createVis3(data);
  })
  });