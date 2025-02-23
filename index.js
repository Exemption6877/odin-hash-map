class HashMap {
  constructor(load_factor, capacity) {
    load_factor = this.load_factor;
    capacity = this.capacity;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + (key.charCodeAt(i) % this.capacity);
    }

    return hashCode;
  }
}
