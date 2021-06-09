const mainEntryUrl = "http://localhost:8000/api/v1/titles/";
let movie_image_url = "";
let movie_datas = [];
let movie_datas_html = [];


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
        best_movie_datas_element.innerHTML = "<p><strong>" + movie_datas[0] + "</strong>";

        let best_movie_modal_content = document.getElementsByClassName("modal__img")[0];
        best_movie_modal_content.innerHTML = "<p><img src=" +  movie_image_url + "</p>";

        let best_movie_modal_list = document.getElementsByClassName("modal__list")[0];
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


// Script fenêtre modale
let modal = document.getElementById("myModal");
let btn = document.getElementsByClassName("btn__openModal")[0];
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}