import * as mysql from 'mysql2'


const connection = mysql.createPool({
	user: 'apexuser@apexmysqlserver',
	password: 'Murphy01',
	host: 'apexmysqlserver.mysql.database.azure.com',
	database: 'fittrainer',

});

export default connection

