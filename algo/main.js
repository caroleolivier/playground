function Cons(head, tail) {
    this.head = head;
    this.tail = tail;
}

function toArray(cons) {
    if(cons) {
        let tail = (cons.tail == null  || cons.tail == undefined) ?
                    [] : toArray(cons.tail);
        return [cons.head].concat(tail);
    }
    return null;
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

function filter(cons, predicate) {
    if(cons == null || undefined) {
        return null;
    } 
    else if(predicate(cons.head)) {
        return new Cons(cons.head, filter(cons.tail, predicate));
    }
    else {
        return filter(cons.tail, predicate);
    }

}

Cons.toArray = toArray;
Cons.fromArray = fromArray;
Cons.filter = filter;
