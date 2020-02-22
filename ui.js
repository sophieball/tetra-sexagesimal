/* ui.js
 * handle app ui rendering and updates
 * handle global settings
 * handle ui and backend interactions
 */

/* constants
 * - suits_rankings (symbol -> array)
 * - left_select (element select)
 * - right_select ( ^^ )
 * - left_checkbox_label (element label)
 * - right_checkbox_label ( ^^ )
 * - left_textarea_display (element textarea)
 * - right_textarea_display ( ^^ )
 * - left_textarea_input (element textarea)
 * - right_textarea_input ( ^^ )
 * - ui_set_left_lang_to_dec (function: void -> void)
 * - ui_set_right_lang_to_dec ( ^^ )
 * - ui_set_lang_to_tetra (function: object, string -> void)
 * - ui_textarea_placeholder_input_dec (string)
 * - ui_textarea_placeholder_input_tetra (string)
 */

/* global settings
 * - left_lang (const object { tetra (boolean), suits_ranking (string), ace_high (boolean) })
 * - right_lang (const object { ^^ })
 */

/* ************************************************************************* */

const suits_rankings = {
  alternating: ['D', 'C', 'H', 'S'],
  alphabetical: ['C', 'D', 'H', 'S'],
  reversed_alpha: ['S', 'H', 'D', 'C'],
};

/* global settings */
const left_lang = {
  tetra: true,
  suits_ranking: 'alternating',
  ace_high: false
};
const right_lang = {
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
const left_textarea_display = document.querySelector('textarea#left-textarea-display');
const right_textarea_display = document.querySelector('textarea#right-textarea-display');
right_textarea_display.style.display = 'none';
const left_textarea_input = document.querySelector('textarea#left-textarea-input');
const right_textarea_input = document.querySelector('textarea#right-textarea-input');

/* ************************************************************************* */

const ui_set_left_lang_to_dec = () => {
  left_lang.tetra = false;
  left_lang.suits_ranking = '';
};
const ui_set_right_lang_to_dec = () => {
  right_lang.tetra = false;
  right_lang.suits_ranking = '';
};
const ui_set_lang_to_tetra = (lang, ranking) => {
  lang.tetra = true;
  lang.suits_ranking = ranking;
};
const ui_textarea_placeholder_input_dec = 'Input a decimal number';
const ui_textarea_placeholder_input_tetra = 'Input a tetra-sexagesimal number';

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
left_select.addEventListener('change', function() { /* left select */
  const v = this.value;
  if (v === 'dec') {
    left_textarea_display.style.display = 'none';
    left_checkbox_label.style.display = 'none';
    ui_set_left_lang_to_dec();
    left_textarea_input.attributes.placeholder.value = ui_textarea_placeholder_input_dec;
  } else {
    left_textarea_display.style.display = 'block';
    left_checkbox_label.style.display = 'block';
    ui_set_lang_to_tetra(left_lang, v);
    left_textarea_input.attributes.placeholder.value = ui_textarea_placeholder_input_tetra;
  }
  left_textarea_input.value = '';
  left_textarea_display.value = '';
});
right_select.addEventListener('change', function() { /* right select */
  const v = this.value;
  if (v === 'dec') {
    right_textarea_display.style.display = 'none';
    right_checkbox_label.style.display = 'none';
    ui_set_right_lang_to_dec();
    right_textarea_input.attributes.placeholder.value = ui_textarea_placeholder_input_dec;
  } else {
    right_textarea_display.style.display = 'block';
    right_checkbox_label.style.display = 'block';
    ui_set_lang_to_tetra(right_lang, v);
    right_textarea_input.attributes.placeholder.value = ui_textarea_placeholder_input_tetra;
  }
  right_textarea_input.value = '';
  right_textarea_display.value = '';
});
