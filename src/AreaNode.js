import React, { memo } from 'react'
import './AreaNode.scss'

function AreaNode({ isSnake, isFood, index }) {
  return <div
    className={`AreaNode${isSnake ? ' AreaNode_Snake' : isFood ? ' AreaNode_Food' : ''}`}>
      {index}
  </div>
}

export default memo(AreaNode)