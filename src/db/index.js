import { db } from 'nodejs-mysql-model'
import { dbConf } from '../conf'

export default function Db () {
  db.createPool(dbConf.host)
}