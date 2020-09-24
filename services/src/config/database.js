import util from 'util';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
    connectionLimit: 20,
    host: process.env.HOST,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    multipleStatements: true
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST')
            console.error('Database connection was closed.')
        if (err.code === 'ER_CON_COUNT_ERROR')
            console.error('Database has too many connections.')
        if (err.code === 'ECONNREFUSED')
            console.error('Database connection was refused.')
        if (err.code === 'ER_BAD_DB_ERROR')
            console.log('Database not exists');
    }

    if (connection) connection.release();

    return
})

pool.query = util.promisify(pool.query);

export default pool;