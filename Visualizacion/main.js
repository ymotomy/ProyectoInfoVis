// CONSTANTES
const MARGIN = {
  top: 70,
  bottom: 70,
  left: 40,
  right: 60,
};
// VISUALIZACION 1 ----------------------------------------------------------------------------------------------------------------------
let zoomActual = d3.zoomIdentity;

const WIDTH1info = 295,
  HEIGHT1info = 400,
  WIDTH1objects = 895,
  HEIGHT1objects = 400;

const SVG1info = d3.select("#vis-1").append("svg").attr("id", "info-1");
d3.select("#vis-1").append("svg").style("width", "20px");
const SVG1objects = d3.select("#vis-1").append("svg").attr("id", "objects-1");
SVG1info.attr("width", WIDTH1info).attr("height", HEIGHT1info);
SVG1objects.attr("width", WIDTH1objects).attr("height", HEIGHT1objects);

const contenedorImagenes = SVG1objects.append("g").attr("class", "img");
// .attr("transform", `translate(${MARGIN.left} ${MARGIN.top})`);
const tierra = SVG1objects.append("g").attr("id", "tierra");

const info1 = SVG1info.append("g").style("visibility", "hidden");
const info11 = info1
  .append("text")
  .attr("class", "txt")
  .attr("x", "10")
  .attr("y", "60"); //Common_Name
const info12 = info1
  .append("text")
  .attr("class", "txt")
  .attr("x", "10")
  .attr("y", "90"); //Messier
const info13 = info1
  .append("text")
  .attr("class", "txt")
  .attr("x", "10")
  .attr("y", "120"); //NGC
const info14 = info1
  .append("text")
  .attr("class", "txt")
  .attr("x", "10")
  .attr("y", "150"); //Year
const info15 = info1
  .append("text")
  .attr("class", "txt")
  .attr("x", "10")
  .attr("y", "180"); //OBject_Type
const info16 = info1
  .append("text")
  .attr("class", "txt")
  .attr("x", "10")
  .attr("y", "210"); //Constellation
const info17 = info1
  .append("text")
  .attr("class", "txt")
  .attr("x", "10")
  .attr("y", "240"); //Distance
const info18 = info1
  .append("text")
  .attr("class", "txt")
  .attr("x", "10")
  .attr("y", "270"); //Magnitude
const info19 = info1
  .append("text")
  .attr("class", "txt")
  .attr("x", "10")
  .attr("y", "300"); //Discoverer

