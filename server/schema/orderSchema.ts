import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId },
    productId: { type: Schema.Types.ObjectId },
    user: Object,
    productname: String,
    name: String,
    status: { type: String, default: 'pending' },
    address: String,
    price: Number,
    paymentStatus: { type: String, default: 'unpaid' }, 
    quantity: { type: Number, required: true }, // Quantity of the product ordered
    shippingMethod: { type: String }, // Shipping method chosen for the order
    trackingNumber: { type: String }, // Tracking number for the shipment
    orderDate: { type: Date, default: Date.now }, // Date when the order was placed
    deliveryDate: { type: Date }, // Expected delivery date of the order
    notes: { type: String },
}, {
    collection: 'order',
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema);
export default Order