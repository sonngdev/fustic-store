import { ensureCamel } from '../object';

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
