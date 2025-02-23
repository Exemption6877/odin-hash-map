class HashMap {
  constructor(load_factor, capacity) {
    this.load_factor = load_factor;
    this.capacity = capacity;
    this.buckets = new Array(capacity);
  }

  logBuckets() {
    console.log(this.buckets);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
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
}

const testMap = new HashMap();
testMap.set("banana", "yellow");
testMap.set("apple", "red");
console.log(testMap.get("banana"));
