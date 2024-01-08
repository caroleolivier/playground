"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = require("../src/add");
describe('add', () => {
    test('given 1 and 2 returns 3', () => {
        expect((0, add_1.add)(1, 2)).toBe(3);
    });
});
