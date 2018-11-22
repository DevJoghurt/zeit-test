'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var bodyParser = _interopDefault(require('body-parser'));
var cookieParser = _interopDefault(require('cookie-parser'));
var path = require('path');
var riot = _interopDefault(require('riot/lib/server'));
var riot$1 = _interopDefault(require('riot'));

var VIEWS_FOLDER = './views';
var VIEWS_ENGINE = 'ejs';

var defaultExport = function defaultExport() {
    this.controllers = {};
};
defaultExport.prototype.getController = function getController (name, Controller, opts) {
    if (this.controllers[name] && IS_CLIENT) {
        if (typeof this.controllers[name].cached !== "undefined") {
            if (!this.controllers[name].cached) {
                //overwrite controller cache
                this.controllers[name] = new Controller(opts);
            }
        }
        return this.controllers[name]
    } else {
        // cache the controller
        this.controllers[name] = new Controller(opts);
        return this.controllers[name]
    }
};

var DashboardModel = function DashboardModel(opts) {
    this.view = opts.view;
};

DashboardModel.prototype.fetch = function fetch () {
    return Promise.resolve(this)
};

var DashboardController = /*@__PURE__*/(function (DashboardModel$$1) {
	function DashboardController () {
		DashboardModel$$1.apply(this, arguments);
	}if ( DashboardModel$$1 ) DashboardController.__proto__ = DashboardModel$$1;
	DashboardController.prototype = Object.create( DashboardModel$$1 && DashboardModel$$1.prototype );
	DashboardController.prototype.constructor = DashboardController;

	

	return DashboardController;
}(DashboardModel));

var defaultExport$1 = /*@__PURE__*/(function (Module) {
    function defaultExport$$1 () {
        Module.apply(this, arguments);
    }

    if ( Module ) defaultExport$$1.__proto__ = Module;
    defaultExport$$1.prototype = Object.create( Module && Module.prototype );
    defaultExport$$1.prototype.constructor = defaultExport$$1;

    defaultExport$$1.prototype.init = function init (routes) {
        var self = this;
        Object.assign(routes, {
            '/': function (params, query) {
                var dashboardController = self.getController('dashboard', DashboardController, {
                    view: 'dashboard'
                });
                return dashboardController
            }
        });
    };

    return defaultExport$$1;
}(defaultExport));

var InformationModel = function InformationModel(opts) {
    this.view = opts.view;
};

InformationModel.prototype.fetch = function fetch () {
    return Promise.resolve(this)
};

var InformationController = /*@__PURE__*/(function (InformationModel$$1) {
	function InformationController () {
		InformationModel$$1.apply(this, arguments);
	}if ( InformationModel$$1 ) InformationController.__proto__ = InformationModel$$1;
	InformationController.prototype = Object.create( InformationModel$$1 && InformationModel$$1.prototype );
	InformationController.prototype.constructor = InformationController;

	

	return InformationController;
}(InformationModel));

var defaultExport$2 = /*@__PURE__*/(function (Module) {
    function defaultExport$$1 () {
        Module.apply(this, arguments);
    }

    if ( Module ) defaultExport$$1.__proto__ = Module;
    defaultExport$$1.prototype = Object.create( Module && Module.prototype );
    defaultExport$$1.prototype.constructor = defaultExport$$1;

    defaultExport$$1.prototype.init = function init (routes) {
        var self = this;
        Object.assign(routes, {
            '/information': function (params, query) {
                var informationController = self.getController('information', InformationController, {
                    view: 'information'
                });
                return informationController
            }
        });
    };

    return defaultExport$$1;
}(defaultExport));

var Routes = {};

var dashboard = new defaultExport$1();
dashboard.init(Routes);

var information = new defaultExport$2();
information.init(Routes);

riot$1.tag2('test', '<h2>Test</h2>', '', '', function(opts) {
});

riot$1.tag2('app', '<h1>hello world {opts.view}</h1> <test></test>', '', '', function(opts) {
});

global.IS_SERVER = true;
global.IS_CLIENT = false;


var app = express();

app.use(function (req, res, next) {
    var BASE = __dirname;

    req.app.set('views', path.join(BASE, VIEWS_FOLDER));
    req.app.set('view engine', VIEWS_ENGINE);
    req.app.use(bodyParser.json());
    req.app.use(bodyParser.urlencoded({
        extended: true
    }));
    req.app.use(cookieParser());

    Object.keys(Routes).forEach(function (route) {
        req.app.get(route, function (req, res) {

            var params = [];
            var query = {};
            for (var key in req.params) {
                if (!req.params.hasOwnProperty(key)) { continue }
                params.push(req.params[key]);
            }
            for (var key in req.query) {
                if (!req.query.hasOwnProperty(key)) { continue }
                query[key] = decodeURIComponent(req.query[key]);
            }

            var controller = Routes[route](params, query);


            controller
                .fetch()
                .then(function (data) {
                    res.render('index', {
                        initialData: JSON.stringify(data),
                        body: riot.render("app", data)
                    });
                }).catch(function (e) {
                    console.log(e);
                });
        });
    });

    next();
});

module.exports = app;
