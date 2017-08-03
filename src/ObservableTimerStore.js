import React, { Component } from 'react';
import { extendObservable, autorun, computed,  observable } from 'mobx'
import { observer } from 'mobx-react'

const minToSec = (min) => min * 60

class ObservableTimerStore {
  constructor () {
    extendObservable(this, {
      enabled: false,
      breakCount: 0,
      workPeriod: minToSec(1),
      timer: minToSec(1)
    })
  }

  resetTimer = () => {
    this.timer = this.workPeriod
  }

  toggleTimer = () => {
    this.enabled = !this.enabled 
  }

  disableTimer = () => {
    this.enabled = false 
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

