global.IS_SERVER = true
global.IS_CLIENT = false

import {
    VIEWS_FOLDER,
    VIEWS_ENGINE
} from './config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {
    join
} from 'path'
import riot from 'riot/lib/server'

import Routes from './modules/routes'
import './shared/app.tag'


const app = express()

app.use(function (req, res, next) {
    const BASE = __dirname

    req.app.set('views', join(BASE, VIEWS_FOLDER))
    req.app.set('view engine', VIEWS_ENGINE)
    req.app.use(bodyParser.json())
    req.app.use(bodyParser.urlencoded({
        extended: true
    }))
    req.app.use(cookieParser())

    Object.keys(Routes).forEach(function (route) {
        req.app.get(route, function (req, res) {

            var params = []
            var query = {}
            for (var key in req.params) {
                if (!req.params.hasOwnProperty(key)) continue
                params.push(req.params[key])
            }
            for (var key in req.query) {
                if (!req.query.hasOwnProperty(key)) continue
                query[key] = decodeURIComponent(req.query[key])
            }

            var controller = Routes[route](params, query)


            controller
                .fetch()
                .then(function (data) {
                    res.render('index', {
                        initialData: JSON.stringify(data),
                        body: riot.render("app", data)
                    })
                }).catch(function (e) {
                    console.log(e)
                })
        })
    })

    next()
})

export default app