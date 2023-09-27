'use strict';
console.log('Starting script');

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const catInfo = document.querySelector('.cat-info');
console.log('Cat info:', catInfo);
let select; // zmienna uzyta do przechowywania instalacji rozwijanej listy
Notiflix.Loading.standard('Loading...', {
});

window.onload = () => {
  console.log('Window loaded');
  Notiflix.Loading.standard('Loading data, please wait...', {
  });
  fetchBreeds() // pobranie raz kodów poprzez API
    .then(breeds => {
      Notiflix.Loading.remove(); // usunięcie animacji ładowania, bo pomyślnie pobrano dane
      const breedSelect = document.querySelector('.breed-select'); // rozwijalna lista z html <select class="breed-select"></select>
      select = new SlimSelect({ // Ta instancja jest odpowiedzialna za renderowanie i obsługę rozwijanej listy
        select: breedSelect,
        data: breeds.map(breed => ({
          text: breed.name, // przekształcenie danych o rasach kotów, które zostały pobrane, na format, który może być wykorzystany przez SlimSelect 
          value: breed.id, // Tworzy tablicę obiektów, gdzie każdy obiekt ma pole "text" zawierające nazwę rasy i pole "value" zawierające identyfikator rasy(zgodnie z wytycznymi w zadaniu)
        })),
      });
      breedSelect.addEventListener('click', event => { // nasłuchiwanie zdarzenia click i w wywołanie funkcji displayCatInfo
        console.log('onClick event', event);
        console.log('onClick event - selected value', event.target.value);
        displayCatInfo(event.target.value);
      });
      console.log('SlimSelect initialized:', select);
      console.log('SlimSelect data: ', select.data.getData());
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
};

