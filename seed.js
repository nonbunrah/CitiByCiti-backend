const database = require('./database')

const users_list = [
  {
    firstname: 'RJ',
    lastname: 'Bamrah',
    email: 'rj.bamrah@gmail.com'
  },
  {
    firstname: 'Nicole',
    lastname: 'Reichenberger',
    email: 'nicolereich28@gmail.com'
  }
]

const wallpost = [
  {
    title: 'Looking for friend',
    description: 'His name is Joe',
    time: '13:00',
    month: 6,
    day: 15,
    year: 2020,
  }, 
  {
    title: 'Also looking for friend',
    description: 'His name is Henry',
    time: '08:00',
    month: 7,
    day: 4,
    year: 2021,
  }
]

const deleteUser = `DELETE FROM tblUser`
const deleteWall = `DELETE FROM tblWall`
const insertIntoUser = `INSERT INTO tblUser (firstname, lastname, email) VALUES (?, ?, ?)`
const insertIntoWall = `INSERT INTO tblWall (title, description, time, month, day, year) VALUES (?, ?, ?, ?, ?, ?)`

database.run(deleteUser, error => {
  if (error) console.log(new Error('Could not delete Users'), error);
  else {
    users_list.forEach(user => {
      database.run(insertIntoUser, [user.firstname, user.lastname, user.email], error => {
        if (error) console.log(new Error('Could not add user'), error);
        else {
          console.log(user.firstname + ' ' + user.lastname + ' successfully added to database.')
        }
      });
    });

    database.run(deleteWall, error => {
      if (error) console.log(new Error('Could not delete wallpost'), error);
      else {
        wallpost.forEach(post => {
          database.run(insertIntoWall, [post.title, post.description, post.time, post.month, post.day, post.year], error => {
            if (error) console.log(new Error('Could not add post'), error);
            else {
              console.log(`${post.title} successfully added to database`);
            }
          });
        });
      }
    });
  }
});