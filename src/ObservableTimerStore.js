import React, { Component } from 'react';
import { extendObservable, autorun, computed,  observable } from 'mobx'
import { observer } from 'mobx-react'

const minToSec = (min) => min * 60

class ObservableTimerStore {
  constructor () {
    extendObservable(this, {
      enabled: false,
      timer: 0,
      breakCount: 0,
      workPeriod: minToSec(1)
    })
  }

  toggleTimer = () => {
    this.enabled = !this.enabled 
  }

  subtractTime = () => {
    this.timer -= 1
  }

  addTime = () => {
    this.timer += 1
  }
  
}

export default ObservableTimerStore

