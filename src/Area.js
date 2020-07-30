import React, { useEffect, useCallback } from 'react'
import AreaNode from './AreaNode'
import './Area.scss'

const createArray = (len) => Array.apply(null, Array(len))

const useHashMap = (rows, cols) => {
  const hashMap = new Map()
  rows.forEach((_, i) => {
    hashMap.set(i, new Set(cols.map((_, j) => j)))
  })
  return hashMap
}

const snakeActionType = {
  RIGHT: 'moveSnakeToRight',
  LEFT: 'moveSnakeToLeft',
  DOWN: 'moveSnakeToDown',
  UP: 'moveSnakeToUp',
}

export default function Area(props) {
  const { snakeCoords, snakeDirection, dispatch, cols, rows, foodCoords, score } = props
  const grid = useHashMap(createArray(rows), createArray(cols))

  // Move snake based on actioned direction
  const moveSnakeByDirection = useCallback(() => {
    dispatch({ type: snakeActionType[snakeDirection] })
  }, [dispatch, snakeDirection])

  // Set new food coords
  const setFoodNewCoords = useCallback((x, y) => {
    const coords = { x: parseInt(Math.random() * rows), y: parseInt(Math.random() * cols) }
    // Try again if food position matches the snake one
    if (x === snakeCoords.x && y === snakeCoords.y) {
      setFoodNewCoords(coords.x, coords.y)
    }
    dispatch({ type: 'updateFoodCoords', payload: coords })
  }, [rows, cols, snakeCoords, dispatch])

  useEffect(() => {
    const speed = 500 - score * 20
    const timeout = setTimeout(() => moveSnakeByDirection(), speed)
    console.log(speed);
    return () => clearTimeout(timeout)
  }, [moveSnakeByDirection, snakeCoords, score])

  useEffect(() => {
    // Check if snake has found the food
    if (foodCoords.x === snakeCoords.x && foodCoords.y === snakeCoords.y) {
      dispatch({ type: 'incrementScore' })
      setFoodNewCoords()
    }
  }, [snakeCoords, foodCoords, dispatch, setFoodNewCoords])

  return <div className="Area">
    {Array.from(grid).map((row) => {
      const rowSet   = row[1]
      const rowIndex = row[0]

      return <div key={rowIndex} className="AreaRow">
        <div style={{ position:'fixed',top:15, left:15 }}>{score}</div>
        {Array.from(rowSet).map((_, nodeIndex) => {
          const { x, y } = snakeCoords

          if (nodeIndex === x && rowIndex === y) {
            return <AreaNode key={nodeIndex} isSnake index={nodeIndex} />
          }
          if (nodeIndex === foodCoords.x && rowIndex === foodCoords.y) {
            return <AreaNode key={nodeIndex} isFood index={nodeIndex} />
          }
          return <AreaNode key={nodeIndex} index={nodeIndex} />
        })}
      </div>
    })}
  </div>
}