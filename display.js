const mk_red = s => `<span style='color: red;'>${s}</span>`;
const suits = {
  s: '&spades;',
  h: mk_red('&hearts;'),
  c: '&clubs;',
  d: mk_red('&diams;')
};
const mk_rank_digits = (rc, suits_ranking) => {
  switch(suits_ranking) {
    case 'alternating': return [suits.d + rc, suits.c + rc, suits.h + rc, suits.s + rc];
    case 'alphabetical': return [suits.c + rc, suits.d + rc, suits.h + rc, suits.s + rc];
    case 'reversed_alpha': return [suits.s + rc, suits.h + rc, suits.d + rc, suits.c + rc];
    default: throw 'Invalid suits ranking';
  }
};
/** @param A     is array of arrays @requires A.length >= 1 */
const concat_arrays = A => A.length === 1 ? A[0] : A[0].concat(concat_arrays(A.slice(1, A.length)));
const digits_display = lang => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].
  concat(concat_arrays((lang.ace_high ?
    ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] :
    ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']).
    map(rc => mk_rank_digits(rc, lang.suits_ranking)))).
  concat(['&#x1F0CF;', '&#x1F0CF;']);

const mk_tetra_display = (A, lang) => {
  const digits = digits_display(lang);
  return A.map(d => digits[d]).join('');
};
