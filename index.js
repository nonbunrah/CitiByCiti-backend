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

// -------------------------------------------------------
// WALL ROUTES
// -------------------------------------------------------

// get all wallposts
app.get('/api/wallposts', (req, res) => {
  const getWall = `SELECT oid, * FROM tblWall`;

  database.all(getWall, (error, results) => {
    if (error) {
      console.log(new Error('Could not get wallposts'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

//get post by date
app.get('/api/wallposts/:month/:day/:year', (req, res) => {
  const getPost = `
  SELECT oid, * from tblWall
  WHERE tblWall.month = ${req.params.month}
  AND tblWall.day = ${req.params.day}
  AND tblWall.year = ${req.params.year}`;

  database.all(getPost, (error, results) => {
    if (error) {
      console.log(new Error('Could not get wallpost(s)'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// get one wallpost
app.get('/api/wallposts/:id', (req, res) => {
  const postId = req.params.id;
  const getPost = `SELECT oid, * FROM tblWall WHERE tblWall.oid = ?`;

  database.get(getPost, [postId], (error, results) => {
    if (error) {
      console.log(new Error('Could not get wallpost'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// create wallpost
app.post('/api/wallposts', (req, res) => {
  const reqBody = [req.body.title, req.body.description, req.body.time, req.body.month, req.body.day, req.body.year];
  const createNewPost = `INSERT INTO tblWall VALUES (?, ?, ?, ?, ?, ?)`;

  database.run(createNewPost, reqBody, (error, results) => {
    if (error) {
      console.log(`Error adding new post: ${req.body}`, error)
      res.sendStatus(500);
    } else {
      console.log(`Added new event: ${req.body.title}`)
      res.sendStatus(200);
    }
  })
});

// update wallpost
app.put('/api/wallposts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const queryHelper = Object.keys(req.body).map(element => `${element.toUpperCase() } = ?`);
  const updateOnePost = `UPDATE tblWall SET ${queryHelper.join(', ')} WHERE tblWall.oid = ?`;
  const queryValues = [...Object.values(req.body), postId];

  database.run(updateOnePost, queryValues, function (error) {
    if (error) {
      console.log(new Error('Could not update post'), error);
      res.sendStatus(500);
    } else {
      console.log(`Post '${req.body.title}' successfully updated`);
      res.sendStatus(200);
    }
  })
})

// delete wallpost
app.delete('/api/wallposts/:id', (req, res) => {
  const postId = req.params.id;
  const getPost = `DELETE FROM tblWall WHERE tblWall.oid = ?`;

  database.all(getPost, [postId], (error, results) => {
    if (error) {
      console.log(new Error('Could not delete post'), error);
      res.sendStatus(500);
    } else {
      console.log('Post successfully deleted')
      res.status(200).json({message: "Delete successful"});
    }
  })
});

// Start server
app.listen(PORT, ()=> {
  console.log(`PORT ${PORT} IS ON`);
});