// CONSTANTES
const WIDTH1info = 295,
      HEIGHT1info = 400,
      WIDTH1objects = 895,
      HEIGHT1objects = 400,
      WIDTH2 = 1100,
      HEIGHT2 = 650;
      WIDTH3 = 1100,
      HEIGHT3 = 650;


const MARGIN = {
	top: 70,
	bottom: 70,
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
  .text("Cantidad de Objetos")
  .style("font-family", "Jost")
  .attr("fill", "white");
  SVG2
  .append("text")
  .attr("x", WIDTH2 - 200)
  .attr("y", 620)
  .text("Año de Descubrimiento")
  .style("font-family", "Jost")
  .attr("fill", "white");


const contenedor2 = SVG2
  .append("g")
  .attr("transform", `translate(${MARGIN.left} ${MARGIN.top})`);

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
  .escalaX((d) => { return escalaX(d.Year)})
  .escalaY((d) => { return escalaY(5)});

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
const SVG3 = d3.select('#vis-3').append('svg').attr('id', 'cp')

SVG3
  .attr("width", WIDTH3)
  .attr("height", HEIGHT3)



function createVis3(dataset) {
  const WIDTH_BUBBLE = 900,
        HEIGHT_BUBBLE = WIDTH_BUBBLE * 0.7;

const margin_bubble = {top: 80, 
                      bottom: 70,
                      left: 100,
                      right: 50};

const width_bubble = WIDTH_BUBBLE - margin_bubble.left - margin_bubble.right,
  height_bubble = HEIGHT_BUBBLE - margin_bubble.top - margin_bubble.bottom;

const svg_bubble = d3
  .select("#bubble-container")
  .style("border", "5px solid var(--acnh-brown)")
  .style("border-radius", "5px")
  .append("svg")
  .attr("width", WIDTH_BUBBLE)
  .attr("height", HEIGHT_BUBBLE);

const defs = svg_bubble.append("defs");

const g_bubble = svg_bubble
  .append("g")
  .attr("transform", `translate(${margin_bubble.left}, ${margin_bubble.top})`);

const title_bubble = svg_bubble
  .append("text")
  .attr(
    "transform",
    `translate(${margin_bubble.left + width_bubble / 2}, ${
      margin_bubble.top / 2
    })`
  )
  .attr("dy", "0.5em")
  .style("text-anchor", "middle");
const fillColour = d3
  .scaleOrdinal()
  .domain(["Fish", "Insect", "Sea Creature"])
  .range(colors);
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const selector = d3.select("#months");
selector
  .selectAll(".month-option")
  .data(months)
  .enter()
  .append("option")
  .classed("month-option", true)
  .attr("value", (d) => d)
  .text((d) => d3.timeFormat("%B")(d3.timeParse("%b")(d)));
function bubbleChart() {
  function createNodes(key, data) {
    const filteredData = data.filter(function (d) {
      return d[`${key}`] != "NA";
    });
    const maxSize = d3.max(filteredData, (d) => d.price);
    const radiusScale = d3.scaleSqrt().domain([0, maxSize]).range([5, 55]);
    const myNodes = filteredData.map((d) => ({
      ...d,
      radius: radiusScale(+d.price),
      x: Math.random() * width_bubble,
      y: Math.random() * height_bubble,
    }));
    return myNodes;
  }
  let chart = function chart(hemisphere, month, rawData) {
    const centre = { x: width / 2 + 100, y: height / 2 + 100 };
    const forceStrength = 0.03;
    function charge(d) {
      return Math.pow(d.radius, 2.0) * 0.01;
    }
    const simulation = d3
      .forceSimulation()
      .force("charge", d3.forceManyBody().strength(charge))
      .force("center", d3.forceCenter(centre.x, centre.y))
      .force("x", d3.forceX().strength(forceStrength).x(centre.x))
      .force("y", d3.forceY().strength(forceStrength).y(centre.y))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.radius + 5)
      );
    const key = hemisphere + " " + month;
    nodes = createNodes(key, rawData);
    d3.selectAll(".critter-info").text("");
    d3.select(".selected").classed("selected", false);
    defs
      .selectAll(".critter-pattern")
      .data(nodes, (d) => d.id)
      .enter()
      .append("pattern")
      .attr("class", "critter-pattern")
      .attr("id", (d) => d.id)
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", (d) => d.image_url)
      .exit()
      .remove();
    const elements = svg_bubble.selectAll(".bubble").data(nodes, (d) => d.id);
    elements.exit().remove();
    old_bubbles = elements.select("circle");
    const data_enter = elements.enter().append("g").classed("bubble", true);
    bubbles = data_enter
      .append("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => "url(#" + d.id + ")")
      .attr("stroke", (d) => fillColour(d.type))
      .attr("stroke-width", "6px")
      .attr("id", (d) => "bubble-" + d.id)
      .on("mouseover", (event) => mouseOver(event))
      .on("mouseleave", (event) => mouseLeave(event))
      .on("click", (event, d) => bubbleClick(event, d));
    function mouseOver(event) {
      const bubble = event.target.id;
      d3.select("#" + bubble).attr("stroke", "red");
    }
    function mouseLeave(event) {
      const bubble = event.target.id;
      d3.select("#" + bubble).attr("stroke", (d) => fillColour(d.type));
    }
    function bubbleClick(event, d) {
      const bubble = event.target.id;
      d3.select("#critter-name").text(`${d.name}`);
      d3.select("#critter-type").text(`Type: ${d.type}`);
      d3.select("#critter-price").text(`Price: $${d.price}`);
      d3.select("#critter-time-availability").text("Time: " + d[`${key}`]);
      d3.select(".selected").classed("selected", false);
      d3.select("#" + bubble).classed("selected", true);
      const keys = [
        "location",
        "weather",
        "shadow",
        "speed",
        "catch_difficulty",
        "vision",
        "catches_to_unlock",
        "spawn_rate",
      ];
      keys.forEach((key) => {
        const parsed_key = (
          key.charAt(0).toUpperCase() + key.slice(1)
        ).replaceAll("_", " ");
        if (d[`${key}`] !== undefined) {
          d3.select(`#critter-${key}`).text(parsed_key + ": " + d[`${key}`]);
        } else {
          d3.select(`#critter-${key}`).text(``).attr("display", "none");
        }
      });
    }
    simulation.nodes(nodes).on("tick", ticked).restart();
    const manejadorZoom = (evento) => {
      const transformacion = evento.transform;
      bubbles.attr("transform", transformacion);
      old_bubbles.attr("transform", transformacion);
    };
    const zoom = d3
      .zoom()
      .extent([
        [0, 0],
        [width, height],
      ])
      .translateExtent([
        [-100, -300],
        [width + 100, height + 300],
      ])
      .scaleExtent([1, 4])
      .on("zoom", manejadorZoom);
    svg_bubble.call(zoom);
  };
  function ticked() {
    bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    old_bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  }
  return chart;
}
let myBubbleChart = bubbleChart();
function capitalizeName(name) {
  const arr = name.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
}

async function initialLoad() {
  const fish = await d3.csv("data/fish.csv", function (d) {
    const data = {
      id: +d._id + 100,
      type: "Fish",
      name: capitalizeName(d.Name),
      image_url: d["Icon Image"],
      price: +d.Sell,
      location: d["Where/How"],
      shadow: d.Shadow,
      catch_difficulty: d["Catch Difficulty"],
      vision: d.Vision,
      catches_to_unlock: +d["Total Catches to Unlock"],
      spawn_rate: d["Spawn Rates"],
    };
    const n_hemisphere = addMonths(d, "NH"),
      s_hemisphere = addMonths(d, "SH");
    return { ...data, ...n_hemisphere, ...s_hemisphere };
  });
  const insects = await d3.csv("data/insects.csv", function (d) {
    const data = {
      id: +d._id + 200,
      type: "Insect",
      name: capitalizeName(d.Name),
      image_url: d["Icon Image"],
      price: +d.Sell,
      location: d["Where/How"],
      weather: d.Weather,
      catches_to_unlock: +d["Total Catches to Unlock"],
      spawn_rate: d["Spawn Rates"],
    };
    const n_hemisphere = addMonths(d, "NH"),
      s_hemisphere = addMonths(d, "SH");
    return { ...data, ...n_hemisphere, ...s_hemisphere };
  });
  const sea_creatures = await d3.csv("data/sea_creatures.csv", function (d) {
    const data = {
      id: +d._id + 300,
      type: "Sea Creature",
      name: capitalizeName(d.Name),
      image_url: d["Icon Image"],
      price: +d.Sell,
      shadow: d.Shadow,
      speed: d["Movement Speed"],
      catches_to_unlock: +d["Total Catches to Unlock"],
      spawn_rate: d["Spawn Rates"],
    };
    const n_hemisphere = addMonths(d, "NH"),
      s_hemisphere = addMonths(d, "SH");
    return { ...data, ...n_hemisphere, ...s_hemisphere };
  });
  const data = [...fish, ...insects, ...sea_creatures];
  myBubbleChart("NH", "Jan", data);
  const hemisphereSelector = d3.select("#hemispheres-2").on("change", onChange);
  const monthSelector = d3.select("#months").on("change", onChange);
  function onChange() {
    hemisphere = d3.select("#hemispheres-2").property("value");
    month = d3.select("#months").property("value");
    myBubbleChart(hemisphere, month, data);
  }
}
initialLoad();


}