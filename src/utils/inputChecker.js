const STRONG_PASSWORD = new RegExp(
  "(?=.{8,})(?=.*[0-9])(?=.*[A-Za-z])"
); //The password has at least 8 characters long including one digit, one special character and one letter
const VALID_EMAIL = new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const NOT_EMPTY = new RegExp(/\S+/);

export const PASSWORD = "password";
export const EMAIL = "email";
export const TEXT = 'text';

export function isValidInput(input, type) {
  if (type === PASSWORD) return STRONG_PASSWORD.test(input);
  if (type === EMAIL) return VALID_EMAIL.test(input);
  if (type === TEXT) return NOT_EMPTY.test(input);
}
