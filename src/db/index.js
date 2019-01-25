import { db } from 'nodejs-mysql-model'

export default function Db () {
  db.createPool({
    host: '106.12.85.98', // localhost
    user: 'root',
    password: 'root', // qwer123456
    database: 'apidoc',
    port: 3306
  })
}