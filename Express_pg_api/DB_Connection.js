import pkg from 'pg';
const{Pool}=pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testing',
  password: 'root', 
  port: 5432
});

export default pool;