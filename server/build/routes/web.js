"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../db"));
var router = express_1.default.Router();
// Kinase List
router.get('/getKinaseList', function (req, res) {
    var query = 'select * from Protein where kinase_name <> "" order by kinase_name';
    db_1.default.all(query, [], function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
// Global Search
router.get('/getAllKinases', function (req, res) {
    var query = 'select distinct kinase_name as kinase from protein where kinase_name not null';
    db_1.default.all(query, [], function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
// Perturbagen List
router.get('/getPerturbagenList', function (req, res) {
    var query = 'select * from Perturbagen group by name order by name';
    db_1.default.all(query, [], function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
// Global Search
router.get('/getAllSubstrates', function (req, res) {
    var query = 'select distinct substrate_id as substrate from substrate';
    db_1.default.all(query, [], function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
// Valid observations
router.get('/validObservation', function (req, res) {
    var _a = req.query, cellLine = _a.cellLine, perturbagen = _a.perturbagen;
    var query = 'select substrate, fold_change from pathCounts where cell_line = ? and perturbagen = ? order by maxDepth desc';
    db_1.default.all(query, [cellLine, perturbagen], function (err, rows) {
        if (err)
            throw err;
        var parsedRows = rows.map(function (_a) {
            var substrate = _a.substrate, fold_change = _a.fold_change;
            return substrate + ", fc: " + parseFloat(fold_change).toFixed(2);
        });
        res.send(parsedRows);
    });
});
exports.default = router;
