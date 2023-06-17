// CONSTANTES
const WIDTH1info = 295,
      HEIGHT1info = 400,
      WIDTH1objects = 895,
      HEIGHT1objects = 400,
      WIDTH2 = 1100,
      HEIGHT2 = 650;

const MARGIN = {
	top: 70,
	bottom: 60,
	left: 40,
	right: 60
};

let zoomActual = d3.zoomIdentity;


// VISUALIZACION 1 ----------------------------------------------------------------------------------------------------------------------
const SVG1info = d3.select("#vis-1").append("svg").attr("id", "info-1");
d3.select("#vis-1").append("svg").style("width", "20px");
const SVG1objects = d3.select("#vis-1").append("svg").attr("id", "objects-1");

SVG1info.attr("width", WIDTH1info).attr("height", HEIGHT1info)
SVG1objects.attr("width", WIDTH1objects).attr("height", HEIGHT1objects)

const contenedorImagenes = SVG1objects
      .append("g")
      .attr("class", "img")
      // .attr("transform", `translate(${MARGIN.left} ${MARGIN.top})`);
const tierra = SVG1objects
      .append("g")
      .attr("id", "tierra")

const info = SVG1info.append("g").style("visibility", "hidden");
const info11 = info.append("text").attr("class", "txt").attr('y', '60'); //Common_Name
const info12 = info.append("text").attr("class", "txt").attr('y', '90'); //Messier
const info13 = info.append("text").attr("class", "txt").attr('y', '120'); //NGC
const info14 = info.append("text").attr("class", "txt").attr('y', '150'); //Year
const info15 = info.append("text").attr("class", "txt").attr('y', '180'); //OBject_Type
const info16 = info.append("text").attr("class", "txt").attr('y', '210'); //Constellation
const info17 = info.append("text").attr("class", "txt").attr('y', '240'); //Distance
const info18 = info.append("text").attr("class", "txt").attr('y', '270'); //Magnitude
const info19 = info.append("text").attr("class", "txt").attr('y', '300'); //Discoverer

d3.selectAll(".txt").attr('x', '10').style('fill', 'white')

function createVis1(dataset) {
    console.log(dataset)

    const escalaDistance = d3
    .scaleLog()
		.domain([d3.min(dataset, (d) => (d.Distance)), d3.max(dataset, (d) => (d.Distance))])
		.range([25, WIDTH1objects - MARGIN.left - MARGIN.right])

    tierra
    .append("circle")
    .attr("r", 50)
    .attr("stroke", "white")
    .attr("stroke-width", 3)
    .attr("cx", 52)
    .attr("cy", HEIGHT1objects/2);
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
        .attr("xlink:href", (d) => 'img/' + d.Messier + '.png') // Reemplaza "imagenURL" por la propiedad de tu objeto que contiene la URL de la imagen
        .attr("x", (d, i) => (escalaDistance(d.Distance)) ) // Ajusta la posición horizontal de la imagen
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
          info.style("visibility", "visible");
        }).on("mouseout", () => {
          info.style("visibility", "hidden");
        });
			},
			(update) => {
				update
        .attr("x", (d, i) => (escalaDistance(d.Distance)) ) // Ajusta la posición horizontal de la imagen
			},
			(exit) => exit.remove()
		);



    const manejadorZoom = (evento) => {
      const transformacion = evento.transform;
      // Actualizamos el rango de la escala considerando la transformación realizada.
      //escalaDistance.range([transformacion.applyX(0), transformacion.applyX(WIDTH1objects - MARGIN.right - MARGIN.left)])
      // Actualizamos posición en X y ancho de las barras considerando la nueva escala.
      contenedorImagenes
      .attr("transform", transformacion)
        //.selectAll("image")
        //.attr("x", (d) => escalaDistance(d.Distance) + escalaDistance.bandwidth() / 4)
        //.attr("width", escalaDistance.bandwidth() / 2)

      // Actualizamos el ejeX
      //contenedorImagenes.call(ejeTiempo);
      // Guardamos dicha transformación en nuestra variable global.
      //zoomActual = transformacion;
    };
    
    // Inicializar Zoom
    const zoom = d3.zoom()
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
	  SVG1objects.call(zoom)
}

// VISUALIZACION 2 ----------------------------------------------------------------------------------------------------------------------
const SVG2 = d3.select("#vis-2").append("svg").attr("id", "gl")

SVG2.attr("width", WIDTH2).attr("height", HEIGHT2)

SVG2
  .append("text")
  .attr("x", 20)
  .attr("y", 40)
  .text("Año de Descubrimiento")
  .style("font-family", "Arial");
SVG2
  .append("text")
  .attr("x", 430)
  .attr("y", 580)
  .text("Cantidad de Objetos")
  .style("font-family", "Arial");


const contenedor2 = SVG2
  .append("g")
  .attr("transform", `translate(${MARGIN.left} ${MARGIN.top})`);

//grafi
function createVis2(dataset) {
  //EJE Y------------------------------------------------------------------------------------------
  const escalaY = d3
    .scaleLinear()
    .domain([0, 40])
    .range([HEIGHT2 - 2*MARGIN.bottom, 0]);
  const ejeY = d3.axisLeft(escalaY);
  SVG2
    .append("g")
    .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`)
    .call(ejeY)
    .selectAll("line")
    .attr("x1", WIDTH2-(2*MARGIN.left))
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.5);

  // EJE X------------------------------------------------------------------------------------------
  const escalaX = d3
    .scaleLinear()
    .domain([1610,1750])
    .range([0, WIDTH2 - 2*MARGIN.left]);
  const ejeX = d3.axisBottom(escalaX);
  SVG2
    .append("g")
    .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top + HEIGHT2 - 2*MARGIN.bottom})`)
    .call(ejeX)
    .selectAll("line")
    .attr("y1", -(HEIGHT2-(2*MARGIN.bottom)))
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.5);
  contenedor2.raise()

  //AGREGAMOS LOS CIRCULOS-------------------------------------------------------------------------
  var color = {
    "Galaxy": '#f72585',
    "Globular Cluster":'#0077b6',
    "Open Cluster":'#d00000',
    "Nebula": '#00fff5',
    "Double star": '#7b2cbf'
  };

  // Creamos una línea que más tarde cargaremos en el path
  var valueline = d3.line()
  .escalaX(function(d) { return escalaX(d.Year); })
  .escalaY(function(d) { return escalaY(5); });

  dataset.forEach((d) =>{
    d.Year = parseTime(d.Year);
    d.close = +d.close;
});

x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.close; })]);

svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline);

}

// VISUALIZACION 3 ----------------------------------------------------------------------------------------------------------------------

function createVis3(dataset) {
}