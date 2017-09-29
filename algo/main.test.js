describe('toArray', () => {
    it('converts a simple cons to an array', () => {
        let input = new Cons(1, new Cons(2, new Cons(3, new Cons(4, null))));
        let expected = [1, 2, 3, 4];
        testToArray(input, expected);
    });

    it('converts undefined to null', () => {
        let input = undefined;
        let expected = null;
        testToArray(input, expected);
    });

    it('converts null to null', () => {
        let input = null;
        let expected = null;
        testToArray(input, expected);
    });

    function testToArray(input, expected) {
        let actual = Cons.toArray(input);
        expect(actual).toEqual(expected);
    }
});

describe('fromArray', () => {
    it('converts an array to Cons', () => {
        let input = [1,2 , 3, 4];
        let expected = new Cons(1, new Cons(2, new Cons(3, new Cons(4, null))));
        testFromArray(input, expected);
    });

    it('converts undefined to null', () => {
        let input = undefined;
        let expected = null;
        testFromArray(input, expected);
    });

    it('converts null to null', () => {
        let input = null;
        let expected = null;
        testFromArray(input, expected);
    });

    it('converts empty array to null', () => {
        let input = [];
        let expected = null;
        testFromArray(input, expected);
    });

    function testFromArray(input, expected) {
        let actual = Cons.fromArray(input);
        expect(actual).toEqual(expected);
    }
});

describe('filter', () => {
    it('returns cons with filtered elements', () => {
        let input = new Cons(1, new Cons(2, new Cons(3, new Cons(4, null))));
        let predicate = elt => elt % 2 == 0;
        let expected = new Cons(2, new Cons(4, null));

        testFilter(input, predicate, expected);
    });

    it('returns null if no element is filtered in', () => {
        let input = new Cons(1, new Cons(3, new Cons(5, new Cons(7, null))));
        let predicate = elt => elt % 2 == 0;
        let expected = null;

        testFilter(input, predicate, expected);
    });

    function testFilter(input, predicate, expected) {
        let actual = Cons.filter(input, predicate);
        expect(actual).toEqual(expected);
    }
});