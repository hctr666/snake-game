// A 2D array custom hook
export const use2DArray = (rows, cols) => {
  const arr = []
  for (let i = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++) row.push(j)
    arr.push(row)
  }
  return arr
}