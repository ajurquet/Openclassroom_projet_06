const mainEntryUrl = "http://localhost:8000/api/v1/titles/";
let movie_image_url = "";
let movie_datas = [];
let movie_datas_html = [];

let movies_instances = [];


class Movie {
  constructor(id, img_url, title, genres, year, imdb_score, directors, actors) {
    this.id = id;
    this.img_url = img_url;
    this.title = title;
    this.genres = genres;
    this.year = year;
    this.imdb_score = imdb_score;
    this.directors = directors;
    this.actors = actors;
  }

  createModal() {
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    //Ouvre la fenêtre modale et copie les informations du film à l'intérieur.
    let modal_img_el = document.getElementsByClassName("modal__img")[0];
    modal_img_el.innerHTML = "<p><img src=" +  this.img_url + "</p>";
    let modal_content_el = document.getElementsByClassName("modal__contents");

    let title_li = document.createElement("li");
    title_li.innerHTML = "Titre : " + this.title;
    modal_content_el[0].appendChild(title_li);

    let genres_li = document.createElement("li");
    genres_li.innerHTML = "Genre(s) : " + this.genres;
    modal_content_el[0].appendChild(genres_li);

    let year_li = document.createElement("li");
    year_li.innerHTML = "Année de production : " + this.year;
    modal_content_el[0].appendChild(year_li);

    let imdb_score_li = document.createElement("li");
    imdb_score_li.innerHTML = "Score IMBD : " + this.imdb_score;
    modal_content_el[0].appendChild(imdb_score_li);

    let directors_li = document.createElement("li");
    directors_li.innerHTML = "Réalisateur(s) : " + this.directors;
    modal_content_el[0].appendChild(directors_li);

    let actors_li = document.createElement("li");
    actors_li.innerHTML = "Acteurs : " + this.actors;
    modal_content_el[0].appendChild(actors_li);
    

  // Ferme la fenêtre quand l'utilisateur clique sur "X", et efface les données
    span.onclick = function() {
    modal.style.display = "none";
    let modal_img = document.getElementsByClassName("modal__img")[0];
    modal_img.innerHTML = "";
    let modal_data = document.getElementsByClassName("modal__contents")[0];
    modal_data.innerHTML = "";
  }
  // Ferme la fenêtre quand l'utilisateur clique en dehors de la fenêtre, et efface les données 
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      let modal_img = document.getElementsByClassName("modal__img")[0];
      modal_img.innerHTML = "";
      let modal_data = document.getElementsByClassName("modal__contents")[0];
      modal_data.innerHTML = "";  
  }
}
  }
}

// Création de la fenêtre "meilleur film"
function showPreviewBestMovie(endUrl) {
  fetch(mainEntryUrl + endUrl)
      .then(function(res) {
          if (res.ok) {
              return res.json();
          }
      })
      .then(function(data) {
        let best_movie = new Movie(data.results[0].id, data.results[0].image_url,data.results[0].title, data.results[0].genres, data.results[0].year,
          data.results[0].imdb_score, data.results[0].directors, data.results[0].actors);
      
        let best_movie_img = document.getElementById("bestMovie__image");
        best_movie_img.innerHTML = "<p><img src=" + best_movie.img_url + "></p>";

        let best_movie_contents = document.getElementById("bestMovie__contents");
        best_movie_contents.innerText = best_movie.title 

        btn = document.getElementsByClassName("btn__openModal");
        btn[0].addEventListener("click", function () {
        best_movie.createModal()
        })
      
      .catch(function(error) {
          console.log(error);
      });

    })
  }
  

// Création du caroussel
function showPreviewInCaroussel(endUrl, indice, category) {
fetch(mainEntryUrl + endUrl)
  .then(function(res) {
    if (res.ok) {
        return res.json();
    }
  })
  .then(function(data) {
    let movie = new Movie(data.results[indice].id, data.results[indice].image_url,data.results[indice].title, data.results[indice].genres, data.results[indice].year,
      data.results[indice].imdb_score, data.results[indice].directors, data.results[indice].actors);
      movies_instances.push(movie);
   
    let movie_cat = document.getElementsByClassName(category)[0];    
    let movie_image_element = document.createElement("p");
    
    movie_image_element.innerHTML = "<p><img src=" +  movie.img_url + "</p>";
    movie_cat.appendChild(movie_image_element);

    movie_cat.addEventListener("click", function() {
      movie.createModal()
     
    })        
    })

    .catch(function(error) {
        console.log(error);
    });
  }


// Fenêtre meilleur film
showPreviewBestMovie("?sort_by=-imdb_score");

// 1er caroussel (meilleur films)
for (let movie = 0; movie < 5; movie++) {
  showPreviewInCaroussel("?sort_by=-imdb_score", movie, "bestMovies")
}
for (let movie = 0; movie < 2; movie++) {
  showPreviewInCaroussel("?sort_by=-imdb_score&page=2", movie, "bestMovies")
}

// 2d caroussel (meilleur films d'action)
// for (let movie = 0; movie < 5; movie++) {
//   showPreviewInCaroussel("?genre_contains=drama", movie, "bestMovies__action")
// }
// for (let movie = 0; movie < 2; movie++) {
//   showPreviewInCaroussel("??genre_contains=drama&page=2", movie, "bestMovies")
// }

// // 3eme caroussel (meilleur films thriller)
// for (let movie = 0; movie < 5; movie++) {
//   showPreviewInCaroussel("?genre_contains=thriller", movie, "bestMovies__thriller")
// }
// for (let movie = 0; movie < 2; movie++) {
//   showPreviewInCaroussel("?genre_contains=thriller&page=2", movie, "bestMovies")
// }

// // 4eme caroussel (meilleur films d'horreur)
// for (let movie = 0; movie < 5; movie++) {
//   showPreviewInCaroussel("?genre_contains=horror", movie, "bestMovies__Horror")
// }
// for (let movie = 0; movie < 2; movie++) {
//   showPreviewInCaroussel("??genre_contains=horror&page=2", movie, "bestMovies")
// }
