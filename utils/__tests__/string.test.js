import {
  formatPriceVnd,
  snakeToCamel,
  camelToSnake,
  capitalCase,
  titleCase,
} from '../string';

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

describe('capitalCase', () => {
  it('throws if argument is not of type string', () => {
    expect(() => camelToSnake(42)).toThrow(TypeError);
    expect(() => camelToSnake(true)).toThrow(TypeError);
  });

  it('converts first letter to uppercase and the rest to lowercase', () => {
    expect(capitalCase('foobar')).toBe('Foobar');
    expect(capitalCase('FOOBAR')).toBe('Foobar');
    expect(capitalCase('FOO_BAR')).toBe('Foo_bar');
  });

  it('behaves the same way for multi-words strings', () => {
    expect(capitalCase('foobar baz')).toBe('Foobar baz');
    expect(capitalCase('FOOBAR BAZ')).toBe('Foobar baz');
    expect(capitalCase('FOOBAR BAZ_QUX')).toBe('Foobar baz_qux');
  });
});

describe('titleCase', () => {
  it('throws if argument is not of type string', () => {
    expect(() => camelToSnake(42)).toThrow(TypeError);
    expect(() => camelToSnake(true)).toThrow(TypeError);
  });

  it('capitalizes the first letter of every word', () => {
    expect(titleCase('foo')).toBe('Foo');
    expect(titleCase('foo bar')).toBe('Foo Bar');
    expect(titleCase('fOo baR')).toBe('Foo Bar');
  });

  it('trims all excessive whitespace', () => {
    expect(titleCase(' foo  ')).toBe('Foo');
    expect(titleCase('\t foo bar \n\t baz_QUX')).toBe('Foo Bar Baz_qux');
  });
});
