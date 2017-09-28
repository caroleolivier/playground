function Cons(head, tail) {
    this.head = head;
    this.tail = tail;
}

function toArray(cons) {
    if(cons) {
        let arr = [];
        return arr.concat(cons.head, toArray(cons.tail));
    }
    return [];
}

function fromArray(arr) {
    if(arr == undefined || arr == null || arr.length < 1) {
        return null;
    }
    let cons = new Cons(arr[arr.length-1], null);
    for(let i = arr.length-2; i >= 0; i--) {
        cons = new Cons(arr[i], cons);
    }
    return cons;
}

Cons.toArray = toArray;
Cons.fromArray = fromArray;
