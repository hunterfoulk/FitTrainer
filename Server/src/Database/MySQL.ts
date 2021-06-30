import * as mysql from 'mysql2'

const PASSWORD = process.env.DB_PASS

// const connection = mysql.createConnection({
// 	user: 'root',
// 	password: PASSWORD,
// 	host: 'localhost',
// 	database: 'fittrainer',
// 	port: 3306,
// 	multipleStatements: true
// })

// const pool = mysql.createPool({
// 	user: 'root',
// 	password: PASSWORD,
// 	host: 'localhost',
// 	database: 'fittrainer',
// 	waitForConnections: true,
// 	port: 3306,
// 	multipleStatements: true,
// 	connectionLimit: 10,
// 	queueLimit: 0
// });



const connection = mysql.createPool({
	user: 'root',
	password: PASSWORD,
	host: 'localhost',
	database: 'fittrainer',
});

export default connection