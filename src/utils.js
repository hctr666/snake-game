// Increment or decrement constraining a value between a minimum and maximum value.
export const constrain = (n, min, max, calc = +1) => {
  var c = n + calc
  if (c > max) return max
  if (c < min) return min
  return c >= min && c <= max ? c : n 
}

export const inRange = (x, min, max) => {
  return x >= min && x <= max;
}