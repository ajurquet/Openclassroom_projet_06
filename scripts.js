// const fetch = require("node-fetch");
const mainEntryUrl = "http://localhost:8000/api/v1/titles/";
let movie_image_url = "";
let movie_datas = [];


fetch(mainEntryUrl + "?sort_by=-imdb_score")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(data) {
        movie_image_url = data.results[0].image_url;
        movie_datas.push(data.results[0].title, data.results[0].genres,data.results[0].year,
             data.results[0].imdb_score, data.results[0].directors, data.results[0].actors);

        let best_movie_image_element = document.getElementById("bestMovie__image");
        best_movie_image_element.innerHTML = "<p><img src=" +  movie_image_url + "</p>";

        let best_movie_datas_element = document.getElementById("bestMovie__datas");
        best_movie_datas_element.innerHTML = "<p><strong>" + movie_datas[0] + "</strong>" 

        let best_movie_btn_element = document.getElementById("bestMovie__datas__btn");
        best_movie_btn_element.innerHTML = "<a href='modal-btn'>Infos</a>"
    
                                
        // console.log(movie_datas, movie_image_url)

    })

    .catch(function(error) {
        console.log(error);
    });

