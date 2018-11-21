export default class InformationModel {

    constructor(opts) {
        this.view = opts.view
    }

    fetch() {
        return Promise.resolve(this)
    }
}