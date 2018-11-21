import Module from '../module'
import DashboardController from './DashboardController'

export default class extends Module {

    init(routes) {
        var self = this
        Object.assign(routes, {
            '/': function (params, query) {
                var dashboardController = self.getController('dashboard', DashboardController, {
                    view: 'dashboard'
                })
                return dashboardController
            }
        })
    }

}