const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    jumlah: Number,
    stokMasuk: Number,
    stokKeluar: Number,
    productID: { type: Schema.Types.ObjectId, ref: 'Barang' },
    suplierID: { type: Schema.Types.ObjectId, ref: 'Suplier' },
    distributorID: { type: Schema.Types.ObjectId, ref: 'Distributor' }
}, { timestamps: true });

module.exports = mongoose.model('Reports', reportSchema);
