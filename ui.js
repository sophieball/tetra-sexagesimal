/* ui.js
 * handle app ui rendering and updates
 * handle global settings
 * handle ui and backend interactions
 */

/* constants
 * - suits_rankings (symbol -> array)
 * - left_select (element select)
 * - right_select (element select)
 * - left_checkbox_label (element label)
 * - right_checkbox_label (element label)
 */

/* global settings
 * - left_lang (object { tetra, suits_ranking, ace_high })
 * - right_lang (object { ^^ })
 */

/* ************************************************************************* */

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

/* ************************************************************************* */

/* settings listeners */
document.querySelector('input[name="left-checkbox"]').addEventListener('change', function() { /* left checkbox */
  if (this.checked) {
    left_lang.ace_high = true;
  } else {
    left_lang.ace_high = false;
  }
});
document.querySelector('input[name="right-checkbox"]').addEventListener('change', function() { /* right checkbox */
  if (this.checked) {
    right_lang.ace_high = true;
  } else {
    right_lang.ace_high = false;
  }
});
left_select.addEventListener('change', function() {
  const v = this.value;
  if (v === 'dec') {
  } else {
  }
});
right_select.addEventListener('change', function() {
  const v = this.value;
  if (v === 'dec') {
  } else {
  }
});
