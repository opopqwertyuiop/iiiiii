const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT, MONGOURI } = require('./config');

mongoose
   .connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('connected to db'))
   .catch((error) => console.log('cannot connect to db', error));
mongoose.set('useCreateIndex', true);

const app = express();
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/edit', require('./routes/edit'));

const port = process.env.PORT || PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
