import React, { useReducer } from 'react';
import Area from './Area'
import { reducer, initialState } from './store'
import './App.scss'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <Area {...{ ...state, dispatch } } />
    </div>
  );
}

export default App;
