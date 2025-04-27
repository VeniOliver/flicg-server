/**
 * Class responsible for logging actions with timestamps.
 */
export default class Log {

  /**
   * Constructor for the Log class.
   * Initializes the log with a timestamp and an action.
   * 
   * @param {string} action - The action that is being logged.
   */
  constructor(action) {
    // Set the timestamp to the current date and time
    this.timestamp = new Date()
    
    // Set the action that is being logged
    this.action = action
  }
}
