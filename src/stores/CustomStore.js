import { LocalStorge } from 'RandomGeneratorApp/src/lib';

class CustomStore {
  constructor(id, title, items) {
    this.id = id
    this.title = title
    this.items = items
    this.localStorage = new LocalStorge(`${this.id}`)
  }

  save() {
    const { id, title, items } = this
    const value = {
      id,
      title,
      items
    }
    return this.localStorage.save(value)
  }

  remove() {
    return this.localStorage.remove()
  }

}

export default CustomStore