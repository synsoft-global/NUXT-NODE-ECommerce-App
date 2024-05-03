import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: String,
    rules: Object
}, {
    collection: 'roles',
    timestamps: true
})
const Role = mongoose.model('Role', RoleSchema);
export default Role