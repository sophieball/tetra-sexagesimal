const suits_typing = {
  s: 'S',
  h: 'H',
  c: 'C',
  d: 'D'
};
const mk_red = s => `<span style='color: red;'>${s}</span>`;
const suits = {
  s: '&spades;',
  h: mk_red('&hearts;'),
  c: '&clubs;',
  d: mk_red('&diams;')
};
const digits_display = ace_high => {
  const non_ace_high = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    suits.d + 'A', suits.c + 'A', suits.h + 'A', suits.s + 'A',
    suits.d + '2', suits.c + '2', suits.h + '2', suits.s + '2',
    suits.d + '3', suits.c + '3', suits.h + '3', suits.s + '3',
    suits.d + '4', suits.c + '4', suits.h + '4', suits.s + '4',
    suits.d + '5', suits.c + '5', suits.h + '5', suits.s + '5',
    suits.d + '6', suits.c + '6', suits.h + '6', suits.s + '6',
    suits.d + '7', suits.c + '7', suits.h + '7', suits.s + '7',
    suits.d + '8', suits.c + '8', suits.h + '8', suits.s + '8',
    suits.d + '9', suits.c + '9', suits.h + '9', suits.s + '9',
    suits.d + 'T', suits.c + 'T', suits.h + 'T', suits.s + 'T',
    suits.d + 'J', suits.c + 'J', suits.h + 'J', suits.s + 'J',
    suits.d + 'Q', suits.c + 'Q', suits.h + 'Q', suits.s + 'Q',
    suits.d + 'K', suits.c + 'K', suits.h + 'K', suits.s + 'K',
    '&#x1F0CF;',
    '&#x1F0CF;'
  ];
  if (!ace_high) return non_ace_high;
  else return non_ace_high.slice(0, 10).concat(
    non_ace_high.slice(14, 62),
    non_ace_high.slice(10, 14),
    non_ace_high.slice(62, 64));
};

const mk_tetra_display = (A, ace_high) => {
  const digits = digits_display(ace_high);
  return A.map(d => digits[d]).join('');
};
