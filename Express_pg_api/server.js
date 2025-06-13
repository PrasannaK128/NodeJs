import express from 'express';
import pool from './DB_Connection.js';

const app = express();
const port = 1000;

app.use(express.json());
//Test route
app.get('/', (req, res) => res.send('API is running'))

//Fetching data

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('select * from emp');
        res.json(result.rows);
    }
    catch (err) {
        console.log(err)
    }

})

//Adding the data

app.post('/add', async (req, res) => {
    try {
        const { name, city } = req.body;
        const result = await pool.query('insert into emp (name,city) values($1,$2) RETURNING *', [name, city])
        res.status(200).json(result.rows[0])
    }
    catch (err) {
        console.log(err)
    }
})

//Extracting data of specific id
app.get('/getuser/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const resut = await pool.query('select * from emp where id =$1', [id]);
        if (resut.rows === 0) {
            res.send('Data not forund')
        }
        else {
            res.status(200).json(resut.rows);
        }
    }
    catch (err) {
        console.log(err);
    }
})

//Updating data

app.put('/update/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const { name, city } = req.body;
        const result = await pool.query('update emp set name =$1, city=$2 where id=$3 RETURNING *', [name, city, id]);
        res.status(200).json(result.rows)
    }
    catch (err) {
        console.log(err);
    }

})


//Delete data

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('delete from emp where id=$1 RETURNING *', [id]);
        res.status(200).json(result.rows)
    }
    catch (err) {
        console.log(err);
    }
})

app.listen(port, () => console.log(`Running on server ${port}`))