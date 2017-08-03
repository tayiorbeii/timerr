import React, { Component } from 'react';
import { autorun, observable } from 'mobx'
import { observer } from 'mobx-react'
import ReactInterval from 'react-interval'
import convert from 'convert-seconds'
import Devtools from 'mobx-react-devtools'

const App = observer(class App extends Component {
  render () {
    const { addTime, toggleTimer, timer, enabled, breakCount } = this.props.store

    return (
      <div>
        <ReactInterval {...{timer, enabled}}
          callback={() => addTime()}
        />

        <div className='ma4'>
          {`${convert(timer).minutes}:${convert(timer).seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`}
        </div>
      
        <div className='ma4'>
          <button
            onClick={() => toggleTimer()}
          >
            {!enabled && breakCount === 0 ? 'Start' : 'Pause'}
          </button>
        </div>
      </div>
    )
  }
})

export default App;
