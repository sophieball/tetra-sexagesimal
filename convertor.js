const tet2dec = A => {
  let s = 0;
  for (let i = 0; i < A.length; i++) s = s * 64 + A[i];
  return s;
};

const dec2tet = n => {
  let L = [];
  while (n >= 64) {
    const r = n % 64;
    const q = parseInt(n / 64);
    L.push(q);
    n = r;
  }
  L.push(n);
  return L;
};
