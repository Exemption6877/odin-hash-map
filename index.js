class HashMap {
  constructor(load_factor = 0.4, capacity = 16) {
    this.load_factor = load_factor;
    this.capacity = capacity;
    this.buckets = new Array(capacity);
  }

  logBuckets() {
    console.log(this.buckets);
  }

  resize() {
    const newCapacity = this.capacity * 2;
    const newBuckets = new Array(newCapacity);

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          const key = this.buckets[i][j][0];
          const value = this.buckets[i][j][1];
          const index = this.hash(key, newCapacity);
          if (!newBuckets[index]) {
            newBuckets[index] = [];
          }
          newBuckets[index].push([key, value]);
        }
      }
    }

    this.buckets = newBuckets;
    this.capacity = newCapacity;
  }

  hash(key, capacity = this.capacity) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return Math.abs(hashCode) % capacity;
  }

  set(key, value) {
    const index = this.hash(key);

    if (this.buckets[index] === undefined || this.buckets[index] === null) {
      const newBucket = new Array();
      newBucket.push([key, value]);
      this.buckets[index] = newBucket;
    } else {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          this.buckets[index][i][1] = value;
          return;
        }
      }
      this.buckets[index].push([key, value]);
    }

    if (this.length() > this.capacity * this.load_factor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        return this.buckets[index][i][1];
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index].splice(i, 1);
        return true;
      }
    }

    return false;
  }

  length() {
    const buckets = this.buckets;
    let counter = 0;
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        buckets[i].forEach((element) => {
          counter += 1;
        });
      }
    }
    return counter;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = [];
    }
    this.buckets = [];
  }

  keys() {
    const keyArray = [];
    this.buckets.forEach((element) => {
      keyArray.push(element[0]);
    });
    return keyArray;
  }

  values() {
    const valuesArray = [];
    this.buckets.forEach((element) => {
      valuesArray.push(element[0][1]);
    });
    return valuesArray;
  }

  entries() {
    const returnArray = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((element) => {
        returnArray.push([element[0], element[1]]);
      });
    });

    return returnArray;
  }
}

// const testMap = new HashMap();
// testMap.set("banana", "yellow");
// testMap.set("apple", "red");
// testMap.set("road", "black");
// console.log(testMap.entries());

export default HashMap;
