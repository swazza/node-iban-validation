import { get_map as get_alphabet_integer_map } from './alphabet-integer-map'
import { get_map as get_country_code_length_map } from './country-codes'
import { mod97_10 } from './mod97_10'

const get_country_code = (iban: string) => {
  // The first two characters of the iban make up the country code
  return iban.substring(0, 2)
}

const rearrange_iban = (iban: string): string => {
  // Rearranges iban so that the first 4 characters of the IBAN are moved to the end. So an IBAN like - 
  // GB82WEST12345698765432	(example taken from https://en.wikipedia.org/wiki/International_Bank_Account_Number#Validating_the_IBAN)
  // would look like WEST12345698765432GB82 after the rearrange  
  return `${iban.substring(4, iban.length)}${iban.substring(0, 4)}`
}

const expand_iban = (iban: string): string => {
  // Expands the IBAN by replacing all alphabet characters with corresponding double digit integers from 
  // the alphabet_integer_map
  const alphabet_integer_map = get_alphabet_integer_map()
  const map_to_integer = (char: string): number => alphabet_integer_map.has(char) ? alphabet_integer_map.get(char) : parseInt(char)   
  
  return iban
    .split('')            // convert iban string to array of chars
    .map(map_to_integer)  // map each char to integer
    .join('')             // join integers from previous step to form a string
}

/**
 * Validates the structure of an IBAN
 * @param iban 
 * @returns true if valid
 * @throws an error if not valid
 */
export const validate_iban = (iban: string): boolean => {
  /* Validates an IBAN using the following algorithm -- 
  * - Check if country code is valid. If not, validation has failed.
  * - Check if country code & expected length of IBAN for the corresponding country code is valid. If not, validation has failed.
  * - Rearrange IBAN so that the first 4 characters are moved to the end of the string
  * - Replace all alaphabet characters with double digit integers from the alphabet integer map
  * - Perform mod97 operation on the result from the above step
  * - If the result is '1', the IBAN is valid. If not, the validation has failed
  */
  const country_code_length_map = get_country_code_length_map()
  const country_code = get_country_code(iban)
  
  const is_country_code_valid = country_code_length_map.has(country_code)
  if(!is_country_code_valid) 
    throw new Error(`IBAN Validation Failed - Country Code ${country_code} is not valid`)

  const iban_length_for_country = country_code_length_map.get(country_code)
  if(iban_length_for_country !== iban.length)
    throw new Error(`IBAN Validation Failed - IBAN length of ${iban.length} does not match iban length for country ${country_code} - ${iban_length_for_country}`)

  const rearranged_iban = rearrange_iban(iban)
  const expanded_iban = expand_iban(rearranged_iban)
  const remainder = mod97_10(expanded_iban)

  if(remainder !== 1)
    throw new Error(`IBAN Validation Failed - failed mod97 check`)
  
  return true
}