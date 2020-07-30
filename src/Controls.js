import React from 'react'
import './Controls.scss'

export default function Controls({ dispatch }) {
  const handleClickUp = () => {
    dispatch({ type: 'changeSnakeDirection', payload: 'UP' })
  }

  const handleClickDown = () => {
    dispatch({ type: 'changeSnakeDirection', payload: 'DOWN' })
  }

  const handleClickLeft = () => {
    dispatch({ type: 'changeSnakeDirection', payload: 'LEFT' })
  }

  const handleClickRight = () => {
    dispatch({ type: 'changeSnakeDirection', payload: 'RIGHT' })
  }

  return <div className="Controls">
    <button className="Controls__Button up" onClick={handleClickUp}><span>Up</span></button>
    <button className="Controls__Button right" onClick={handleClickRight}><span>Right</span></button>
    <button className="Controls__Button left" onClick={handleClickLeft}><span>Left</span></button>
    <button className="Controls__Button down" onClick={handleClickDown}><span>Down</span></button>
  </div>
}