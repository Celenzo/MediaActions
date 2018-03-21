var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hub = require('../models/hub');

var PurchasesSchema = new Schema({
    customerId: {
        type: String,
        unique: false,
        required: false,
        trim: false
    },
    imageId: {
        type: String,
        unique: false,
        required: false,
        trim: false
    },
    date: {
        type : Date,
        unique: false,
        required: false,
        trim: false
    }
    ,
    imageValue: [{type: Schema.Types.ObjectId, ref: 'Hub' }]
});

var Purchases = mongoose.model('Purchases', PurchasesSchema);
module.exports = Purchases;
