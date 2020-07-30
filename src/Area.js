import React, { useEffect, useCallback, useState } from 'react'
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

  const moveSnakeByDirection = useCallback(() => {
    dispatch({ type: snakeActionType[snakeDirection] })
  }, [dispatch, snakeDirection])

  const setFoodNewCoords = (x, y) => {
    const coords = { x: parseInt(Math.random() * rows), y: parseInt(Math.random() * cols) }
    // Try again if food position matches the snake one
    if (x === snakeCoords.x && y === snakeCoords.y) {
      setFoodNewCoords(coords.x, coords.y)
    }
    dispatch({ type: 'updateFoodCoords', payload: coords })
  }

  useEffect(() => {
    const timeout = setTimeout(() => moveSnakeByDirection(), 200)
    return () => clearTimeout(timeout)
  }, [moveSnakeByDirection, snakeCoords])

  useEffect(() => {
    if (foodCoords.x === snakeCoords.x && foodCoords.y === snakeCoords.y) {
      dispatch({ type: 'incrementScore' })
      setFoodNewCoords()
    }
  }, [snakeCoords, foodCoords, dispatch])

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