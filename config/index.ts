export const MIN_AMOUNT = 5.0
export const MAX_AMOUNT = 9999999.0
// Currency amount US & EU (cents optional) Can use US-style 123,456.78 notation and European-style 123.456,78 notation. Optional thousands separators; optional two-digit fraction
export const CURRENCY_FORMAT_REGEX = /^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/
export const CURRENCY = 'usd'