/**
 * ### Tests the strength of a password. Returns true if inputs matches all criteria
 *
 * #### Password Strength Criteria:
 * - The password must contain at least 1 lowercase alphabetical character
 * - The password must contain at least 1 uppercase alphabetical character
 * - The password must contain at least 1 numeric character
 * - The password must contain at least one special character
 * - The password must be eight characters or longer
 *
 * @param {String} password
 * @return {boolean}
 */
module.exports = (password) => {
  // eslint-disable-next-line no-useless-escape
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return strongRegex.test(password);
};
