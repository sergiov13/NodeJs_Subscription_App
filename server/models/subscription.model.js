const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    customerId: {type: String, required: true},
    productName: {type: String, required: true},
    domain: {type: String, required: true},
    startDate: {type: Date, required: true},
    durationMonths: {type: Number, treuquired: true}
}, {
    timestamps: true,
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;