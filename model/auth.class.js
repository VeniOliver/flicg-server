import Error from './error.class.js';

/**
 * Class responsible for handling authentication-related operations.
 */
export default class Auth {
  /**
   * Verifies the `x-api-key` header in the incoming request.
   * 
   * This function checks if the `x-api-key` header is present and matches the expected value
   * defined in the environment variable `SECRET_API`. If the key is missing or invalid, 
   * it responds with an error and a 400 status code. Otherwise, it proceeds to the next middleware.
   * 
   * @async
   * @param {Object} req - The request object from the client, typically provided by Express
   * @param {Object} res - The response object used to send responses to the client
   * @param {Function} next - The next middleware function in the Express middleware chain
   * 
   * @throws {Error} Throws an error if the API key is not provided or is invalid
   * 
   * @returns {void} Calls the `next` middleware function if the API key is valid
   */
  static async apiKeyVerify(req, res, next) {
    // Retrieve the API key from the request headers
    const key = req.headers['x-api-key']

    // Check if the API key is missing
    if (!key) {
      return res.status(400).send(new Error('Api key não encontrada.', 109))
    }

    // Check if the API key is invalid
    if (key !== process.env.SECRET_API) {
      return res.status(400).send(new Error('Api key inválida.', 109))
    }

    // Proceed to the next middleware if the API key is valid
    next()
  }
}
