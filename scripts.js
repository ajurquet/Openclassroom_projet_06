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




// Création de la fenêtre "meilleur film"
function showPreviewBestMovie(endUrl) {
fetch(mainEntryUrl + endUrl)
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
        best_movie_datas_element.innerHTML = "<p><strong>" + movie_datas[0] + "</strong>";

        let best_movie_modal_content = document.getElementsByClassName("modal__img")[0];
        best_movie_modal_content.innerHTML = "<p><img src=" +  movie_image_url + "</p>";

        let best_movie_modal_list = document.getElementsByClassName("modal__contents")[0];
        let movie_content_ul_el = document.createElement("ul");
        
        best_movie_modal_list.appendChild(movie_content_ul_el);
        
        for (data of movie_datas) {
            let li_element = document.createElement("li");
            let li_content = document.createTextNode(data);
            li_element.appendChild(li_content)
            movie_content_ul_el.appendChild(li_element)
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}




function open_modal_window (movie_object) {
  // Script fenêtre modale
  let modal = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];

  // Ouvre la fenêtre
    modal.style.display = "block";
    let modal_img_el = document.getElementsByClassName("modal__img")[0];
    modal_img_el = document.innerHTML = "<p><img src=" +  movie_object.img_url + "</p>";
    let modal_content_el = document.getElementsByClassName("modal__contents");
    let title_li = document.createElement("li");
    title_li.innerHTML = "Titre : " + movie_object.title;
    console.log(title_li);
    console.log(modal_content_el);
    modal_content_el[0].appendChild(title_li);

    console.log(modal_content_el);
  // Ferme la fenêtre quand l'utilisateur clique sur "X", et efface les données
  span.onclick = function() {
    modal.style.display = "none";
    let modal_img = document.getElementsByClassName("modal__img")[0];
    modal_img.innerHTML = "";
    let modal_data = document.getElementsByClassName("modal__contents")[0];
    modal_data.innerHTML = "";
  }
  // Ferme la fenêtre quand l'utilisateur clique en dehors de la fenêtre
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}






// Script fenêtre modale
let modal = document.getElementById("myModal");
let btn = document.getElementsByClassName("btn__openModal")[0];
let span = document.getElementsByClassName("close")[0];
// Ouvre la fenêtre quand l'utilisateur clique sur le bouton
btn.onclick = function() {
  modal.style.display = "block";
}
// Ferme la fenêtre quand l'utilisateur clique sur "X"
span.onclick = function() {
  modal.style.display = "none";
  let modal_img = document.getElementsByClassName("modal__img")[0];
  modal_img.innerHTML = "";
  let modal_data = document.getElementsByClassName("modal__list")[0];
  modal_data.innerHTML = "";
}
// Ferme la fenêtre quand l'utilisateur clique en dehors de la fenêtre
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
      // open_modal_window(movie)
      // let movie_modal_contents = document.getElementsByClassName("modal__contents")[0];
      // let movie_content_ul_el = document.createElement("ul");
      
      // movie_modal_contents.appendChild(movie_content_ul_el);

      
      // for (data of movie_datas) {
      //     let li_element = document.createElement("li");
      //     let li_content = document.createTextNode(data);
      //     li_element.appendChild(li_content)
      //     movie_content_ul_el.appendChild(li_element)
      // }
      //   modal.style.display = "block";

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



  
  
