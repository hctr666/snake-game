import React from 'react'
import './AreaNode.scss'

export default function AreaNode({ index, isSnake, isFood }) {
  return <div
    className={`AreaNode${isSnake ? ' AreaNode_Snake' : isFood ? ' AreaNode_Food' : ''}`}>
  </div>
}