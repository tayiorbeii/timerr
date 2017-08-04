import React, { Component } from 'react';
import { observer } from 'mobx-react'
import ReactInterval from 'react-interval'
import convert from 'convert-seconds'
import Sound from 'react-sound'

const Button = ({label, handler}) => {
  return (
    <a className='pointer sans-serif ma1 w4 f5 no-underline light-gray bg-animate hover-bg-mid-gray hover-light-gray flex justify-center items-center pa3 ba border-box fw2 tracked'
      onClick={handler}
    >
      {label} 
    </a>
  )
}

const Input = ({...props}) => {
  return (
      <input className='input-reset tc pa2 ba f3 ma1 mid-gray bg-dark-gray db w3 fw2 tracked' {...props} />
  )
}

const App = observer(class App extends Component {
  componentWillMount () {
    this.props.store.timeCheck()
  }

  decFormat = (time) => (time.toLocaleString('en-US', {minimumIntegerDigits: 2}))

  render () {
    const { mode, decideDirection, setMinutes, setBreakMinutes, resetTimer, toggleTimer, timer, enabled, direction } = this.props.store
    
    const goLabel = !enabled ? 'Start' : direction === 'down' ? 'Distracted?' : 'Resume' 
    const ct = convert(timer)
    const timeDisplay = `${ct.hours ? this.decFormat(ct.hours) + ':' : ''}${this.decFormat(ct.minutes)}:${this.decFormat(ct.seconds)}`
    document.title = timeDisplay

    return (
      <div className='flex flex-column items-center content-center vh-100 bg-dark-gray'>
        <ReactInterval {...{timer, enabled}} callback={() => decideDirection()} />

        <div className='mt4 mb2 f3 gray sans-serif fw2 tracked'>
          {mode}
        </div>

        <div className='f1 moon-gray sans-serif fw2 tracked' style={{fontSize: '6rem'}}>
          {timeDisplay}
        </div>
      
        <div className='ma4 flex justify-between'>
         <Button label={goLabel} handler={() => toggleTimer()} />
         <Button label='Reset' handler={() => resetTimer()} />
        </div>

        <div className='ma4 w-100 flex justify-center items-center'>
          <span className='light-gray sans-serif f5 mr1 fw2 tracked'>work for </span>
          <Input type='number' min='1' placeholder='25' onChange={(event) => setMinutes(event.target.value)}/>
          <span className='light-gray sans-serif f5 mh1 fw2 tracked'>minutes, break for </span>
          <Input type='number' min='1' placeholder='5' onChange={(event) => setBreakMinutes(event.target.value)}/>
          <span className='light-gray sans-serif f5 ml1 fw2 tracked'>minutes.</span>
        </div>

        {timer < 5 && <Sound url='drum.mp3' playStatus={Sound.status.PLAYING} />}
      </div>
    )
  }
})

export default App;
