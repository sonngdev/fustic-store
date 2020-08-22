import { ensureCamel, ensureSnake } from '../object';

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
