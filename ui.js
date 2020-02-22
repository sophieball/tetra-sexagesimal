const suits_rankings = {
  alternating: ['D', 'C', 'H', 'S'],
  alphabetical: ['C', 'D', 'H', 'S'],
  reversed_alpha: ['S', 'H', 'D', 'C'],
};

/* global settings */
let left_lang = {
  tetra: true,
  suits_ranking: 'alternating',
  ace_high: false
};
let right_lang = {
  tetra: false,
  suits_ranking: '',
  ace_high: false
};

/* init settings in ui */
const left_select = document.querySelector('select#left-lang');
const right_select = document.querySelector('select#right-lang');
left_select.selectedIndex = 1;
right_select.selectedIndex = 0;
const left_checkbox_label = document.querySelector('label#left-checkbox-label');
const right_checkbox_label = document.querySelector('label#right-checkbox-label');
left_checkbox_label.style.display = 'block';
