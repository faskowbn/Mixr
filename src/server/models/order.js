/**
 * Created by brad on 3/28/2017.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let order = new Schema({
    orderTime: { type: Date, default: Date.now() },
    drink: { type: String, required: true },
    drinker: { type: String, required: false }
});

// the schema is useless so far
// we need to create a model using it
let Order = mongoose.model('Order', order);

// make this available to our users in our Node applications
module.exports = Order;