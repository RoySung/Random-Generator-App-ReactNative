import { observable, action } from 'mobx';

class CustomItemsStore {
  @observable items
  constructor(items) {
      this.items = items
    }

  @action
  newItem() {
      let items = this.items.slice()
      items.push(`default${this.items.length}`)
      this.items.replace(items)
    }

  @action
  setItem(index, text) {
      this.items[index] = text
    }

  @action
  removeItem(index) {
      this.items.splice(index, 1)
    }

}

export default CustomItemsStore
