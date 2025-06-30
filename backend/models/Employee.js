import mongoose from "mongoose";

const DataModel = mongoose.model('ExcelData', new mongoose.Schema({}, { strict: false }));

export default DataModel;