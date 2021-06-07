const fetch = require("node-fetch");
const mainEntryUrl = "http://localhost:8000/api/v1/titles/";


fetch(mainEntryUrl + "?sort_by=-imdb_score")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(value) {
        let best_movie_el = document.getElementById("best_movie_alltime")
        best_movie_el.innerHTML = value.results[0].title;
        // console.log(value.results[0].title);
    })

    .catch(function(err) {
        // Une erreur est survenue
    });