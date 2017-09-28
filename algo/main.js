function Cons(head, tail) {
    this.head = head;
    this.tail = tail;
}

Cons.toArray = toArray;

function toArray(cons) {
    debugger;
    if(cons) {
        let arr = [];
        return arr.concat(cons.head, toArray(cons.tail));
    }
    return [];
}
