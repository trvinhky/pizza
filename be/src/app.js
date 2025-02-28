const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const path = require('path');

dotenv.config()

const app = express()

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: Number(process.env.SESSION_TIME)
    } // 5 phút
}))

app.use((err, req, res, next) => {
    if (err.message && err.message.includes('CORS')) {
        res.status(400).send({
            message: 'CORS Error',
            details: err.message
        });
    } else {
        next(err);
    }
});

/* response */
app.use((req, res, next) => {
    res.success = (message, data) => {
        return res.status(201).json({ message, data });
    };
    next();
});

app.use((req, res, next) => {
    res.successNoData = (message) => {
        return res.status(200).json({ message });
    };
    next();
});

app.use((req, res, next) => {
    res.error = (code = 404, message) => {
        return res.status(code).json({ message });
    };
    next();
});

app.use((req, res, next) => {
    res.errorServer = () => {
        return res.error(500, 'Lỗi server!');
    };
    next();
});

app.use((req, res, next) => {
    res.errorValid = (
        message = 'Tất cả trường dữ đều liệu rỗng!'
    ) => {
        return res.error(400, message);
    };
    next();
});

// Server folder 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

/* router */
app.use('/account', require('./routes/account.route'))
app.use('/product', require('./routes/product.route'))
app.use('/size', require('./routes/size.route'))
app.use('/detail', require('./routes/detail.route'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app

