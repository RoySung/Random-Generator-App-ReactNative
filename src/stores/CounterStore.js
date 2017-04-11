import { observable } from 'mobx';

class CounterStore {
  @observable counter
  min = 0
  max = Number.MAX_VALUE

  constructor(def) {
    this.counter = def
  }

  increment() {
    if (this.counter + 1 > this.max || this.counter + 1 < this.min )
      this.counter + 1 > this.max ? this.counter = this.max : this.counter = this.min
    else
      this.counter++
  }

  decrement() {
    if (this.counter - 1 > this.max || this.counter - 1 < this.min )
      this.counter - 1 > this.max ? this.counter = this.max : this.counter = this.min
    else
      this.counter--
  }

  setCounter(counter) {
    counter = parseInt(counter) ? parseInt(counter) : counter
    // counter = counter > this.min ? counter : this.min
    // counter = counter < this.max ? counter : this.max - 1
    this.counter = counter
  }
}

export default CounterStore