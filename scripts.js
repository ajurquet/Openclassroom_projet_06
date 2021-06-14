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
}



function createModal(movieId) {
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    fetch(mainEntryUrl + movieId)
      .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
      .then(function(data) {

      //Ouvre la fenêtre modale et copie les informations du film à l'intérieur.
      let modal_img_el = document.getElementsByClassName("modal__img")[0];
      modal_img_el.innerHTML = "<p><img src=" +  data.image_url + "</p>";
      let modal_content_el = document.getElementsByClassName("modal__contents");

      let title_li = document.createElement("li");
      title_li.innerHTML = "<em>Titre : </em>" + data.title;
      modal_content_el[0].appendChild(title_li);

      let genres_li = document.createElement("li");
      genres_li.innerHTML = "<em>Genre(s) : </em>" + data.genres;
      modal_content_el[0].appendChild(genres_li);

      let year_li = document.createElement("li");
      year_li.innerHTML = "<em>Date de sortie : </em>" + data.published;
      modal_content_el[0].appendChild(year_li);

      let imdb_score_li = document.createElement("li");
      imdb_score_li.innerHTML = "<em>Score IMBD : </em>" + data.imdb_score;
      modal_content_el[0].appendChild(imdb_score_li);

      let directors_li = document.createElement("li");
      directors_li.innerHTML = "<em>Réalisateur(s) : </em>" + data.directors;
      modal_content_el[0].appendChild(directors_li);

      let actors_li = document.createElement("li");
      actors_li.innerHTML = "<em>Acteurs : </em>" + data.actors;
      modal_content_el[0].appendChild(actors_li);

      let duration_li = document.createElement("li");
      duration_li.innerHTML = "<em>Durée : </em>" + data.duration + " minutes.";
      modal_content_el[0].appendChild(duration_li);

      let country_li = document.createElement("li");
      country_li.innerHTML = "<em>Pays d'origine : </em>" + data.country_li;
      modal_content_el[0].appendChild(country_li);

      let box_office_results = document.createElement("li");
      box_office_results.innerHTML = "<em>Box-office : </em>" + data.worldwide_gross_income;
      modal_content_el[0].appendChild(box_office_results);

      let description_li = document.createElement("li");
      description_li.innerHTML = "<em>Résumé : </em>" + data.description;
      modal_content_el[0].appendChild(description_li);

      // durée, pays d'origine, résultat box offfice, résumé du film
    

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
    .catch(function(error) {
      console.error('Error:', error);
  });
  
})};





// Création de la fenêtre "meilleur film"
async function showPreviewBestMovie(url) {
  fetch(url)
      .then(await function(res) {
          if (res.ok) {
              return res.json();
          }
      })
      .then(await function(data) {
      console.log(data);
      let best_movie_img = document.getElementById("bestMovie__image");

      best_movie_img.innerHTML = "<p><img src=" +  data.image_url + " class=imagePreview"  + " </p>";
      best_movie_img.setAttribute("data-id", data.id);


      let best_movie_contents = document.getElementById("bestMovie__contents");
      let best_movie_title = document.createElement("p");
      let best_movie_description = document.createElement("p");

      best_movie_title.innerText = data.title;
      best_movie_contents.appendChild(best_movie_title);

      best_movie_description.innerText = data.description;
      best_movie_contents.appendChild(best_movie_description);

      let btn = document.getElementsByClassName("btn__openModal");
      btn[0].addEventListener("click", function () {
      createModal(best_movie_img.dataset.id);
      })
    
    .catch(function(error) {
      console.error('Error:', error);
    });

    })
  };
  

// Création du caroussel
async function showPreviewInCaroussel(endUrl, indice, category) {
fetch(mainEntryUrl + endUrl)
  .then(await function(res) {
    if (res.ok) {
        return res.json();
    }
  })
  .then(await function(data) {   
    let movie_cat = document.getElementsByClassName(category)[0];    
    let movie_image_element = document.createElement("p");
    
    movie_image_element.innerHTML = "<p><img src=" +  data.results[indice].image_url + " class=imagePreview"  + " </p>";
    movie_image_element.setAttribute("data-id", data.results[indice].id)
    movie_cat.appendChild(movie_image_element);
    
    movie_image_element.addEventListener("click", function() {
      console.log(movie_image_element.dataset.id);
      createModal(movie_image_element.dataset.id)
    })
      
    })

    .catch(function(error) {
        console.log(error);
    });
  }




  function main() {

    // Fenêtre meilleur film
  let bestMovieUrl = "";

  fetch (mainEntryUrl + "?sort_by=-imdb_score")
    .then(function(res) {
      if (res.ok) {
          return res.json();
      }
  })
    .then(function(data) {
      let bestMovieUrl = data.results[0].url
      showPreviewBestMovie(bestMovieUrl);
    });


  // 1er caroussel (meilleur films)
  for (let movie = 0; movie < 5; movie++) {
    showPreviewInCaroussel("?sort_by=-imdb_score", movie, "bestMovies")
  }
  for (let movie = 0; movie < 2; movie++) {
    showPreviewInCaroussel("?sort_by=-imdb_score&page=2", movie, "bestMovies")
    
  }

  
  // 2d caroussel (meilleur films d'action)
  for (let movie = 0; movie < 5; movie++) {
    showPreviewInCaroussel("?genre_contains=drama", movie, "bestMovies__action")
  }
  for (let movie = 0; movie < 2; movie++) {
    showPreviewInCaroussel("??genre_contains=drama&page=2", movie, "bestMovies__action")
  }

  // 3eme caroussel (meilleur films thriller)
  for (let movie = 0; movie < 5; movie++) {
    showPreviewInCaroussel("?genre_contains=thriller", movie, "bestMovies__thriller")
  }
  for (let movie = 0; movie < 2; movie++) {
    showPreviewInCaroussel("?genre_contains=thriller&page=2", movie, "bestMovies__thriller")
  }

  // 4eme caroussel (meilleur films d'horreur)
  for (let movie = 0; movie < 5; movie++) {
    showPreviewInCaroussel("?genre_contains=horror", movie, "bestMovies__horror")
  }
  for (let movie = 0; movie < 2; movie++) {
    showPreviewInCaroussel("??genre_contains=horror&page=2", movie, "bestMovies__horror")
  }

  

  let imagePreviews = document.getElementsByClassName("imagePreview");
  console.log(imagePreviews);
  for (let img of imagePreviews) {
    console.log(img);
    img.addEventListener("click", function() {
      createModal(img.dataset.id)
    })
  } 






}

main()


