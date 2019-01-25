import crypto from 'crypto'

export default {
  encodeMd5 (str) {
    const hash = crypto.createHash('md5')
    hash.update(str)
    return hash.digest('hex')
  }
}