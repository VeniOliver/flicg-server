/**
 * Represents an error with a custom message and code.
 * This class is useful for defining and managing application-specific errors.
 */
export default class Error {
    /**
     * Constructs a new Error instance.
     * 
     * @param {string} message - The error message. This parameter is required and provides details about the error.
     * @param {number|string} [code=''] - An optional error code. Can be used to categorize or identify specific types of errors.
     */
    constructor(message, code = '') {
      /**
       * @property {string} message - The error message describing the issue.
       */
      this.message = message
  
      /**
       * @property {number|string} code - The error code. Defaults to an empty string if not provided.
       */
      this.code = code
    }
  }
  