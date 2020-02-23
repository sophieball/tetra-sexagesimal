const tet2dec = A => {
  let s = 0;
  for (let i = 0; i < A.length; i++) s = s * 64 + A[i];
  return s;
};

const dec2tet = n => {
  let L = [];
  while (n > 0) {
    L.push(n % 64);
    n = parseInt(n / 64);
  }
  L.reverse();
  return L;
};
