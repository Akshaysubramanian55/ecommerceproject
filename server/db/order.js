const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    productId: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    userId: {
        type: String, // Corrected type to String
        ref: 'user',
        required: true
    },
    quantities: [{
        type: Number,
        required: true
    }]
});

module.exports = mongoose.model('order', orderSchema);

