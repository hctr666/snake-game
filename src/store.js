export const initialState = {
  rows: 30,
  cols: 30,
  score: 0,
  foodCoords: {
    x: 5,
    y: 0
  },
  snakeCoords: {
    x: 0,
    y: 0
  },
  snakeDirection: 'RIGHT'
}

export const reducer = (state, { type, payload }) => {
  const { snakeCoords, score, rows, cols } = state
  const { x, y } = snakeCoords

  switch(type) {
    case 'moveSnakeToUp':
      return { ...state, snakeCoords: { y: y > 0 ? y - 1 : y, x }}
    case 'moveSnakeToDown':
      return { ...state, snakeCoords: { y: y < cols - 1 ? y + 1 : y, x }}
    case 'moveSnakeToLeft':
      return { ...state, snakeCoords: { y, x: x > 0 ? x - 1 : x }}
    case 'moveSnakeToRight':
      return { ...state, snakeCoords: { y, x: x < rows - 1 ? x + 1 : x }}
    case 'changeSnakeDirection':
      return { ...state, snakeDirection: payload }
    case 'incrementScore':
      return { ...state, score: score + 1 }
    case 'updateFoodCoords':
      return { ...state, foodCoords: payload }
    default:
      return state
  }
}