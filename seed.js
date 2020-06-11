const database = require('./database')

db.serialize(() => {
  const dropTableUser = `DROP TABLE user`
  const dropTableInfo = `DROP TABLE info`
  const createTableUser = `CREATE TABLE IF NOT EXISTS user (username TEXT UNIQUE, email TEXT UNIQUE, password TEXT)`
  const createTableInfo = `CREATE TABLE IF NOT EXISTS info (user_id INTEGER, firstname TEXT, lastname TEXT)`

  database.run(dropTableUser, (error => {
    if (error) {
      console.error(new Error('Failure to drop table user'));
    } else {
      console.log('dropped user table successfully');
    }
  }));

  database.run(dropTableInfo, (error => {
    if (error) {
      console.error(new Error('Failure to drop table info'));
    } else {
      console.log('dropped info table successfully');
    }
  }));

  database.run(createTableUser, (error => {
    if (error) {
      console.error(new Error('Failure to create table user'));
    } else {
      console.log("created user table successfully");
    }
  }));

  database.run(createTableInfo, (error => {
    if (error) {
      console.error(new Error('Failure to create table info'));
    } else {
      console.log('created info table successfully');
    }
  }));
});