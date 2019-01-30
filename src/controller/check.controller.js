import svgCaptcha from 'svg-captcha'
import { captchaConf } from '../conf'

export default class checkController{
  constructor(app) {
    app.get('/check/get', this.getCheckImage.bind(this))
    app.post('/check/check', this.doCheck.bind(this))
  }

  getCheckImage (req, res) {
    const codeConfig = {
      size: captchaConf.size,
      ignoreChars: captchaConf.ignoreChars,
      noise: captchaConf.noise,
      height: captchaConf. height
    }
    const captcha = svgCaptcha.create(codeConfig)
    req.session.captcha = captcha.text.toLowerCase()
    req.session.save()
    const codeData = {
      code: 200,
      img: captcha.data
    }
    res.json(codeData)
  }

  doCheck (req, res) {
    res.json({
      code: 200
    })
  }
}