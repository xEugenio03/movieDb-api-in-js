const api_key="api_key=ecaccf592c84199613eab1ed847841ad";
const API_Read="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2FjY2Y1OTJjODQxOTk2MTNlYWIxZWQ4NDc4NDFhZCIsIm5iZiI6MTcyMzIwOTMwOS44NDE3Niwic3ViIjoiNjZiNjE1MDgzZWUxZTRkYTAwN2FiNjEyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k_aGfnqN5KCuP4vSC63hen5gvr89tZa3wy_9I4XDBUA";
const BASE_URL="https://api.themoviedb.org/3/";
const IMG_URL="https://image.tmdb.org/t/p/w500/"; 
const API_URL=BASE_URL+api_key;
const DISCOVER_MOVIE_URL='https://api.themoviedb.org/3/discover/movie?'+api_key;
const SEARCH_URL = BASE_URL+"search/movie?query=";
let content=document.getElementById("content");
let search=document.querySelector("form");
search.addEventListener("submit", cerca_film);

console.log(search);

function cerca_film(e){

    e.preventDefault();
    console.log(e.target.search.value);
    const richiesta=e.target.search.value;
    const url_richiesta=SEARCH_URL+richiesta+"&"+api_key;
    console.lo
    getMovie(url_richiesta);
    
}



getMovie(DISCOVER_MOVIE_URL);

function getMovie(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the full response data
      showFilm(data);
     }) // Call the function to display films
    .catch(err => console.error(err));
}


function showFilm(data){
    console.log(data.results);
    content.innerHTML=null;

    console.log(data.results.length);
    if(data.results.length>0)
    {
        data.results.forEach(film => {
            console.log(film);
            const id=film.id;
            const title=film.title;
            const img=film.poster_path;
            const vote_average=film.vote_average;
            const rating=vote_average.toFixed(1)
            const description=film.overview;


            let film_corrente=document.createElement("div");
            film_corrente.classList="film";
            console.log(IMG_URL+img);
            film_corrente.innerHTML=
                    '<img class="image" src="'+IMG_URL+img+'" alt="Image">' +
                    '<div class="informazioni">' +
                        '<div class="film_name">' +
                            '<p>'+title+'</p>' +
                        '</div>' +
                        '<div class="rating">' +
                            '<p class="">'+rating+'</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="caption">' +
                        '<p>'+description+'</p>' +
                    '</div>' +
            content.appendChild(film_corrente);
        });
    }else{
        let avviso=document.createElement("p")
        avviso.innerText="Nessun risultato trovato";
        content.appendChild(avviso);
    }

    get_ratings();
}


function get_ratings(){
    let ratings=document.querySelectorAll(".rating");
    console.log(ratings[0].children[0].classList);
    console.log("il numero di figli di rating e' "+ratings.length);
    addColor(ratings);
};


function addColor(ratings){
    for(let i=0; i<ratings.length; i++)
    {   
        let rating_scale=Number(ratings[i].textContent);
        if(rating_scale<=4)
        {
            ratings[i].children[0].classList.add("rating_red");
        }
        else if(rating_scale>4 && rating_scale<=7)
        {
            ratings[i].children[0].classList.add("rating_yellow");
        }
        if(rating_scale>7 && rating_scale<=10)
        {
            ratings[i].children[0].classList.add("rating_green");
        }
        
    }
    
}





