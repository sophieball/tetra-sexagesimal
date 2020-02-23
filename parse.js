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

/**
 * mk_tetra constructs a tetra-sexagesimal typing string from
 * a digits array based on the given language definition
 * @param A     is an array of digit values
 * @param lang  is language definition object { tetra, suits_ranking, ace_high }
 */
const mk_tetra = (A, lang) => {
  let S = '';
  for (let i = 0; i < A.length; i++) {
    const d = A[i];
    if (d < 0) throw 'Invalid digit value < 0';
    if (d >= 64) throw 'Invalid digit value >= 64';
    if (d < 10) {
      S = S + d;
      continue;
    }
    if (d === 63) {
      S = S + 'JH';
      continue;
    }
    if (d === 62) {
      S = S + 'JL';
      continue;
    }
    const ranks = lang.ace_high ?
      ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] :
      ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    const suits = (() => {
      switch(lang.suits_ranking) {
        case 'alternating': return ['D', 'C', 'H', 'S'];
        case 'alphabetical': return ['C', 'D', 'H', 'S'];
        case 'reversed_alpha': return ['S', 'H', 'D', 'C'];
        default: throw new 'Invalid suits ranking in lang definition';
      }
    })();
    const offset = d - 10;
    S = S + suits[offset % 4] + ranks[parseInt(offset / 4)];
  }
  return S;
};
