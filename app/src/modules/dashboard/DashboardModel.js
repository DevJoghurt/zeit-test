export default class DashboardModel {
    constructor(opts) {
        this.view = opts.view
    }

    fetch() {
        return Promise.resolve(this)
    }
}