import { validate_iban } from '../index'
import { valid_ibans } from './iban-fixtures'

describe('validate_iban', () => {
  describe('when an IBAN with a valid structure is presented', () => {
    test.each(valid_ibans)('it should successfully validate the IBAN for %s', ({ iban }) => {
      const result = validate_iban(iban)
      expect(result).toBe(true)
    })
  })

  describe('given an IBAN with an invalid structure is presented', () => {
    describe('and when the country code is invalid', () => {
      it('should throw an error', () => {
        const invalid_iban = 'NY35202111090000000001234567' // NY Country Code doesn't exist
        expect(() => validate_iban(invalid_iban)).toThrow('IBAN Validation Failed - Country Code NY is not valid')
      })
    })

    describe('and when the country code is valid but the length does not match', () => {
      it('should throw an error', () => {
        const invalid_iban = 'AL352021110'  // AL Country Code exists but IBAN length is expected to be 28. This IBAN only contains 11.
        expect(() => validate_iban(invalid_iban)).toThrow('IBAN Validation Failed - IBAN length of 11 does not match iban length for country AL - 28')
      })
    })

    describe('and when the country code and length are valid but the check is invalid', () => {
      it('should throw an error', () => {
        // AL Country Code exists and IBAN length matches. The first 4 chars of the valid IBAN were AL35 
        // which have been replaced with AL40. This is bound to make the mod97 check fail.
        const invalid_iban = 'AL40202111090000000001234567' 
        expect(() => validate_iban(invalid_iban)).toThrow('IBAN Validation Failed - failed mod97 check')
      })
    })
  })
})