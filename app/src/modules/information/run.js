import Module from '../module'
import InformationController from './InformationController'

export default class extends Module {

    init(routes) {
        var self = this
        Object.assign(routes, {
            '/information': function (params, query) {
                var informationController = self.getController('information', InformationController, {
                    view: 'information'
                })
                return informationController
            }
        })
    }

}