function createVis1(dataset) {
  const escalaDistance = d3
    .scaleLog()
    .domain([
      d3.min(dataset, (d) => d.Distance),
      d3.max(dataset, (d) => d.Distance),
    ])
    .range([25, WIDTH1objects - MARGIN.left - MARGIN.right]);

  tierra
    .append("circle")
    .attr("r", 50)
    .attr("stroke", "white")
    .attr("stroke-width", 3)
    .attr("cx", 52)
    .attr("cy", HEIGHT1objects / 2);
  tierra
    .append("image")
    .attr("xlink:href", "img/earth.png")
    .attr("x", 0) // Ajusta la posición horizontal de la imagen
    .attr("y", HEIGHT1objects / 2 - 52) // Ajusta la posición vertical de la imagen
    .attr("width", 104) // Ajusta el ancho de la imagen
    .attr("height", 104); // Ajusta la altura de la imagen

  contenedorImagenes
    .selectAll("image")
    .data(dataset)
    .join(
      (enter) => {
        enter
          .append("image")
          .attr("id", (d) => d.Messier)
          .attr("xlink:href", (d) => "img/" + d.Messier + ".png") // Reemplaza "imagenURL" por la propiedad de tu objeto que contiene la URL de la imagen
          .attr("x", (d, i) => escalaDistance(d.Distance)) // Ajusta la posición horizontal de la imagen
          .attr("y", HEIGHT1objects / 2 - 44) // Ajusta la posición vertical de la imagen
          .attr("width", 88) // Ajusta el ancho de la imagen
          .attr("height", 88) // Ajusta la altura de la imagen
          .on("mouseover", function (event, d) {
            info11.text(`${d.Name}`); //Common_Name
            info12.text(`${d.Messier}`); //Messier
            info13.text(`${d.NGC}`); //NGC
            info14.text(`Descubierto en: ${d.Year}`); //Year
            info15.text(`Tipo de Objeto: ${d.Object_Type}`); //OBject_Type
            info16.text(`Constelación: ${d.Constellation}`); //Constellation
            info17.text(`Distancia: ${d.Distance} al`); //Distance
            info18.text(`Magnitud: ${d.Magnitude}`); //Magnitude
            info19.text(`Descubierto por: ${d.Discoverer}`); //Discoverer
            info1.style("visibility", "visible");
          })
          .on("mouseout", () => {
            info1.style("visibility", "hidden");
          });
      },
      (update) => {
        update.attr("x", (d, i) => escalaDistance(d.Distance)); // Ajusta la posición horizontal de la imagen
      },
      (exit) => exit.remove()
    );

  const manejadorZoom = (evento) => {
    const transformacion = evento.transform;
    // Actualizamos el rango de la escala considerando la transformación realizada.
    //escalaDistance.range([transformacion.applyX(0), transformacion.applyX(WIDTH1objects - MARGIN.right - MARGIN.left)])
    // Actualizamos posición en X y ancho de las barras considerando la nueva escala.
    contenedorImagenes.attr("transform", transformacion);
    //.selectAll("image")
    //.attr("x", (d) => escalaDistance(d.Distance) + escalaDistance.bandwidth() / 4)
    //.attr("width", escalaDistance.bandwidth() / 2)

    // Actualizamos el ejeX
    //contenedorImagenes.call(ejeTiempo);
    // Guardamos dicha transformación en nuestra variable global.
    //zoomActual = transformacion;
  };

  // Inicializar Zoom
  const zoom = d3
    .zoom()
    //.extent([[0, 0], [WIDTH1objects, HEIGHT1objects]])
    //.translateExtent([[0, 0], [WIDTH1objects, HEIGHT1objects]])
    .scaleExtent([1, 8])
    .on("zoom", manejadorZoom)
    .on("start", () => console.log("empecé"))
    .on("end", () => console.log("Terminé"));

  // Seteamos que el valor que el zoom tiene actualmente
  // es el zoom que se realizó la vez pasada
  //SVG1objects.call(zoom.transform, zoomActual)
  // Conectar el zoom al svg
  SVG1objects.call(zoom);
}

// VISUALIZACION 2 ----------------------------------------------------------------------------------------------------------------------
const WIDTH2 = 800,
  HEIGHT2 = 650,
  WIDTH2info = 295,
  HEIGHT2info = 225;

const SVG2 = d3.select("#vis-2").append("svg").attr("id", "gl");
SVG2.attr("width", WIDTH2).attr("height", HEIGHT2);
d3.select("#vis-2").append("svg").style("width", "20px");
const SVG2info = d3.select("#vis-2").append("svg").attr("id", "info-2");
SVG2info.attr("width", WIDTH2info).attr("height", HEIGHT2info);

var color = {
  Galaxy: "#f72585",
  "Globular Cluster": "#00fff5",
  "Open Cluster": "#0077b6",
  Nebula: "#d00000",
  "Double star": "#66FF00",
};

const info2 = SVG2info.append("g");
const info21 = info2
  .append("text")
  .attr("class", "txt")
  .attr("x", "35")
  .attr("y", "60")
  .text("Galaxy");
const info22 = info2
  .append("text")
  .attr("class", "txt")
  .attr("x", "35")
  .attr("y", "90")
  .text("Globular Cluster");
