describe('toArray', () => {
    it('converts a simple cons to an array', () => {
        let arr = new Cons(1, new Cons(2, new Cons(3, new Cons(4, null))));
        let actual = Cons.toArray(arr);
        let expected = [1, 2, 3, 4];
        expect(actual).toEqual(expected);
    });

    it('converts undefined to an array', () => {
        let actual = Cons.toArray(undefined);
        let expected = [];
        expect(actual).toEqual(expected);
    });

    it('converts null to an array', () => {
        let actual = Cons.toArray(null);
        let expected = [];
        expect(actual).toEqual(expected);
    });
});

describe('fromArray', () => {
    it('converts an array to Cons', () => {
        let arr = [1, 2, 3, 4];
        let cons = Cons.fromArray(arr);
        let expected = new Cons(1, new Cons(2, new Cons(3, new Cons(4, null))));
        expect(cons).toEqual(expected);
    });

    it('converts undefined to null', () => {
        let cons = Cons.fromArray(undefined);
        let expected = null;
        expect(cons).toEqual(expected);
    });

    it('converts null to null', () => {
        let cons = Cons.fromArray(null);
        let expected = null;
        expect(cons).toEqual(expected);
    });

    it('converts empty array to null', () => {
        let cons = Cons.fromArray([]);
        let expected = null;
        expect(cons).toEqual(expected);
    });
});