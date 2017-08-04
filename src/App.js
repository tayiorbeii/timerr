import React, { Component } from 'react';
import { autorun, observable } from 'mobx'
import { observer } from 'mobx-react'
import ReactInterval from 'react-interval'
import convert from 'convert-seconds'
import Devtools from 'mobx-react-devtools'

const Button = ({label, handler}) => {
  return (
    <a className='pointer ma1 w4 f5 no-underline light-gray bg-animate hover-bg-mid-gray hover-light-gray flex justify-center items-center pa3 ba border-box'
      onClick={handler}
    >
      {label} 
    </a>
  )
}

const App = observer(class App extends Component {
  componentWillMount () {
    this.props.store.timeCheck()
  }

  render () {
    const { addTime, decideDirection, hasBeenStarted, resetTimer, toggleTimer, timer, enabled, breakCount, direction } = this.props.store
    
    const goLabel = !enabled ? 'Start' : direction === 'down' ? 'Break' : 'Resume' 

    return (
      <div className='flex flex-column items-center content-center vh-100 bg-dark-gray'>
        <ReactInterval {...{timer, enabled}} callback={() => decideDirection()} />

        <div className='mt4 f1 moon-gray'>
          {`${convert(timer).minutes}:${convert(timer).seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`}
        </div>
      
        <div className='ma4 flex justify-between'>
         <Button label={goLabel} handler={() => toggleTimer()} />
         <Button label='Reset' handler={() => resetTimer()} />
        </div>
      </div>
    )
  }
})

export default App;
