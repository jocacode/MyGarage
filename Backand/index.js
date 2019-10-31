const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./routes/post')
const cors = require('cors');


const app = express()

app.use('/post', posts);

// // let's mount a few more...
// router.use('/search', require('./search'));  
// router.use('/cart', require('./cart'));  
// router.use('/userCreation', require('./userCreation'));  
// router.use('/checkout', require('./checkout'));  
// router.use('/promo', require('./promo'));  
// router.use('/account', ensureAuthenticated, require('./account'));  
// router.use('/admin', ensureAuthenticated, require('./admin'));

// ovde ces za multiple routes pisati svaki posebno
//eventualno da sa require uvezes route-e i 
// da se onda koristi nesto slicno koa-combine-routers

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8080'
}));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is running!')
})