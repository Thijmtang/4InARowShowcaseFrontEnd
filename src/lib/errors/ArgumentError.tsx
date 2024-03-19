export default class ArgumentError extends Error {
    constructor(message?: string) {
        super(message);
    
        // important for typescript custom error!
        Object.setPrototypeOf(this, new.target.prototype);
        
        this.name = 'ArgumentError';
      }
}