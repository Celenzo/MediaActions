var mongoose = require('mongoose');
var PurchasesSchema = new mongoose.Schema({
    originalname: {
        type: String,
        unique: false,
        required: false,
        trim: true
    }
});

var Purchases = mongoose.model('Purchases', PurchasesSchema);
module.exports = Purchases;
