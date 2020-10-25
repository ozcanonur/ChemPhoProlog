"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../db"));
var lodash_1 = __importDefault(require("lodash"));
var util_1 = require("./util");
var router = express_1.default.Router();
// Kinase List > Sites
router.get('/phosphosites', function (req, res) {
    var _a = req.query, kinase = _a.kinase, detailed = _a.detailed;
    var query;
    var fields = [];
    if (kinase && detailed === 'true') {
        query =
            "select distinct x.location, x.residue, x.detected_in, coalesce(y.PsT_effect, 'unknown') as pst_effect, " +
                "x.reported_substrate_of, x.reported_pdt_of from " +
                "(select gene_name, residue, location, detected_in, reported_substrate_of, reported_pdt_of " +
                "from substrates_detailed where gene_name=?) as x " +
                "left join " +
                "(select TProtein, PsT_effect, residue_type, residue_offset from known_sign where TProtein = ?) as y " +
                "on x.residue = y.residue_type and x.location = y.residue_offset";
        fields.push(kinase);
        fields.push(kinase);
    }
    else if (kinase) {
        query = "select distinct substrate_id as substrate from Substrate where substrate_id like ? order by substrate_id";
        fields.push("%" + kinase + "(%");
    }
    else
        query = "select substrate_id as substrate from Substrate";
    db_1.default.all(query, fields, function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
router.get('/observation', function (req, res) {
    var _a = req.query, cellLine = _a.cellLine, perturbagen = _a.perturbagen, substrate = _a.substrate, min_fold_change = _a.min_fold_change, max_fold_change = _a.max_fold_change, min_p_value = _a.min_p_value, max_p_value = _a.max_p_value;
    var query = 'Select cell_line, perturbagen, substrate, fold_change, p_value, cv from Observation where ';
    var fields = [];
    if (lodash_1.default.isEmpty(req.query)) {
        var requiredAtLeastOneOf = 'cell_line, perturbagen, substrate, min_fold_change, max_fold_change, min_p_value, max_p_value';
        return res.status(400).send({ requiredAtLeastOneOf: requiredAtLeastOneOf });
    }
    if (cellLine) {
        query += 'cell_line = ?';
        fields.push(cellLine);
    }
    if (perturbagen) {
        query += 'perturbagen = ?';
        fields.push(perturbagen);
    }
    if (substrate) {
        query += 'substrate = ?';
        fields.push(substrate);
    }
    if (min_fold_change) {
        query += 'fold_change > ?';
        fields.push(min_fold_change);
    }
    if (max_fold_change) {
        query += 'fold_change < ?';
        fields.push(max_fold_change);
    }
    if (min_p_value) {
        query += 'p_value > ?';
        fields.push(min_p_value);
    }
    if (max_p_value) {
        query += 'p_value < ?';
        fields.push(max_p_value);
    }
    query = query.split('?').join('? and ').slice(0, -4);
    db_1.default.all(query, fields, function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
// Kinase details > Known perturbagens
router.get('/knownPerturbagens', function (req, res) {
    var kinase = req.query.kinase;
    var query = 'select perturbagen, source, score from PK_relationship ';
    var fields = [];
    if (kinase) {
        query += 'where kinase = ? order by perturbagen';
        fields.push(kinase);
    }
    db_1.default.all(query, fields, function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
// Kinase details > Known substrates
router.get('/knownSubstrates', function (req, res) {
    var KPa = req.query.KPa;
    var query = 'select PsT, sources from known_target ';
    var fields = [];
    if (KPa) {
        query += 'where KPa = ? order by PsT';
        fields.push(KPa);
    }
    db_1.default.all(query, fields, function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
// Perturbagen details > Known targets
router.get('/knownTargets', function (req, res) {
    var perturbagen = req.query.perturbagen;
    var query = "select kinase, source, score from PK_relationship where perturbagen = ? order by kinase";
    db_1.default.all(query, [perturbagen], function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
// Shared PDTs for kinase @kinasedetails/pdts
router.get('/pdts', function (req, res) {
    var _a = req.query, kinase = _a.kinase, cell_line = _a.cell_line;
    if (!kinase || !cell_line)
        return res.status(400).send({ requiredFields: 'kinase, cell_line' });
    var query = "select main.substrate, substrate.uniprot_name, main.confidence, main.shared_with from " +
        "(select x.substrate, x.confidence, group_concat(y.kinase, ', ') as shared_with from " +
        "(select * from KS_relationship where kinase = ? and source='PDT' and cell_line = ? " +
        "and confidence <> '0.0' and confidence <> '-1.0') as x " +
        "left join " +
        "(select * from KS_relationship where source='PDT' and cell_line = ? and confidence <> '0.0' and confidence <> '-1.0') as y " +
        "on x.substrate = y.substrate and x.kinase <> y.kinase group by x.substrate) as main " +
        "left join substrate on main.substrate = substrate.substrate_id order by main.substrate";
    db_1.default.all(query, [kinase, cell_line, cell_line], function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
// Prolog things
router.get('/pathway', function (req, res) {
    var _a = req.query, cellLine = _a.cellLine, perturbagen = _a.perturbagen, substrate = _a.substrate, onlyKinaseEnds = _a.onlyKinaseEnds;
    if (!(cellLine && perturbagen && substrate && onlyKinaseEnds)) {
        var requiredFields = 'cellLine, perturbagen, substrate, onlyKinaseEnds';
        return res.status(400).send({ requiredFields: requiredFields });
    }
    var query = "select path, explanation, inhibited from Paths where cellLine = ? and perturbagen = ? and substrate = ?";
    db_1.default.all(query, [cellLine, perturbagen, substrate], function (err, rows) {
        if (err)
            throw err;
        var parsed = util_1.parsePaths(rows);
        res.send(parsed);
    });
});
exports.default = router;
