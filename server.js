const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const session  = require('express-session');
const apiRoutes = require('./routes/api');

const app = express();


// =======================
// Session Configuration
// =======================
const sessionConfig = {
    secret: "Thisinnotagoodsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expired: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));



// =====================
// Data Base Connection
// ====================
mongoose.connect('mongodb://localhost:27017/Auth8', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Data Base Connected Successfully!');
});

// ======================
// Using Routes
// ============
app.use('/api',  apiRoutes);


app.get('/', (req, res) => {
    res.send('Welcome To Auth App ');
})

app.listen(3000, () => {
    console.log('Server Start On Port 3000');
})