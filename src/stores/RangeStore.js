import { observable, autorun } from 'mobx';

class RangeStore {
  @observable minStore
  @observable maxStore

  constructor(min, max) {
    this.minStore = min
    this.maxStore = max
    autorun(() => {
      this.minStore.max = this.maxStore.counter - 1
      this.maxStore.min = this.minStore.counter < 1 ? 1 : this.minStore.counter + 1
    });
  }

}

export default RangeStore