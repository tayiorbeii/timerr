import React, { Component } from 'react';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import ReactInterval from 'react-interval'
import convert from 'convert-seconds'
import Devtools from 'mobx-react-devtools'


const minToSec = (min) => min * 60

const timerState = observable({
  workPeriod: minToSec(1),
  timer: 0,
  pausePeriod: 0,
  breakCount: 0,
  enabled: false
})

const App = observer(class App extends Component {
  componentWillMount () {
    timerState.timer = timerState.workPeriod
  }

  toggleEnabled = () => {
    timerState.enabled = !timerState.enabled 
  }

  render () {
    
    const { timer, breakCount, workPeriod, pausePeriod, enabled } = timerState

    return (
      <div>
        <ReactInterval {...{timer, enabled}}
          callback={() => timerState.timer -= 1}
        />

        <div className='ma4'>
          {`${convert(timer).minutes}:${convert(timer).seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`}
        </div>
      
        <div className=''>
          <button
            onClick={() => this.toggleEnabled()}
          >
            {!enabled && breakCount === 0 ? 'Start' : 'Pause'}
          </button>
        </div>
      </div>
    )
  }
})

export default App;
