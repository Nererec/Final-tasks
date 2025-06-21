const getMonth = require('./getMonth');

describe('getMonth', () => {

  // Успешные тесты
  it('SC-1: should return "январь" for 1', () => {
    expect(getMonth(1)).toBe('январь');
  });

  it('SC-2: should return "февраль" for 2', () => {
    expect(getMonth(2)).toBe('февраль');
  });

  it('SC-3: should return "март" for 3', () => {
    expect(getMonth(3)).toBe('март');
  });

  it('SC-4: should return "апрель" for 4', () => {
    expect(getMonth(4)).toBe('апрель');
  });

  it('SC-5: should return "май" for 5', () => {
    expect(getMonth(5)).toBe('май');
  });

  it('SC-6: should return "июнь" for 6', () => {
    expect(getMonth(6)).toBe('июнь');
  });

  it('SC-7: should return "июль" for 7', () => {
    expect(getMonth(7)).toBe('июль');
  });

  it('SC-8: should return "август" for 8', () => {
    expect(getMonth(8)).toBe('август');
  });

  it('SC-9: should return "сентябрь" for 9', () => {
    expect(getMonth(9)).toBe('сентябрь');
  });

  it('SC-10: should return "октябрь" for 10', () => {
    expect(getMonth(10)).toBe('октябрь');
  });

  it('SC-11: should return "ноябрь" for 11', () => {
    expect(getMonth(11)).toBe('ноябрь');
  });

  it('SC-12: should return "декабрь" for 12', () => {
    expect(getMonth(12)).toBe('декабрь');
  });

  // Неуспешные тесты
  it('EC-1: should return null for 0', () => {
    expect(getMonth(0)).toBe(null);
  });

  it('EC-2: should return null for -1', () => {
    expect(getMonth(-1)).toBe(null);
  });

  it('EC-3: should return null for 13', () => {
    expect(getMonth(13)).toBe(null);
  });

  it('EC-4: should return null for 2.5', () => {
    expect(getMonth(2.5)).toBe(null);
  });

  it('EC-5: should return null for "hello"', () => {
    expect(getMonth("hello")).toBe(null);
  });

  it('EC-6: should return null for null', () => {
    expect(getMonth(null)).toBe(null);
  });

  it('EC-7: should return null for undefined', () => {
    expect(getMonth(undefined)).toBe(null);
  });

  it('EC-8: should return null for [1, 2, 3]', () => {
    expect(getMonth([1, 2, 3])).toBe(null);
  });

  it('EC-9: should return null for {}', () => {
    expect(getMonth({})).toBe(null);
  });

});

  // Корнер-кейсы
it('CC-1: should return null for 1.1', () => {
  expect(getMonth(1.1)).toBe(null);
});

it('CC-2: should return null for 11.9', () => {
  expect(getMonth(11.9)).toBe(null);
});

it('CC-3: should return null for "0"', () => {
  expect(getMonth("0")).toBe(null);
});

it('CC-4: should return null for "13"', () => {
  expect(getMonth("13")).toBe(null);
});

it('CC-5: should return null for false', () => {
  expect(getMonth(false)).toBe(null);
});