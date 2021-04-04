import * as mysql from 'mysql2'

const PASSWORD = process.env.DB_PASS

const connection = mysql.createConnection({
	user: 'root',
	password: "Murphy01",
	host: 'localhost',
	database: 'fittrainer',
	port: 3306,
	multipleStatements: true
})

export default connection