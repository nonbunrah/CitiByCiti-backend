let express = require('express');
let database = require('./database.js');
let app = express();

const PORT = 4000;

// CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
})

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Backend Home");
});

// -------------------------------------------------------
// USERS ROUTES
// -------------------------------------------------------

// Get all users
app.get('/api/users', (req, res) => {
  const getUsers = `SELECT oid, * FROM tblUser`;

  database.all(getUsers, (error, results) => {
    if (error) {
      console.log(new Error('Could not get users'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
})

// Get one user
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const getUser = 
  `SELECT oid, * FROM tblUser WHERE tblUser.oid = ?`;

  database.get(getUser, [userId], (error, results) => {
    if (error) {
      console.log(new Error('Could not get user'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// Start server
app.listen(PORT, ()=> {
  console.log(`PORT ${PORT} IS ON`);
});