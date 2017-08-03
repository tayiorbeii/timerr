import React, { Component } from 'react';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import logo from './logo.svg';

const minToSec = (min) => min * 60

const timerState = observable({
  timer: 10
})

const App = observer(class App extends Component {
  constructor (props) {
    super(props)
        
  }

  startTimer = () => {
    
  }

  render () {
  
    return (
      <div className='ma4'>
        {timerState.timer}
      </div>
    )
  }
})

export default App;
