const SVG1info = d3.select("#vis-1").append("svg").attr("id", "info-1");
d3.select("#vis-1").append("svg").style("width", "20px");
const SVG1objects = d3.select("#vis-1").append("svg").attr("id", "objects-1");
const SVG2 = d3.select("#vis-2").append("svg");

const WIDTH1info = 295,
      HEIGHT1info = 400,
      WIDTH1objects = 895,
      HEIGHT1objects = 400,
      WIDTH2 = 600,
      HEIGHT2 = 1500;

const margins = {
	top: 20,
	bottom: 20,
	left: 40,
	right: 40
};

let zoomActual = d3.zoomIdentity;

// Editar tamaños como estime conveniente
SVG1info.attr("width", WIDTH1info).attr("height", HEIGHT1info)
SVG1objects.attr("width", WIDTH1objects).attr("height", HEIGHT1objects)
SVG2.attr("width", WIDTH2).attr("height", HEIGHT2)

const contenedorImagenes = SVG1objects
      .append("g")
      .attr("class", "img")
      // .attr("transform", `translate(${margins.left} ${margins.top})`);
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
		.range([25, WIDTH1objects - margins.left - margins.right])

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
        .attr("y", HEIGHT1objects / 2 - 45) // Ajusta la posición vertical de la imagen
        .attr("width", 90) // Ajusta el ancho de la imagen
        .attr("height", 90) // Ajusta la altura de la imagen
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
      escalaDistance.range([transformacion.applyX(0), transformacion.applyX(WIDTH1objects - margins.right - margins.left)])
      // Actualizamos posición en X y ancho de las barras considerando la nueva escala.
      contenedorImagenes
        .selectAll("image")
        .attr("x", (d) => escalaDistance(d.Distance) + escalaDistance.bandwidth() / 4)
        .attr("width", escalaDistance.bandwidth() / 2)

      // Actualizamos el ejeX
      contenedorImagenes.call(ejeTiempo);
      // Guardamos dicha transformación en nuestra variable global.
      zoomActual = transformacion;
    };
    
    // Inicializar Zoom
    const zoom = d3.zoom()
		.extent([[0, 0], [WIDTH1objects, HEIGHT1objects]])
		.translateExtent([[0, 0], [WIDTH1objects, HEIGHT1objects]])
		.scaleExtent([1, 8])
		.on("zoom", manejadorZoom)
    .on("start", () => console.log("empecé"))
    .on("zoom", () => console.log("moviendo"));

    // Seteamos que el valor que el zoom tiene actualmente
	  // es el zoom que se realizó la vez pasada
	  SVG1objects.call(zoom.transform, zoomActual)
	  // Conectar el zoom al svg
	  SVG1objects.call(zoom)
}


function createVis2(dataset, genre, filter_dataset) {
    //  "ORDER_BY" indica bajo qué atributo ordenar
    let ORDER_BY = document.getElementById("order-by").selectedOptions[0].value;

    // Actualizo nombre de un H4 para saber el género seleccionado
    d3.selectAll("#selected").text(`Genre: ${genre} - Filter: ${filter_dataset}`)

    console.log(genre)
    console.log(filter_dataset)
    console.log(ORDER_BY)
    console.log(dataset)
}