const is_digit = c => c === '0' ||
                      c === '1' ||
                      c === '2' ||
                      c === '3' ||
                      c === '4' ||
                      c === '5' ||
                      c === '6' ||
                      c === '7' ||
                      c === '8' ||
                      c === '9';
const is_joker = c => c === 'J';
const is_rank = c => c === 'A' ||
                     c === '2' ||
                     c === '3' ||
                     c === '4' ||
                     c === '5' ||
                     c === '6' ||
                     c === '7' ||
                     c === '8' ||
                     c === '9' ||
                     c === 'T' ||
                     c === 'J' ||
                     c === 'Q' ||
                     c === 'K';
const get_rank_multipliers = ace_high => {
  const d = ace_high ? 1 : 0;
  return {
    'A': ace_high ? 12 : 0,
    '2': 1 - d,
    '3': 2 - d,
    '4': 3 - d,
    '5': 4 - d,
    '6': 5 - d,
    '7': 6 - d,
    '8': 7 - d,
    '9': 8 - d,
    'T': 9 - d,
    'J': 10 - d,
    'Q': 11 - d,
    'K': 12 - d
  };
};
const get_suit_addons = dialect => {
  switch(dialect) {
    case 'alternating':         return { D: 0, C: 1, H: 2, S: 3 };
    case 'alphabetical':        return { C: 0, D: 1, H: 2, S: 3 };
    case 'reversed_alpha':      return { S: 0, H: 1, D: 2, C: 3 };
    default:
      throw 'Try to parse tetra-sexagesimal but find unknown dialect';
  }
};

/**
 * parse_tetra trys to parse a tetra-sexagesimal typed input into
 * a decimal array of digit values based on the given language definition
 * @param S     is typed input string cleaned
 * @param lang  is language definition object { tetra, suits_ranking, ace_high }
 */
const parse_tetra = (S, lang) => {
  if (!lang.tetra) throw 'Language definition is not tetra-sexagesimal';
  const suit_addons = get_suit_addons(lang.suits_ranking);
  const rank_multipliers = get_rank_multipliers(lang.ace_high);
  const A = [];
  let bigram = '';
  let is_bigram = false;
  for (let i = 0; i < S.length; i++) {
    const c = S[i];
    if (is_bigram) {                    is_bigram = false;
      if (is_joker(bigram)) {
        if (c === 'H')                  A.push(63);
        else if (c === 'L')             A.push(62);
        else                            throw 'Parse alternating tetra-sexagesimal failed';
      } else if (is_rank(c))            A.push(10 + rank_multipliers[c] * 4 + suit_addons[bigram]);
        else                            throw 'Parse alternating tetra-sexagesimal failed';
    } else {
      if (is_digit(c))                  A.push(parseInt(c));
      else {
        if (is_joker(c)) {
          bigram = 'J';
          is_bigram = true;
          continue;
        } else {
          switch(c) {
            case 'D': /* diamonds */    case 'C': /* clubs */
            case 'H': /* hearts */      case 'S': /* spades */
              bigram = c;
              is_bigram = true;         continue;
            default:                    throw 'Parse alternating tetra-sexagesimal failed';
          }
        }
      }
    }
  }
  return A;
};
