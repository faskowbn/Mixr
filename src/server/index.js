/**
 * Created by brad on 3/28/2017.
 */
'use strict';

let express         = require('express'),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    _               = require('lodash'),
    path            = require('path'),
    session         = require('express-session'),
    fs              = require('fs'),
    mongoose        = require('mongoose'),
    exec            = require('child_process').exec,
    Order           = require(path.join(__dirname, './models/order.js')),
    recipes         = require(path.join(__dirname, '../client/recipes/recipes.js')).recipes;

let app = express();

mongoose.connect('mongodb://localhost:27017/Mixr');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

let accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

app.use(express.static(path.join(__dirname, '../../public')));
app.use(logger({format:"[:date[clf]] :method :url :status :response-time ms",stream: {
    write: function(str)
    {
        accessLogStream.write(str);
        console.log(str);
    }
}}));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

//for the router
module.exports.app = app;

app.use(session({
    secret: 'sdfjkgkgjh33$t$4gmga',
    expires: new Date(Date.now() + (60 * 60 * 30 * 1000)),
    path: '/'
}));

//Get all orders
app.get('/orders', function(req, res) {
    Order.find({},  function(err, orders) {
        if (err){
            res.status(400).send({ error: 'data could not save to database', err: err });
        } else {
            res.status(200).send({ orders: orders });
        }
    })
});

//Post an order
app.post('/order', function(req, res) {
    let data = req.body;
    console.log(req.body);
    if (!data ||
        !data.drink) {
        res.status(400).send({error: 'all form fields required'});
    } else {
        let drinker = "";
        if (data.drinker) {
            drinker = data.drinker;
        }

        let newOrder;
        if (data.drinker !== undefined) {
            newOrder = new Order({
                drink: data.drink,
                drinker: data.drinker
            });
        } else {
            newOrder = new Order({
                drink: data.drink,
            });
        }

        newOrder.save(function(err,order) {
            if (err) {
                res.status(400).send({ error: 'data could not save to database', err: err });
            } else {
                res.status(201).send({
                    orderId: order.id
                });
            }
        });
    }
});

//Delete an order
app.delete('/order/:id', function(req, res) {
    console.log(req.params.id);
    Order.find({'_id': req.params.id}, function(err, order) {
        if (err) {
            res.status(404).send({error: "could not find drink order"});
        } else {
            Order.remove({'_id': req.params.id}, function(err) {
                if (err) {
                    res.status(500).send({ error: 'db problem deleting order' });
                } else {
                    let drinkIngredients = recipes[order[0].drink];
                    let formattedIngredients = "";
                    Object.keys(drinkIngredients).map(function (key) {
                        formattedIngredients = formattedIngredients + drinkIngredients[key] + key + " ";
                    });

                    let cmd = 'python ' + __dirname + '/dispense/dispense.py ' + formattedIngredients;
                    let child = exec(cmd);
                    child.stdout.on('data', (data) => {
                        console.log(data.toString());
                    });

                    child.stderr.on('data', (data) => {
                        console.log(data.toString());
                    });

                    child.on('exit', (code) => {
                        console.log(`Child exited with code ${code}`);
                        if (code === 0) {
                            res.status(204).send({ response : 'order deleted' });
                        } else {
                            res.status(500).send({ error : 'server troubles' });
                        }
                    });
                }
            });
        }
    });
});

app.get('*', function(req, res) {
    res.render('base', {
        title: 'Mixr'
    });
});

let server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});