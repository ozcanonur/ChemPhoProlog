"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3_1 = __importDefault(require("sqlite3"));
// Connect to the DB
var db = new sqlite3_1.default.Database('../chemphopro.db', sqlite3_1.default.OPEN_READONLY, function (err) {
    if (err)
        return console.error(err.message);
    console.log('Connected to ChemphoproDB');
});
exports.default = db;