const info23 = info2
  .append("text")
  .attr("class", "txt")
  .attr("x", "35")
  .attr("y", "120")
  .text("Open Cluster");
const info24 = info2
  .append("text")
  .attr("class", "txt")
  .attr("x", "35")
  .attr("y", "150")
  .text("Nebula");
const info25 = info2
  .append("text")
  .attr("class", "txt")
  .attr("x", "35")
  .attr("y", "180")
  .text("Double Star");
const circle21 = info2
  .append("circle")
  .attr("class", "circle")
  .attr("fill", color[Object.keys(color)[0]])
  .attr("cx", "20")
  .attr("cy", "54")
  .attr("r", "7");
const circle22 = info2
  .append("circle")
  .attr("class", "circle")
  .attr("fill", color[Object.keys(color)[1]])
  .attr("cx", "20")
  .attr("cy", "84")
  .attr("r", "7");
const circle23 = info2
  .append("circle")
  .attr("class", "circle")
  .attr("fill", color[Object.keys(color)[2]])
  .attr("cx", "20")
  .attr("cy", "114")
  .attr("r", "7");
const circle24 = info2
  .append("circle")
  .attr("class", "circle")
  .attr("fill", color[Object.keys(color)[3]])
  .attr("cx", "20")
  .attr("cy", "144")
  .attr("r", "7");
const circle25 = info2
  .append("circle")
  .attr("class", "circle")
  .attr("fill", color[Object.keys(color)[4]])
  .attr("cx", "20")
  .attr("cy", "174")
  .attr("r", "7");

SVG2.append("text")
  .attr("x", 20)
  .attr("y", 40)
  .text("Cantidad de Objetos")
  .style("font-family", "Jost")
  .attr("fill", "white");
SVG2.append("text")
  .attr("x", WIDTH2 - 200)
  .attr("y", 620)
  .text("Año de Descubrimiento")
  .style("font-family", "Jost")
  .attr("fill", "white");

const contenedor2 = SVG2.append("g").attr(
  "transform",
  `translate(${MARGIN.left} ${MARGIN.top})`
);
function ParseoYear(year) {
  if (isNaN(year)) {
    return 1610;
  } else {
    return parseInt(year);
  }
}

