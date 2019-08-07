export const sanitiseStringAlphaNumeric = (input: string): string => {
  return input.replace(/[^0-9a-zA-Z_-\s]/gi, '')
}
