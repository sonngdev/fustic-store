import { ensureCamel, ensureSnake, objectMap } from '../object';

describe('ensureCamel', () => {
  it('ignores non-object arguments', () => {
    expect(ensureCamel('string')).toBe('string');
    expect(ensureCamel(42)).toBe(42);
  });

  it('ingores null values', () => {
    expect(ensureCamel(null)).toBeNull();
  });

  it('ensures all object keys are in camelCase', () => {
    expect(ensureCamel({ foo_bar: 1 })).toEqual({ fooBar: 1 });
    expect(ensureCamel({ foo_bar: { baz_qux: 2 } })).toEqual({ fooBar: { bazQux: 2 } });
  });

  it('works on arrays', () => {
    expect(ensureCamel([1, 2, 3])).toEqual([1, 2, 3]);
    expect(ensureCamel([{ foo_bar: 1 }])).toEqual([{ fooBar: 1 }]);
    expect(ensureCamel([{ foo_bar: 1 }, { baz_qux: 2 }])).toEqual([{ fooBar: 1 }, { bazQux: 2 }]);
    expect(ensureCamel([{ foo_bar: { baz_qux: 2 } }])).toEqual([{ fooBar: { bazQux: 2 } }]);
  });
});

describe('ensureSnake', () => {
  it('ignores non-object arguments', () => {
    expect(ensureSnake('string')).toBe('string');
    expect(ensureSnake(42)).toBe(42);
  });

  it('ingores null values', () => {
    expect(ensureSnake(null)).toBeNull();
  });

  it('ensures all object keys are in snake_case', () => {
    expect(ensureSnake({ fooBar: 1 })).toEqual({ foo_bar: 1 });
    expect(ensureSnake({ fooBar: { bazQux: 2 } })).toEqual({ foo_bar: { baz_qux: 2 } });
  });

  it('works on arrays', () => {
    expect(ensureSnake([1, 2, 3])).toEqual([1, 2, 3]);
    expect(ensureSnake([{ fooBar: 1 }])).toEqual([{ foo_bar: 1 }]);
    expect(ensureSnake([{ fooBar: 1 }, { bazQux: 2 }])).toEqual([{ foo_bar: 1 }, { baz_qux: 2 }]);
    expect(ensureSnake([{ fooBar: { bazQux: 2 } }])).toEqual([{ foo_bar: { baz_qux: 2 } }]);
  });
});

describe('objectMap', () => {
  it('applies a function to every value', () => {
    expect(objectMap({ a: 1, b: 2 }, (num) => num * 2))
      .toEqual({ a: 2, b: 4 });
    expect(objectMap({ a: '{"foo":"bar"}', b: '{"baz":"qux"}' }, JSON.parse))
      .toEqual({ a: { foo: 'bar' }, b: { baz: 'qux' } });
  });

  it('passes object key as the second parameter', () => {
    expect(objectMap({ a: 1, b: 2 }, (num, key) => `${key}${num * 2}`))
      .toEqual({ a: 'a2', b: 'b4' });
  });

  it('is pure and does not mutate the original object', () => {
    const obj = { a: 1, b: 2 };
    objectMap(obj, (num) => num * 2);

    expect(obj).toEqual({ a: 1, b: 2 });
  });
});