function createVis2(dataset) {
  dataset = dataset.sort((a, b) => {
    return ParseoYear(a.Year) - ParseoYear(b.Year);
  });

  function frecuenciaObjects(object) {
    objects[object] += 1;
    return objects[object];
  }

  //EJE Y------------------------------------------------------------------------------------------
  const escalaY = d3
    .scaleLinear()
    .domain([0, 40])
    .range([HEIGHT2 - 2 * MARGIN.bottom, 0]);
  const ejeY = d3.axisLeft(escalaY);
  SVG2.append("g")
    .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`)
    .call(ejeY)
    .selectAll("line")
    .attr("x1", WIDTH2 - 2 * MARGIN.left)
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.5);

  // EJE X------------------------------------------------------------------------------------------
  const escalaX = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, (d) => ParseoYear(d.Year)),
      d3.max(dataset, (d) => ParseoYear(d.Year)),
    ])
    .range([0, WIDTH2 - 2 * MARGIN.left]);
  const ejeX = d3.axisBottom(escalaX);
  SVG2.append("g")
    .attr(
      "transform",
      `translate(${MARGIN.left}, ${MARGIN.top + HEIGHT2 - 2 * MARGIN.bottom})`
    )
    .call(ejeX)
    .selectAll("line")
    .attr("y1", -(HEIGHT2 - 2 * MARGIN.bottom))
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.5);

  contenedor2.raise();
  //AGREGAMOS LOS CIRCULOS-------------------------------------------------------------------------
  var objects = {
    Galaxy: 0,
    "Globular Cluster": 0,
    "Open Cluster": 0,
    Nebula: 0,
    "Double star": 0,
  };
  contenedor2
    .selectAll("rect")
    .data(dataset)
    .join("circle")
    .attr("r", 3)
    .attr("fill", (d) => color[d.Object_Type])
    .attr("cx", (d) => escalaX(ParseoYear(d.Year)))
    .attr("cy", (d) => escalaY(frecuenciaObjects(d.Object_Type)))
    .append("title")
    .text((d) => d.Messier);
  //AGREGAMOS LAS LINEAS---------------------------------------------------------------------------
  var objects = {
    Galaxy: 0,
    "Globular Cluster": 0,
    "Open Cluster": 0,
    Nebula: 0,
    "Double star": 0,
  };
  var line = d3
    .line()
    .x((d) => escalaX(ParseoYear(d.Year)))
    .y((d) => escalaY(frecuenciaObjects(d.Object_Type)))
    .curve(d3.curveLinear);

  var keys = Object.keys(objects);
  for (var i = 0; i < keys.length; i++) {
    var data_filter = dataset.filter((d) => d.Object_Type == keys[i]);
    contenedor2
      .append("path")
      .data([data_filter])
      .attr("d", line)
      .attr("class", "line")
      .attr("stroke", color[keys[i]])
      .attr("fill", "transparent")
      .attr("stroke-width", 3);
  }
}

// VISUALIZACION 3 ----------------------------------------------------------------------------------------------------------------------
const WIDTH3 = 1200,
      HEIGHT3 = 800;

const SVG3 = d3.select("#vis-3").append("svg").attr("id", "cp");

SVG3.attr("width", WIDTH3).attr("height", HEIGHT3);

function createVis3(dataset) {

const escalaRadio = d3.scaleLog()
                      .domain([d3.min(dataset, (d) => d.Dimensions), d3.max(dataset, (d) => (d.Dimensions))])
                      .range([2, 25]);

  var root = d3.hierarchy(dataset)
  // .sum(function(d) { return d.value; })
  // .sort(function(a, b) { return b.value - a.value; });
  var pack = d3.pack()
               .size([WIDTH3, HEIGHT3])
               .padding(3);
  pack(root);

  var node = SVG3.append("g")
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
    .attr("r", (d) => escalaRadio(d.Dimensions))
    .attr("cx", WIDTH3 / 2)
    .attr("cy", HEIGHT3 / 2)
    .style("fill", (d) => color[d.Object_Type])
    .style("fill-opacity", 0.3)
    .attr("stroke", "black")
    .style("stroke-width", 4)
    .call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));

  // Features of the forces applied to the nodes:
var simulation = d3.forceSimulation()
.force("center", d3.forceCenter().x(WIDTH3 / 2).y(HEIGHT3 / 2)) // Attraction to the center of the svg area
.force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
.force("collide", d3.forceCollide().strength(.1).radius(30).iterations(1)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
.nodes(dataset)
.on("tick", function(d){
  node
      .attr("cx", function(d){ return d.x; })
      .attr("cy", function(d){ return d.y; })
});

// What happens when a circle is dragged?
function dragstarted(d) {
if (!d3.event.active) simulation.alphaTarget(.03).restart();
d.fx = d.x;
d.fy = d.y;
}
function dragged(d) {
d.fx = d3.event.x;
d.fy = d3.event.y;
}
function dragended(d) {
if (!d3.event.active) simulation.alphaTarget(.03);
d.fx = null;
d.fy = null;
}
  
  // node.append("circle")
  // .attr("r", (d) => escalaRadio(d.Dimensions))

  // node.append("text")
  // .attr("dy", ".35em")
  // .text(function(d) { return d.Messier; });


  // SVG3
  // .selectAll("circle")
  // .data(dataset)
  // .join("circle")
  // .attr("r", (d) => escalaRadio(d.Dimensions))
  // .attr("fill", (d) => color[d.Object_Type])
  // .attr("cx", 100)
  // .attr("cy", 100)
}

d3.selectAll(".txt").style("fill", "white");
