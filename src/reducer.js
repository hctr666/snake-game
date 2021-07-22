import { constrain } from './utils'

export const initialState = {
  rows: 20,
  cols: 20,
  score: 0,
  foodCoords: { x: 5, y: 10 },
  snakeTail: [],
  snakePos: { x: 6, y: 5 },
  snakeDirection: 'RIGHT'
}

const snakeTailAfterEat = ({ snakeTail, snakeDirection, rows, cols }) => {
  const directionReducers = {
    UP: (acc, { x, y }, i) => {
      return i === snakeTail.length - 1 ?
        acc.concat({ x, y }, { y: y > 0 ? y - 1 : y, x }) :
        acc.concat({ x, y })
    },
    DOWN:  (acc, { x, y }, i) => acc.concat({ x, y }, { y: y < cols - 1 ? y + 1 : y, x }),
    LEFT:  (acc, { x, y }, i) => acc.concat({ x, y }, { y, x: x > 0 ? x - 1 : x }),
    RIGHT: (acc, { x, y }, i) => {
      return i === snakeTail.length - 1 ?
        acc.concat({ x, y }, { y, x: x < rows - 1 ? x + 1 : x }) :
        acc.concat({ x, y })
    }
  }

  return snakeTail.reduce(directionReducers[snakeDirection], [])
}

// Compute the new snake tail after moving, based on current direction

export const reducer = (state, { type, payload }) => {
  const { score, snakePos, snakeTail, rows, cols } = state

  switch(type) {
    case 'moveSnakeToUp':
      return { 
        ...state,
        snakePos: { ...snakePos, y: constrain(snakePos.y, 0, cols, -1) }
      }
    case 'moveSnakeToDown':
      return {
        ...state,
        snakePos: { ...snakePos, y: constrain(snakePos.y, 0, cols, +1) }
      }
    case 'moveSnakeToLeft':
      return {
        ...state,
        snakePos: { ...snakePos, x: constrain(snakePos.x, 0, rows, -1) }
      }
    case 'moveSnakeToRight':
      return {
        ...state,
        snakePos: { ...snakePos, x: constrain(snakePos.x, 0, rows, +1) }
      }
    case 'changeSnakeDirection':
      return { ...state, snakeDirection: payload }
    case 'growSnakeTail':
      return { ...state, snakeTail: (() => {
        const newSnakeTail = snakeTail.slice(0)
        return newSnakeTail.concat(snakePos)
      })()}
    case 'incrementScore':
      return { ...state, score: score + 1 }
    case 'updateFoodCoords':
      return { ...state, foodCoords: payload }
    case 'updateSnakeTail':
      return { ...state, snakeTail: (() => {
        const newSnakeTail = snakeTail.slice(1)
        return snakeTail.length ? newSnakeTail.concat(snakePos) : newSnakeTail
      })()}
    default:
      return state
  }
}