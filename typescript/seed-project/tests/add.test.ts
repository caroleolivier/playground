import { add } from '../src/add';

describe('add', () => {
  test('given 1 and 2 returns 3', () => {
    expect(add(1, 2)).toBe(3);
  });
});