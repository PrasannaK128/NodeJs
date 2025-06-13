import express, { json } from 'express';
import pool from './DB_Details.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {  authenticateToken, authorizeRoles} from './Middleware.js';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const app = express();
const port = 1000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.listen(port, () => console.log(`You are running on port ${port}`));

app.post('/signup', async (req, res) => {
    const { id, name, city, email, password, role } = req.body;
    try {
        const check = await pool.query('select * from emp where id = $1', [id]);
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        if (check.rows.length > 0) {
            res.send('User already exists!!!!');
        } else {
            const enteruser = await pool.query('insert into emp (name,city,email,password,role)values($1,$2,$3,$4,$5) RETURNING *', [name, city, email, hashedPassword, role]);
            res.status(200).json(enteruser.rows);
        }
    } catch (error) {
        console.log(error);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const JWT_SECRET = 'supersecretkey123';

    try {
        const check = await pool.query('select * from emp where email =$1', [email]);
        if (check.rows.length == 0) {
            res.status(500).json({ message: 'User with this email dosent exists' });
        }
        const user = check.rows[0];
        const passwordValidity = await bcrypt.compare(password, user.password);
        if (!passwordValidity) {
            res.status(500).json({ message: 'Please enter valid password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
    }
});

app.get('/message', async (req, res) => {
    res.send("Hello world!!!!!!11");
});

app.get('/dashboard', authenticateToken, async (req, res) => {
   
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy || 'name';  
    const order = req.query.order||'asc';      
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
        const query = await pool.query(`select * from employees order by ${sortBy} ${order} LIMIT $1 OFFSET $2`,[limit,offset]);
        const query1=await pool.query(`select * from employees`);
        res.status(200).json({employees:query.rows,total:query1.rows.length});
    } catch (err) {
        console.log(err);
    }
});

app.post('/addEmp', authenticateToken,authorizeRoles('admin','manager'), upload.single('passport'), async (req, res) => {
    try {
        const { name, email, password, companyname, salerey, department } = req.body;
        const q = await pool.query("select * from employees where email =$1", [email]);
        const passport = req.file ? req.file.filename : null;
        const encod=await bcrypt.hash(password,10)
        if ((await q).rows.length > 0) {
            res.send('User alredy exists');
        } else {
            const q1 = await pool.query("insert into employees (name,email,password,companyname,salerey,department,passport)values($1,$2,$3,$4,$5,$6,$7) RETURNING *", [name, email, encod, companyname, salerey, department, passport]);
            res.status(200).json(q1.rows);
            
        }
    } catch (error) {
        console.log(error);
    }
});

app.delete('/deleteEmp', authenticateToken, async (req, res) => {
    try {
        const { id, name, email, password, companyname, salerey, department } = req.body;
        const q = await pool.query('select * from employees where id = $1', [id]);
        if (q.rows.length == 0) {
            res.send("no user with this id exists");
        } else {
            const q1 = await pool.query('delete from employees where id=$1 ', [id]);
            res.send('Employee deleted Successfully');
        }
    } catch (error) {
        console.log(error);
    }
});

app.put('/updateEmp',authenticateToken, upload.single('passport'), async (req, res) => {
    try {
        const { id } = req.body;
        const existing = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);

        if (existing.rows.length === 0) {
            return res.status(404).send("No user with this ID exists");
        }

        const oldData = existing.rows[0];

        const name = req.body.name?.trim() || oldData.name;
        const email = req.body.email?.trim() || oldData.email;
        const password = req.body.password?.trim() || oldData.password;
        const companyname = req.body.companyname?.trim() || oldData.companyname;
        const salerey = req.body.salerey || oldData.salerey;
        const department = req.body.department?.trim() || oldData.department;
        const passport = req.file ? req.file.filename : oldData.passport;

        const q1 = await pool.query(
            `UPDATE employees 
       SET name = $1, email = $2, password = $3, companyname = $4, salerey = $5, department = $6, passport = $7 
       WHERE id = $8 
       RETURNING *`,
            [name, email, password, companyname, salerey, department, passport, id]
        );

        res.status(200).send("Employee updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error during employee update");
    }
});
