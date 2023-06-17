const WIDTH_BUBBLE = 900,
  HEIGHT_BUBBLE = WIDTH_BUBBLE * 0.7;
const margin_bubble = { top: 80, bottom: 70, left: 100, right: 50 };
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
function addMonths(data, hemisphere) {
  const obj = {};
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
  months.forEach((month) => {
    obj[`${hemisphere} ${month}`] = data[`${hemisphere} ${month}`];
  });
  return obj;
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
