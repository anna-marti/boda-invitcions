const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const api        = require('./api');
const mongoose   = require('mongoose');
const config     = require('./config');
const port       = (process.env.PORT || config.SERVER_PORT);
const ip         = (process.env.OPENSHIFT_NODEJS_IP || config.IP);
const mongoUri   = process.env.OPENSHIFT_MONGODB_DB_HOST ?
                   `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.OPENSHIFT_MONGODB_DB_HOST}:${process.env.OPENSHIFT_MONGODB_DB_PORT}/invitacions`
                   : config.MONGO;

const Invitacio  = require('./models/invitacio');

mongoose.connect(mongoUri);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/api', api());

app.get('/:id', (req, res) => {
  let id = req.params.id;

  Invitacio.findById(id, function(err, invitacio) {
    if (err)
      return res.status(404).send('NOT FOUND');

    if (!invitacio.visitat) {
      invitacio.visitat = true;
      invitacio.save();
    }

    console.log(invitacio);
    res.render('index', invitacio);
  });
});


app.listen(port, ip , () => console.log(`listening on port ${port}!`));
