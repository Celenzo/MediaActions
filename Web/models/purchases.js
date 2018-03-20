var mongoose = require('mongoose');
var PurchasesSchema = new mongoose.Schema({
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
});

var Purchases = mongoose.model('Purchases', PurchasesSchema);
module.exports = Purchases;
