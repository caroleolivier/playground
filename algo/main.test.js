describe('toArray', () => {
    it('converts a simple cons to an array', () => {
        let arr = new Cons(1, new Cons(2, new Cons(3, new Cons(4, null))));
        let actual = Cons.toArray(arr);
        let expected = [1, 2, 3, 4];
        expect(actual).toEqual(expected);
    });

    it('converts undefined cons to an array', () => {
        let actual = Cons.toArray(undefined);
        let expected = [];
        expect(actual).toEqual(expected);
    });

    it('converts null cons to an array', () => {
        let actual = Cons.toArray(null);
        let expected = [];
        expect(actual).toEqual(expected);
    });
});