import DataModel from "../models/Employee.js";
import e from "express";
import XLSX from 'xlsx';

const app = e();

export const getAllEmployees = async (req, res, next) => {
  console.log("getAllEmployees called");
  const data = await DataModel.find();
  res.json(data);
}

export const postEmployeeData = async (req, res, next) => {
  const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  try {
    await DataModel.insertMany(jsonData);
    res.status(200).json({ message: 'Data uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data', details: err });
  }
}