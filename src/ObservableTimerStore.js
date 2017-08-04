import React, { Component } from 'react';
import { extendObservable, autorun, computed,  observable } from 'mobx'
import { observer } from 'mobx-react'

const minToSec = (min) => min * 60

class ObservableTimerStore {
  constructor () {
    extendObservable(this, {
      enabled: false,
      hasBeenStarted: false,
      breakCount: 0,
      direction: 'down',
      workPeriod: minToSec(1),
      timer: minToSec(1)
    })
  }

  resetTimer = () => {
    this.timer = this.workPeriod
    this.hasBeenStarted = false
    this.enabled = false
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

  disableTimer = () => {
    this.enabled = false 
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
    if (this.timer === 0) {
      this.disableTimer()
      this.resetTimer()
    }
  })
  
}

export default ObservableTimerStore

