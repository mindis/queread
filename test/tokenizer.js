const assert = require('assert')
const tokenize = require('../src/tokenizer/tokenize.js')

function run() {
  let tokenMatchers = tokenize.defaultTokenMatchers()
  let tokens

  tokens = tokenize(' Sample WORDS  ', tokenMatchers)
  assert.equal(tokens.length, 2, 'Parse two words correctly')
  assert.equal(tokens[0].type, 'word', 'Read the first word')
  assert.equal(tokens[0].text, 'Sample', 'Read the first word text')
  assert.equal(tokens[0].tag, 'sample', 'Read the first word tag')
  assert.equal(tokens[0].data, undefined, 'The first word has no data')
  assert.equal(tokens[1].type, 'word', 'Read the second word')
  assert.equal(tokens[1].text, 'WORDS', 'Read the second word text')
  assert.equal(tokens[1].tag, 'words', 'Read the second word tag')
  assert.equal(tokens[1].data, undefined, 'The second word has no data')

  tokens = tokenize('22 000', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse space-separated integer')
  assert.equal(tokens[0].type, 'integer', 'Integer type')
  assert.equal(tokens[0].text, '22 000', 'Integer text')
  assert.equal(tokens[0].tag, 'integer', 'Integer tag')
  assert.equal(tokens[0].data, 22000, 'Integer data')

  tokens = tokenize('2nd', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse space-separated ordered integer')
  assert.equal(tokens[0].type, 'integer', 'Ordered integer type')
  assert.equal(tokens[0].text, '2nd', 'Ordered integer text')
  assert.equal(tokens[0].tag, 'integer', 'Ordered integer tag')
  assert.equal(tokens[0].data, 2, 'Ordered integer data')
  assert(tokens[0].data.ordered, 'Ordered integer data: ordered set')

  tokens = tokenize('fiftieth', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse space-separated "fiftieth"')
  assert.equal(tokens[0].type, 'integer', '"fiftieth" type')
  assert.equal(tokens[0].text, 'fiftieth', '"fiftieth" text')
  assert.equal(tokens[0].tag, 'integer', '"fiftieth" tag')
  assert.equal(tokens[0].data, 50, '"fiftieth" data')
  assert(tokens[0].data.ordered, '"fiftieth" data: ordered set')

  tokens = tokenize('thirteenth', tokenMatchers)
  assert.equal(tokens[0].data, 13, '"thirteenth" data')
  assert(tokens[0].data.ordered, '"thirteenth" data: ordered set')

  tokens = tokenize('twelfth', tokenMatchers)
  assert.equal(tokens[0].data, 12, '"twelfth" data')
  assert(tokens[0].data.ordered, '"twelfth" data: ordered set')

  tokens = tokenize('one million three hundred and thirty-seven thousand four hundred and twenty-seventh', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse space-separated long integer')
  assert.equal(tokens[0].type, 'integer', 'long integer type')
  assert.equal(tokens[0].text, 'fiftieth', 'long integer text')
  assert.equal(tokens[0].tag, 'integer', 'long integer tag')
  assert.equal(tokens[0].data, 1337427, 'long integer data')
  assert(tokens[0].data.ordered, 'long integer data: ordered set')

  tokens = tokenize('22, 000 .15', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse space-separated number')
  assert.equal(tokens[0].type, 'number', 'Number type')
  assert.equal(tokens[0].text, '22, 000 .15', 'Number text')
  assert.equal(tokens[0].tag, 'number', 'Number tag')
  assert.equal(tokens[0].data, 22000.15, 'Number data')

  tokens = tokenize('09:30', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse 09:30 time')
  assert.equal(tokens[0].type, 'time', '09:30 time type')
  assert.equal(tokens[0].text, '09:30', '09:30 time text')
  assert.equal(tokens[0].tag, 'time', '09:30 time tag')
  assert.equal(tokens[0].data.hour, 9, '09:30 time hour data')
  assert.equal(tokens[0].data.minute, 30, '09:30 time minute data')

  tokens = tokenize('5h 22', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse 5h 22 time')
  assert.equal(tokens[0].type, 'time', '5h 22 time type')
  assert.equal(tokens[0].text, '5h 22', '5h 22 time text')
  assert.equal(tokens[0].tag, 'time', '5h 22 time tag')
  assert.equal(tokens[0].data.hour, 5, '5h 22 time hour data')
  assert.equal(tokens[0].data.minute, 22, '5h 22 time minute data')

  tokens = tokenize('9pm', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse 9pm time')
  assert.equal(tokens[0].type, 'time', '9pm time type')
  assert.equal(tokens[0].text, '9pm', '9pm time text')
  assert.equal(tokens[0].tag, 'time', '9pm time tag')
  assert.equal(tokens[0].data.hour, 21, '9pm time hour data')
  assert.equal(tokens[0].data.minute, 0, '9pm time minute data')

  tokens = tokenize('at 4', tokenMatchers)
  assert.equal(tokens.length, 2, 'Parse "at 4" time')
  assert.equal(tokens[1].type, 'time', '4 time type')
  assert.equal(tokens[1].text, '4', '4 time text')
  assert.equal(tokens[1].tag, 'time', '4 time tag')
  assert.equal(tokens[1].data.hour, 16, '4 time hour data')
  assert.equal(tokens[1].data.minute, 0, '4 time minute data')

  tokens = tokenize('9/11', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse 9/11 time')
  assert.equal(tokens[0].type, 'time', '9/11 time type')
  assert.equal(tokens[0].text, '9/11', '9/11 time text')
  assert.equal(tokens[0].tag, 'time', '9/11 time tag')
  assert.equal(tokens[0].data.month, 9, '9/11 time minute data')
  assert.equal(tokens[0].data.day, 11, '9/11 time hour data')

  tokens = tokenize('9/11/2001', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse 9/11/2001 time')
  assert.equal(tokens[0].type, 'time', '9/11/2001 time type')
  assert.equal(tokens[0].text, '9/11/2001', '9/11/2001 time text')
  assert.equal(tokens[0].tag, 'time', '9/11/2001 time tag')
  assert.equal(tokens[0].data.year, 2001, '9/11/2001 time year data')
  assert.equal(tokens[0].data.month, 9, '9/11/2001 time minute data')
  assert.equal(tokens[0].data.day, 11, '9/11/2001 time hour data')

  tokens = tokenize('11/9/2001', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse 11/9/2001 time')
  assert.equal(tokens[0].type, 'time', '11/9/2001 time type')
  assert.equal(tokens[0].text, '11/9/2001', '9/11 time text')
  assert.equal(tokens[0].tag, 'time', '11/9/2001 time tag')
  assert.equal(tokens[0].data.year, 2001, '11/9/2001 time year data')
  assert.equal(tokens[0].data.month, 9, '11/9/2001 time minute data')
  assert.equal(tokens[0].data.day, 11, '11/9/2001 time hour data')

  tokens = tokenize('october', tokenMatchers)
  assert.equal(tokens.length, 1, 'Parse october time')
  assert.equal(tokens[0].type, 'time', 'october time type')
  assert.equal(tokens[0].text, 'october', 'october time text')
  assert.equal(tokens[0].tag, 'time', 'october time tag')
  assert.equal(tokens[0].data.month, 10, 'october time month data')
}

exports.run = run