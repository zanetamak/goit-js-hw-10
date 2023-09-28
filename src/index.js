'use strict';

console.log('Starting script');

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './css/common.css';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Window loaded');
  Notiflix.Loading.standard('Loading data, please wait...');

  fetchBreeds()
    .then(breeds => {
      Notiflix.Loading.remove();
      const breedSelect = document.querySelector('.breed-select');
      new SlimSelect({
        select: breedSelect,
        data: breeds.map(breed => ({
          text: breed.name,
          value: breed.id,
        })),
      });
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  selector.disabled = true;
  Notiflix.Loading.standard('Loading data, please wait...', { overlay: selector });

  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      const [cat] = data;
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
      console.log(divCatInfo);
    })
    .catch(error => {
      console.log(error.response);
      Notiflix.Loading.remove(selector);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}