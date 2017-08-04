import { extendObservable, autorun } from 'mobx'

const minToSec = (min) => min * 60

class ObservableTimerStore {
  constructor () {
    extendObservable(this, {
      enabled: false,
      hasBeenStarted: false,
      breakCount: 0,
      direction: 'down',
      workPeriod: minToSec(25),
      timer: minToSec(25)
    })
  }

  setMinutes = (min) => {
    this.workPeriod = min ? minToSec(min) : minToSec(25)
    this.timer = this.workPeriod
  }

  resetTimer = () => {
    this.enabled = false
    this.hasBeenStarted = false
    this.timer = this.workPeriod
    this.direction = 'down'
  }

  toggleTimer = () => {
    if (!this.enabled) {
      this.enabled = true
      this.hasBeenStarted = true
      this.decideDirection()
    } else {
      if (this.direction === 'down') {
        this.direction = 'up'
      } else {
        this.direction = 'down'
      }
    }
  }

  decideDirection = () => {
    if (this.direction === 'down') {
      this.subtractTime()
    } else if (this.direction === 'up') {
      this.addTime()
    }
  }

  subtractTime = () => {
    if (this.enabled) {
      this.timer -= 1
    }
  }

  addTime = () => {
    this.timer += 1
  }

  timeCheck = () => autorun(() => {
    if (this.timer === 0 || this.timer > this.workPeriod) {
      this.resetTimer()
    }
  })
}

export default ObservableTimerStore

