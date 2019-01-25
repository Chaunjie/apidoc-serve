import { db } from 'nodejs-mysql-model'

export default function Db () {
  db.createPool({
    host: 'localhost', // localhost
    user: 'root',
    password: 'root', // qwer123456
    database: 'apidoc',
    port: 3306
  })
}