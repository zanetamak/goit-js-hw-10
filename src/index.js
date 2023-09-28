'use strict'
console.log('Starting script');

import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './css/common.css';
import Notiflix from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

selector.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  onSelectBreed(selectedBreedId);
});

function onSelectBreed(breedId) {
  selector.disabled = true;
  divCatInfo.style.display = 'none';
  Notiflix.Loading.standard('Loading data, please wait...', { overlay: selector });

    let breedId = selectedBreedId;

  fetchCatByBreed(breedId)
      .then(cat => {
      console.log('Fetched cat info', cat);
  Notiflix.Loading.remove(selector);
      console.log(cat);
     divCatInfo.innerHTML = `
                <img src="${cat.url}" alt="${cat.breeds[0].name}">
    <div class="description">
        <h2>${cat.breeds[0].name}</h2>
        <p>${cat.breeds[0].description}</p>
        <p>${cat.breeds[0].temperament}</p>
    </div>
            `;
      console.log(catInfo);
    })
    .catch(error => {
   console.log(error.response);
  Notiflix.Loading.remove(selector);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

