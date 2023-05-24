const SVG1 = d3.select("#vis-1").append("svg");
const SVG2 = d3.select("#vis-2").append("svg");

// Editar tamaños como estime conveniente
SVG1.attr("width", 690).attr("height", 300)
SVG2.attr("width", 600).attr("height", 1500)

/* Cada vez que oprima el botón de "Generar datos aleatorios"
esta función será llamada */
function createClover(dataset) {
    // Completar esta función para crear la primera visualización
    console.log(dataset)

    // Cada vez que se haga click en un trebol. Debes llamar a
    // preprocesarMoviesDataset() donde genero será el género
    // del trebol seleccionado y filtrar será "false".
    // Esta función se encargará de llamar a createDVDs
}


function createDVDs(dataset, genre, filter_dataset) {
    //  "ORDER_BY" indica bajo qué atributo ordenar
    let ORDER_BY = document.getElementById("order-by").selectedOptions[0].value;

    // Actualizo nombre de un H4 para saber el género seleccionado
    d3.selectAll("#selected").text(`Genre: ${genre} - Filter: ${filter_dataset}`)

    console.log(genre)
    console.log(filter_dataset)
    console.log(ORDER_BY)
    console.log(dataset)
}