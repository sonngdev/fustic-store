import { formatPriceVnd, snakeToCamel, camelToSnake } from '../string';

describe('formatPriceVnd', () => {
  it('throws if argument is not of type number', () => {
    expect(() => formatPriceVnd('string')).toThrow(TypeError);
    expect(() => formatPriceVnd(true)).toThrow(TypeError);
  });

  it('stylizes VND price to correct format', () => {
    expect(formatPriceVnd(420000)).toBe('420K');
    expect(formatPriceVnd(690000)).toBe('690K');
  });
});

describe('snakeToCamel', () => {
  it('throws if argument is not of type string', () => {
    expect(() => snakeToCamel(42)).toThrow(TypeError);
    expect(() => snakeToCamel(true)).toThrow(TypeError);
  });

  it('converts a snake_case string to camelCase', () => {
    expect(snakeToCamel('foo_bar')).toBe('fooBar');
    expect(snakeToCamel('foo_bar_baz')).toBe('fooBarBaz');
  });

  it('ignores strings not in snake_case', () => {
    expect(snakeToCamel('')).toBe('');
    expect(snakeToCamel('foo')).toBe('foo');
    expect(snakeToCamel('fooBar')).toBe('fooBar');
    expect(snakeToCamel('FooBar')).toBe('FooBar');
    expect(snakeToCamel('Foo_Bar')).toBe('Foo_Bar');
    expect(snakeToCamel('FOO_BAR')).toBe('FOO_BAR');
  });

  it('converts strings that begins with _', () => {
    expect(snakeToCamel('_foo')).toBe('Foo');
    expect(snakeToCamel('_foo_bar')).toBe('FooBar');
    expect(snakeToCamel('_fooBar')).toBe('FooBar');
  });
});

describe('camelToSnake', () => {
  it('throws if argument is not of type string', () => {
    expect(() => camelToSnake(42)).toThrow(TypeError);
    expect(() => camelToSnake(true)).toThrow(TypeError);
  });

  it('converts a camelCase string to snake_case', () => {
    expect(camelToSnake('fooBar')).toBe('foo_bar');
    expect(camelToSnake('fooBarBaz')).toBe('foo_bar_baz');
  });

  it('ignores strings not in camelCase', () => {
    expect(camelToSnake('')).toBe('');
    expect(camelToSnake('foobar')).toBe('foobar');
    expect(camelToSnake('foo_bar')).toBe('foo_bar');
    expect(camelToSnake('_foo_bar')).toBe('_foo_bar');
  });

  it('converts strings that begins with uppercase letter', () => {
  });

  it('converts uppercase letter regardless of the proceeding character', () => {
    expect(camelToSnake('FooBar')).toBe('_foo_bar');
    expect(camelToSnake('foo_Bar')).toBe('foo__bar');
    expect(camelToSnake('Foo')).toBe('_foo');
  });
});
