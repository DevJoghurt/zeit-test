export default class {
    constructor() {
        this.controllers = {}
    }
    getController(name, Controller, opts) {
        if (this.controllers[name] && IS_CLIENT) {
            if (typeof this.controllers[name].cached !== "undefined") {
                if (!this.controllers[name].cached) {
                    //overwrite controller cache
                    this.controllers[name] = new Controller(opts)
                }
            }
            return this.controllers[name]
        } else {
            // cache the controller
            this.controllers[name] = new Controller(opts)
            return this.controllers[name]
        }
    }
}