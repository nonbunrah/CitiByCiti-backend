let sqlite3 = require('sqlite3');
let database = new sqlite3.Database('./database.db');

// database.serialize(() => {
//   const dropTableUser = `DROP TABLE tblUser`;
//   const dropTableWall = `DROP TABLE tblWall`;
//   const dropTableUserWallPost = `DROP TABLE tblUserWallpost`;

//   const createTableUser = `CREATE TABLE IF NOT EXISTS tblUser(
//     firstname TEXT, 
//     lastname TEXT,
//     email TEXT UNIQUE)`;

//   const createTableWall = `CREATE TABLE IF NOT EXISTS tblWall(
//     title TEXT,
//     description TEXT,
//     time TEXT,
//     month INTEGER,
//     day INTEGER,
//     year INTEGER)`;

//   const createTableUserWallPost = `CREATE TABLE IF NOT EXISTS tblUserWallpost(
//     user_id INTEGER,
//     wall_id INTEGER
//   )`

//   database.run(dropTableUser, (error => {
//     if (error) {
//       console.error(new Error('Failure to drop table user'));
//     } else {
//       console.log('dropped user table successfully');
//     }
//   }));

//   database.run(dropTableWall, (error => {
//     if (error) {
//       console.error(new Error('Failure to drop table wall'));
//     } else {
//       console.log('dropped wall table successfully');
//     }
//   }));

//   database.run(dropTableUserWallPost, (error => {
//     if (error) {
//       console.error(new Error('Failure to drop user wall post table'));
//     } else {
//       console.log('dropped user wall post table successfully');
//     }
//   }));

//   database.run(createTableUser, (error => {
//     if (error) {
//       console.error(new Error('Failure to create table user'));
//     } else {
//       console.log("created tblUser successfully");
//     }
//   }));

//   database.run(createTableWall, (error => {
//     if (error) {
//       console.error(new Error('Failure to create table wall'));
//     } else {
//       console.log('created tblWall successfully');
//     }
//   }));

//   database.run(createTableUserWallPost, (error => {
//     if (error) {
//       console.error(new Error('Failure to create table wall post'));
//     } else {
//       console.log('created tblUserWallpost successfully');
//     }
//   }));
// });
module.exports = database; 