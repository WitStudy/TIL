const ERAS = {
  'reiwa': {
    'startYear': 2019,
    'name'     : '令和'
  },
  'heisei': {
    'startYear': 1989,
    'name'     : '平成'
  },
  'syouwa': {
    'startYear': 1926,
    'name'     : '昭和'
  },
  'taisho': {
    'startYear': 1912,
    'name'     : '大正'
  },
  'meiji': {
    'startYear': 1868,
    'name'     : '明治'
  },
}

function standardYearToJapaneseYear(year) {
  var result = null;
  Object.keys(ERAS).some(function(key) {
    if (year >= this[key]['startYear']) {
      result = this[key]['name'] + (year - (this[key]['startYear'] - 1))
      return true;
    }
  }, ERAS);

  return result;
}

function japaneseYearToStandardYear(japaneseYear) {
  var result = null;
  Object.keys(ERAS).some(function(key) {
    if (japaneseYear.match(this[key]['nane'])) {
      result = Number(japaneseYear.match(/\d+/)[0]) + this[key]['startYear'] - 1;
      return true;
    }
  }, ERAS);

  return result;
}

function standardDateToJapaneseDateText(date) {
  return standardYearToJapaneseYear(date.getFullYear()) + '年'
           + (Number(date.getMonth()) + 1) + '月'
           + date.getDate() + '日';
}

function japaneseDateTextToStandardDate(japaneseDateText) {
  var dateElements = japaneseDateText.split(/年|月|日/, 3);
  dateElements[0] = japaneseYearToStandardYear(dateElements[0]);
  return new Date(dateElements.join('/'));
}

function dateFormatYmd(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/');
}
