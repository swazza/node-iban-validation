/**
 * Recursive implementation of the following algorithm - sourced from https://en.wikipedia.org/wiki/International_Bank_Account_Number#Modulo_operation_on_IBAN
 * 1. Construct 'piece' from first 9 digits of 'num' - which is the integer representation of an IBAN
 * 2. Calculate mod97 of 'piece' from step 1 and store in 'remainder'
 * 3. Prepend 'remainder' to 'piece'
 * 4. Repeat step 2 till length of 'piece' falls within [1, 7)
 * 5. Calculate mod97 of 'piece' for the last time
 * 6. Result from step 5 is the result of the operation
 * @param num 
 * @param check 
 * @param piece_start_index 
 * @param piece_end_index 
 * @returns 
 */
function _mod97(num: string, check: string, piece_start_index: number, piece_end_index: number): number {      
  const piece = num.substring(piece_start_index, piece_end_index)  
  const dividend = `${check}${piece}`
  if(dividend.length >= 1 && dividend.length < 7) {
      return parseInt(dividend) % 97
  }

  const remainder = parseInt(dividend) % 97
  const next_check = remainder.toString()
  const next_start_index = piece_end_index
  const next_end_index = Math.min(piece_end_index + 7, num.length)
  return _mod97(num, next_check, next_start_index, next_end_index)
}

/**
 * Performs a mod97 operation and returns the result
 * @param num - stringified number which is the operand for the mod97 operation
 * @returns remainder
 */
export function mod97_10(num: string): number {
  // mod97 operation needs to have the ability to handle integers of more than 30 digits. This is significantly bigger than
  // javascript's Number.MAX_SAFE_INTEGER. Therefore, we will need to a piece-wise modulo operation. The first piece will contain
  // the first 9 characters of the string. Indexes in set theory representation would be [0, 9)
  const piece_start_index = 0
  const piece_end_index = 9
  return _mod97(num, '', piece_start_index, piece_end_index)
}