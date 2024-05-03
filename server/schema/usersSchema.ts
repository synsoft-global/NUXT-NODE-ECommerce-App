import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    username: String,
    phone: String,
    profile_picture: String,
    email: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    monthly_volume: String,
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' },
    is_active: Boolean,
    balance: { type: Number, default: 0 },
    forgot_password: Object,
    role: { type: String, default: 'user' },
    role_id: { type: Schema.Types.ObjectId, ref: 'Role' },
    isVerifiedEmail: { type: Boolean, default: true },
    isVerifiedPhone: { type: Boolean, default: true },
}, {
    collection: 'users',
    timestamps: true
})

const User = mongoose.model('User', UserSchema);
export default User