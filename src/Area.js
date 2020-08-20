import React, { useEffect, useCallback, useState } from 'react'
import AreaNode from './AreaNode'
import { use2DArray } from './customHooks'
import './Area.scss'
import { inRange } from './utils'

const snakeMoveActionTypes = {
  RIGHT: 'moveSnakeToRight',
  LEFT: 'moveSnakeToLeft',
  DOWN: 'moveSnakeToDown',
  UP: 'moveSnakeToUp',
}

export default function Area(props) {
  const { snakeTail, snakeDirection, snakePos, dispatch, cols, rows, foodCoords, score } = props
  const [snakeHasAte, setSnakeHasAte] = useState(false)
  const grid = use2DArray(rows, cols)

  // Set new food coords
  const setFoodNewCoords = useCallback((x, y) => {
    const coords = { x: parseInt(Math.random() * rows), y: parseInt(Math.random() * cols) }
    // Try again if food position matches the snake one
    if (x === snakeTail.x && y === snakeTail.y) {
      setFoodNewCoords(coords.x, coords.y)
    }
    dispatch({ type: 'updateFoodCoords', payload: coords })
  }, [rows, cols, snakeTail, dispatch])

  // Move snake based on actioned direction
  const onArrowKeyPress = useCallback((e) => {
    switch(e.key) {
      case 'ArrowUp':
        dispatch({ type: 'changeSnakeDirection', payload: 'UP' })
        break
      case 'ArrowDown':
        dispatch({ type: 'changeSnakeDirection', payload: 'DOWN' })
        break
      case 'ArrowLeft':
        dispatch({ type: 'changeSnakeDirection', payload: 'LEFT' })
        break
      default:
        dispatch({ type: 'changeSnakeDirection', payload: 'RIGHT' })
        break
    }
  }, [dispatch])

  const isSnakeTailNode = (x, y) => snakeTail.filter(tailItem => (
    tailItem.x === x && y === tailItem.y
  )).length > 0
    
  const isSnakeHeadNode = (x, y) => snakePos.x === x && snakePos.y === y
  const isFoodNode = (x, y) => x === foodCoords.x && y === foodCoords.y

  useEffect(() => {
    const speed = 700 - score * 20
    const timeout = setTimeout(() => {
      !snakeHasAte && dispatch({ type: 'updateSnakeTail' })
      dispatch({ type: snakeMoveActionTypes[snakeDirection]})

      //console.log(snakeTail);
    }, speed)
    return () => clearTimeout(timeout)
  }, [snakePos, score, snakeDirection, dispatch, snakeHasAte])

  useEffect(() => {
    // Determine if snake has ate
    setSnakeHasAte(foodCoords.x === snakePos.x && foodCoords.y === snakePos.y)
  }, [snakePos, foodCoords])

  useEffect(() => {
    if (snakeHasAte) {
      dispatch({ type: 'incrementScore' })
      dispatch({ type: 'growSnakeTail' })
    }
  }, [snakeHasAte, dispatch])

  useEffect(() => {
    snakeHasAte && setFoodNewCoords()
  }, [snakeHasAte, setFoodNewCoords])

  useEffect(() => {
    document.addEventListener('keydown', onArrowKeyPress, false)
    return () => document.removeEventListener('keydown', onArrowKeyPress, false)
  }, [onArrowKeyPress])

  return <div className="Area">
    {grid.map((row, y) => (
      <div key={y} className="AreaRow">
        {<span style={{display:'block',width:24,color:'red'}}>{y}</span>}
        <div className="Score">{score}</div>
        {row.map((x) => {
          return <AreaNode
            key={x}
            isFood={isFoodNode(x, y)}
            isSnake={isSnakeTailNode(x, y) || isSnakeHeadNode(x, y)}
            index={x}
          />
        })}
      </div>
    ))}
  </div>
}