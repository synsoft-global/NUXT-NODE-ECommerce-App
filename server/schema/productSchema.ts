import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId },
    sub_user_id: { type: Schema.Types.ObjectId },
    user: Object,
    name: String,
    formOption: String,
    url: { type: String },
    images: Array,
    category: String,
    category2: String,
    category3: String,
    status: String,
    committed: { type: Number, default: 0 },
    in: { type: Number, default: 0 },
    price: Number,
    priceCompare: Number,
    costPerItem: Number,
    enableSplitPrice: { type: Boolean, default: false },
    splitPriceData: Array,
    whosale: { type: Boolean, default: false },
    whosaleData: Array,
    type: { type: String, default: 'simple' },
    multiplyVariations: { type: Boolean, default: false },
    cartOrder: { type: Boolean, default: true },
    addQuantity: { type: Boolean, default: false },
    marketPlaceStyle: { type: Boolean, default: true },
    attributes: Array,
    variablePrices: Array,
    variantImages: Array,
    SKU: String,
    barcode: String,
    trackQuantity: { type: Boolean, default: false },
    continueSelling: { type: Boolean, default: false },
    available: { type: Number, default: 0 },
}, {
    collection: 'product',
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema);
export default Product