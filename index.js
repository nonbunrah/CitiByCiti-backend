const express = require('express');
const userRouter = require('./routes/user');
const app = express();

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

const PORT = 4000;
app.use('/api/user', userRouter);

app.listen(PORT, ()=> {
  console.log(`PORT ${PORT} IS ON`);
});