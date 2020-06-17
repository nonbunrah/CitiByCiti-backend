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
app.get('/api/users/:id', (req, res) => {
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

// add user
app.post('/api/users', (req, res) => {
  const reqBody = [req.body.firstname, req.body.lastname, req.body.email];
  const createNewUser = `INSERT INTO tblUser VALUES (?, ?, ?)`;
  console.log(req.body)
  database.run(createNewUser, reqBody, (error, results) => {
    if (error) {
      console.log('Error adding new user: ' + req.body.firstname + ' ' + req.body.lastname)
      res.sendStatus(500)
    } else {
      console.log('Added new user: ' + req.body.firstname + ' ' + req.body.lastname)
      res.sendStatus(200)
    }
  })
})

//update user
app.put('/api/users/:id',(req, res) => {
  const userId = parseInt(req.params.id);
  const queryHelper = Object.keys(req.body).map(element => `${element.toUpperCase() } = ?`);
  const updateOneUser = `UPDATE tblUser SET ${queryHelper.join(', ')} WHERE tblUser.oid = ?`;
  const queryValues = [...Object.values(req.body), userId];

  database.run(updateOneUser, queryValues, function (error) {
    if (error) {
      console.log(new Error('Could not update user'), error);
      res.sendStatus(500);
    } else {
      console.log('User: ' + req.body.firstname + ' ' + req.body.lastname + ' was successfully updated');
      res.sendStatus(200);
    }
  })
});

// delete user
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id
  const getUser = `DELETE FROM tblUser WHERE tblUser.oid = ?`;

  database.all(getUser, [userId], (error, results) => {
    if (error) {
      console.log(new Error('Could not delete user'), error);
      res.sendStatus(500);
    } else {
      console.log("User was successfully deleted");
      res.status(200).json({message: "Delete successful"});
    }
  })
});

// Start server
app.listen(PORT, ()=> {
  console.log(`PORT ${PORT} IS ON`);
});