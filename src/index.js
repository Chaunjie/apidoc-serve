import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import compression from 'compression'
import history from 'connect-history-api-fallback'
import Router from './router/index'
import db from './db'

const app = express()
const router = new Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(history())
app.use(compression())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 3
  }
}))
app.use(express.static(path.resolve('../../web')));
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
  res.header("Access-Control-Allow-Headers", "content-type")
  res.set('Content-Type', 'application/json')
  if (req.method.toLowerCase() == 'options') {
    res.sendStatus(200)
  } else {
    next()
  }
})

db()
router.initRouter(app)

let server = app.listen(8090, function () {
  let host = server.address().address
  let port = server.address().port
  console.log(`服务启动: 访问地址为http://localhost:${port}`)
})