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
 * - right_textarea_output ( ^^ )
 * - button_translate (element button)
 * - button_swap ( ^^ )
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
left_textarea_display.style.display = 'block'; // so that the value is not undefined
right_textarea_display.style.display = 'none';
const left_textarea_input = document.querySelector('textarea#left-textarea-input');
const right_textarea_output = document.querySelector('textarea#right-textarea-output');
const button_translate = document.querySelector('button#btn-translate');
const button_swap = document.querySelector('button#btn-swap');
(() => {
  const window_width = parseInt(window.innerWidth);
  const button_width = parseInt(button_translate.offsetWidth);
  const offset = parseInt((window_width - button_width) / 2) - 1;
  button_translate.style.left = offset + 'px';
  button_swap.style.left = offset + 'px';
})();

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
  } else {
    right_textarea_display.style.display = 'block';
    right_checkbox_label.style.display = 'block';
    ui_set_lang_to_tetra(right_lang, v);
  }
  right_textarea_output.value = '';
  right_textarea_display.value = '';
});
button_swap.addEventListener('click', () => { /* swap button click */
  (() => { // swap values inside first textareas
    const left = left_textarea_input.value;
    left_textarea_input.value = right_textarea_output.value;
    right_textarea_output.value = left;
  })();
  (() => { // swap values inside second textareas
    const left = left_textarea_display.value;
    left_textarea_display.value = right_textarea_display.value;
    right_textarea_display.value = left;
  })();
  (() => { // swap display style of second textareas
    const left = left_textarea_display.style.display;
    left_textarea_display.style.display = right_textarea_display.style.display;
    right_textarea_display.style.display = left;
  })();
  // swap values of ace_high checkboxes
  document.querySelector('input[name="right-checkbox"]').checked = left_lang.ace_high;
  document.querySelector('input[name="left-checkbox"]').checked = right_lang.ace_high;
  (() => { // swap display style of ace_high checkboxes
    const left = left_checkbox_label.style.display;
    left_checkbox_label.style.display = right_checkbox_label.style.display;
    right_checkbox_label.style.display = left;
  })();
  (() => { // swap values of language select options
    const left = left_select.value;
    left_select.value = right_select.value;
    right_select.value = left;
  })();
  (() => { // swap language definition objects
    (() => {
      const left = left_lang.tetra;
      left_lang.tetra = right_lang.tetra;
      right_lang.tetra = left;
    })();
    (() => {
      const left = left_lang.suits_ranking;
      left_lang.suits_ranking = right_lang.suits_ranking;
      right_lang.suits_ranking = left;
    })();
    (() => {
      const left = left_lang.ace_high;
      left_lang.ace_high = right_lang.ace_high;
      right_lang.ace_high = left;
    })();
  })();
  // update left textarea input placeholder value
  left_textarea_input.attributes.placeholder.value = left_lang.tetra ?
    ui_textarea_placeholder_input_tetra :
    ui_textarea_placeholder_input_dec;
});
button_translate.addEventListener('click', () => {
  const input = left_textarea_input.value.replace(/[^a-zA-Z0-9]/g, '');
  if (input.length <= 0) return;
  if (left_lang.tetra && !right_lang.tetra) {
    right_textarea_output.value = tet2dec(parse_tetra(input, left_lang));
  }
});
