/**
 * This is a valid list of IBANs taken from https://www.iban.com/structure
 * The tests for IBAN structure validation SHOULD pass for EVERY item in the valid_ibans array
 */
const _valid_ibans = [
  { 'country': 'Albania', 'iban': 'AL35202111090000000001234567' },
  { 'country': 'Andorra', 'iban': 'AD1400080001001234567890' },       
  { 'country': 'Austria', 'iban': 'AT483200000012345864' },
  { 'country': 'Azerbaijan', 'iban': 'AZ77VTBA00000000001234567890' },
  { 'country': 'Bahrain', 'iban': 'BH02CITI00001077181611' },
  { 'country': 'Belaraus', 'iban': 'BY86AKBB10100000002966000000' },
  { 'country': 'Belgium', 'iban': 'BE71096123456769' },
  { 'country': 'Bosnia & Herzegovina', 'iban': 'BA393385804800211234' },
  { 'country': 'Brazil', 'iban': 'BR1500000000000010932840814P2' },
  { 'country': 'Bulgaria', 'iban': 'BG18RZBB91550123456789' },
  { 'country': 'Costa Rica', 'iban': 'CR23015108410026012345' },
  { 'country': 'Croatia', 'iban': 'HR1723600001101234565' },
  { 'country': 'Cyprus', 'iban': 'CY21002001950000357001234567' },
  { 'country': 'Czech Republic', 'iban': 'CZ5508000000001234567899' },
  { 'country': 'Denmark', 'iban': 'DK9520000123456789' }
  /**
   * Add IBANS to any future countries that need to be supported to the list above
   */
]

// Override the toString method on each object so that when the fixture is 'stringified', it only prints the country name
export const valid_ibans = _valid_ibans.map(iban => ({ ...iban, toString: () => iban.country }))