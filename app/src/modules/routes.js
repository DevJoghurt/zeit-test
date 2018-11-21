const Routes = {}

import Dashboard from './dashboard/run'
import Information from './information/run'

var dashboard = new Dashboard()
dashboard.init(Routes)

var information = new Information()
information.init(Routes)

export default Routes