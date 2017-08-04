import React, { Component } from 'react';
import { autorun, observable } from 'mobx'
import { observer } from 'mobx-react'
import ReactInterval from 'react-interval'
import convert from 'convert-seconds'
import Devtools from 'mobx-react-devtools'

const App = observer(class App extends Component {
  componentWillMount () {
    this.props.store.timeCheck()
  }

  render () {
    const { addTime, decideDirection, hasBeenStarted, resetTimer, toggleTimer, timer, enabled, breakCount } = this.props.store


    return (
      <div className='flex items-center content-center vh-100 bg-dark-green'>
        <ReactInterval {...{timer, enabled}} callback={() => decideDirection()} />

        <div className='ma4'>
          {`${convert(timer).minutes}:${convert(timer).seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`}
        </div>
      
        <div className='ma4'>
          <button onClick={() => toggleTimer()}>
            {!enabled ? 'Start' : 'Pause'}
          </button>
         <button onClick={() => resetTimer()}>
           Reset
         </button> 
        </div>
      </div>
    )
  }
})

export default App;
