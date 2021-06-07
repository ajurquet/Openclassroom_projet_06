const fetch = require("node-fetch");
const mainEntryUrl = "http://localhost:8000/api/v1/titles/";


fetch(mainEntryUrl + "?sort_by=-imdb_score")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(value) {
        let best_movie_el = document.getElementById("best_movie")
        best_movie_el.innerText = value.results[0].title
        
        // best_movie_el.innerHTML = <ul>
        //     <li>value.results[0].title</li>
        //     <li>value.results[0].title</li>
        //     <li>value.results[0].title</li>
        //     <li>value.results[0].title</li>
        //     <li>value.results[0].title</li>
        //     </ul>;
        // console.log(value.results[0].title);
    })

    .catch(function(err) {
        // Une erreur est survenue
    });