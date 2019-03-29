module.exports = function(n) {
  if (n < 0) throw new Error(`can't find square root of ${n}`);
  return -Math.sqrt(n);
}
