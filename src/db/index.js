import { db } from 'nodejs-mysql-model'

export default function Db () {
  db.createPool({
    host: 'localhost', // localhost
    user: 'root',
    password: 'qwer123456', // qwer123456
    database: 'apidoc',
    port: 3306
  })
}