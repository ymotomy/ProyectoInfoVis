const SVG1info = d3.select("#vis-1").append("svg").attr("id", "info-1");
d3.select("#vis-1").append("svg").style("width", "20px");
const SVG1objects = d3.select("#vis-1").append("svg").attr("id", "objects-1");
const SVG2 = d3.select("#vis-2").append("svg");

WIDTH1info = 295;
HEIGHT1info = 400;
WIDTH1objects = 895;
HEIGHT1objects = 400;
WIDTH2 = 600;
HEIGHT2 = 1500;

// Editar tamaños como estime conveniente
SVG1info.attr("width", WIDTH1info).attr("height", HEIGHT1info)
SVG1objects.attr("width", WIDTH1objects).attr("height", HEIGHT1objects)
SVG2.attr("width", WIDTH2).attr("height", HEIGHT2)

const imagenes = SVG1objects.append("g")
  .attr("class", "img")
//   .attr("transform", `translate(${0} ${0})`);
const tierra = SVG1objects.append("g")
.attr("id", "tierra")

const info = SVG1info.append("g").style("visibility", "hidden");
const info11 = info.append("text").attr("class", "txt").attr('y', '20'); //Messier
const info12 = info.append("text").attr("class", "txt").attr('y', '40'); //Common_Name
const info13 = info.append("text").attr("class", "txt").attr('y', '60'); //NGC
const info14 = info.append("text").attr("class", "txt").attr('y', '80'); //Year
const info15 = info.append("text").attr("class", "txt").attr('y', '100'); //OBject_Type
const info16 = info.append("text").attr("class", "txt").attr('y', '120'); //Constellation
const info17 = info.append("text").attr("class", "txt").attr('y', '140'); //Distance
const info18 = info.append("text").attr("class", "txt").attr('y', '160'); //Magnitude
const info19 = info.append("text").attr("class", "txt").attr('y', '180'); //Discoverer

d3.selectAll(".txt").attr('x', '10').style('fill', 'white')

function createVis1(dataset) {
    console.log(dataset)

    const distanciaCuerpos = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => (d.Distance))])
    .range([0, WIDTH1objects]);
    
    tierra
    .append("circle")
    .attr("r", 50)
    .attr("stroke", "white")
    .attr("stroke-width", 3)
    .attr("cx", WIDTH1objects/2)
    .attr("cy", HEIGHT1objects/2);
    tierra
    .append("image")
    .attr("xlink:href", "img/earth.png")
    .attr("x", WIDTH1objects / 2 - 52) // Ajusta la posición horizontal de la imagen
    .attr("y", HEIGHT1objects / 2 - 52) // Ajusta la posición vertical de la imagen
    .attr("width", 104) // Ajusta el ancho de la imagen
    .attr("height", 104); // Ajusta la altura de la imagen

    imagenes
    .selectAll("image")
    .data(dataset)
    .join("image")
    .attr("id", (d) => d.Messier)
    .attr("xlink:href", (d) => 'img/' + d.Messier + '.png') // Reemplaza "imagenURL" por la propiedad de tu objeto que contiene la URL de la imagen
    .attr("x", (d, i) => (WIDTH1objects*i/110) ) // Ajusta la posición horizontal de la imagen
    .attr("y", HEIGHT1objects / 2 - 52) // Ajusta la posición vertical de la imagen
    .attr("width", 90) // Ajusta el ancho de la imagen
    .attr("height", 90) // Ajusta la altura de la imagen
    .on("mouseover", function (event, d) {
      console.log(d.Messier)
      info11.text(`${d.Messier}`); //Messier
      info12.text(`${d.Name}`); //Common_Name
      info13.text(`${d.NGC}`); //NGC
      info14.text(`Year Discovered: ${d.Year}`); //Year
      info15.text(`Object Type: ${d.Object_Type}`); //OBject_Type
      info16.text(`Constellation: ${d.Constellation}`); //Constellation
      info17.text(`Distance: ${d.Distance} ly`); //Distance
      info18.text(`Magnitude: ${d.Magnitude}`); //Magnitude
      info19.text(`Discoverer: ${d.Discoverer}`); //Discoverer
      info.style("visibility", "visible");
    }).on("mouseout", () => {
      info.style("visibility", "hidden");
    });


    const zoom = d3.zoom()
 .scaleExtent([0.5, 2])
 .extent([[0, 0], [WIDTH1objects, HEIGHT1objects]])
 .translateExtent([[0, 0], [WIDTH1objects, HEIGHT1objects]])
 .on("start", () => console.log("empecé"))
 .on("zoom", () => console.log("moviendo"))
    // Conectamos el objeto zoom con nuestro SVG
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