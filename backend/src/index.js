const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes')
const cors = require('cors');

mongoose.connect('mongodb+srv://lampada:17507231@rocketseat-o9wbs.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const app = express();

//para o express entender body no formato json
app.use(cors({origin: 'http://localhost:3000'}));
//libera a aplicação de qualquer origin
// app.use(cors());
app.use(express.json());
app.use(router);

//get, post, put, delete
app.listen(3333);