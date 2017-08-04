import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ObservableTimerStore from './ObservableTimerStore'

const timerStore = new ObservableTimerStore()

ReactDOM.render(<App store={timerStore} />, document.getElementById('root'));
registerServiceWorker();
