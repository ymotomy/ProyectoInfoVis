////////////////////////////
// NO EDITAR ESTE ARCHIVO //
////////////////////////////
function parseo_csv(d) {
    return {
      Messier: d.Messier,
      NGC: d.NGC,
      Object_Type: d.Object_Type,
      Magnitude: parseInt(d.Magnitude),
      Constellation: d.Constellation,
      Distance: parseInt(d.Distance),
      Dimensions: d.Dimensions,
      Discoverer: d.Discoverer,
      Year: parseInt(d.Year),
      Name: d.Name,
    };
  }

  const dataset = d3.csv('dataset.csv', (d) => {
    return {
      Messier: d.Messier,
      NGC: d.NGC,
      Object_Type: d.Object_Type,
      Magnitude: parseInt(d.Magnitude),
      Constellation: d.Constellation,
      Distance: parseInt(d.Distance),
      Dimensions: d.Dimensions,
      Discoverer: d.Discoverer,
      Year: parseInt(d.Year),
      Name: d.Name,
    };
  });

// Cada vez que se oprima el botón se genera datos aletorios
// por catgoría. Luego cargamos nuevamente la visualización.
d3.select("#generate-data")
    .on("click", () => {
        // Dataset ficticio para evaluar transiciones en tamaño
        createClover(generateDataset())
    })

/* Cada vez que se seleccione un género, esta función será llamada
para actualizar la segunda visualización */
let DATASET_MOVIES = [];
function preprocessingMoviesDataset(genre, filter_dataset) {
    // Si la lista de datos está vacía, descargo el dataset
    // y lo guardo en mi variable externa "DATASET_MOVIES".
    if (DATASET_MOVIES.length == 0) {
        d3.json(MoviesURL).then(dataset => {
            // Como no pongo let antes, sobrescribo la variable anterior.
            DATASET_MOVIES = dataset;
            // Llamo de nuevo a preprocessingMoviesDataset 
            // para que ahora si se ejecute cuando DATASET_MOVIES tenga datos
            preprocessingMoviesDataset(genre, filter_dataset)
        })
        // Hacemos return para que la función no continue su ejecución
        return 0;
    }

    let data = JSON.parse(JSON.stringify(DATASET_MOVIES));

    // Cada vez que se oprime filtrar, se llama nuevamente
    // a preprocessingMoviesDataset con filtro=true
    d3.select("#filter-rating").on("click", (event) => {
        preprocessingMoviesDataset(genre, true);
    })

    // Cada vez que se oprime Restaurar filtro, se llama nuevamente
    // a preprocessingMoviesDataset con filtro=false
    d3.select("#filter-reset").on("click", (event) => {
        preprocessingMoviesDataset(genre, false);
    })

    // Cada vez que cambia el selector de orden, se llama nuevamente
    // a createDVDs para que actualice la visualización
    d3.select("#order-by").on("change", (event) => {
        createVis2(data, genre, filter_dataset);
    })

    // Llamamos a la segunda función encargada de crear los datos
    createVis2(data, genre, filter_dataset);
}

// Cargamos primera ver la visualización con datos fijos
createVis1(dataset)

d3.select("#showCat1").on("click", () => preprocessingMoviesDataset("Comedy", false));
d3.select("#showCat2").on("click", () => preprocessingMoviesDataset("Romance", false));
d3.select("#showCat3").on("click", () => preprocessingMoviesDataset("Action", false));

