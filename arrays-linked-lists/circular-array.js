class CircularArray {
    constructor(arr = []) {
        this.arr = arr;
        this.head = 0;
    }

    //adds an item to the "end" of the array
    addItem(item) {
        if(this.head === 0) { //short circuit if the head hasn't been rotated
            this.arr.push(item);
        } else {
            //otherwise splice the item into the array right "before" the head
            this.arr.splice(this.head -1, 0, item)
        }
    }

    //rotates the array num times
    rotate(num) {
        let newHead = this.head + num; //new head index
        while (newHead < 0) { //if the new head is negative, take it away from the length until it isn't
            newHead = this.arr.length + newHead;
        }
        this.head = newHead % this.arr.length; //if it is greater than the length, modulo will cycle it to it's intended index
    }

    //gets an item by its rotated index
    getByIndex(idx) {
        if(idx < 0 || idx >= this.arr.length){
            //returns null for negative and out of bounds index
            return null;
        }
        return this.arr[(this.head + idx) % this.arr.length]
    }
}