"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaths = void 0;
var lodash_1 = __importDefault(require("lodash"));
exports.parsePaths = function (pathsFromDB) {
    var paths = []; // Legit paths Root > KPa > PsonKPa > KPa...
    var relations = {}; // KPa affects phosphosites
    var phosphosites = []; // Phosphosites that just EXIST
    var regulatory = {}; // Regulatory effect of phosphosites
    var stoppingReasons = {}; // Why we stopped
    pathsFromDB.forEach(function (pathFromDB) {
        // Adding comma to allow cleaner regex
        // Split by every 7th word
        var path = (pathFromDB.path + ',').match(/(.*?\,){7}/g);
        var parsedPath = [];
        for (var i = 0; i < path.length; i++) {
            var step = path[i].split(',');
            var affected = step[0], affectedObs = step[1], affectedRegulatory = step[2], affecting = step[3], psOnAffecting = step[4], psOnAffectingObs = step[5], psOnAffectingRegulatory = step[6];
            // If we are at the last step
            if (i === path.length - 1) {
                // na ending without KPa
                if (psOnAffecting === 'na' && affecting === 'na') {
                    phosphosites.push(affected);
                    regulatory[affected] = affectedRegulatory;
                    stoppingReasons[affected] = pathFromDB.explanation;
                    parsedPath.push(affected);
                    continue;
                    // regular phosphosite ending
                }
                else if (psOnAffecting.includes('(')) {
                    phosphosites.push(psOnAffecting);
                    regulatory[psOnAffecting] = psOnAffectingRegulatory;
                    stoppingReasons[psOnAffecting] = pathFromDB.explanation;
                    // parsedPath.push(psOnAffecting)
                }
                else {
                    stoppingReasons[affecting] = pathFromDB.explanation;
                }
            }
            parsedPath.push(affected);
            parsedPath.push(affecting);
            // One off fix for regular phosphosite ending
            if (i === path.length - 1 && psOnAffecting.includes('('))
                parsedPath.push(psOnAffecting);
            if (!(affecting in relations))
                relations[affecting] = [affected];
            else if (!relations[affecting].includes(affected))
                relations[affecting].push(affected);
            regulatory[affected] = affectedRegulatory;
        }
        paths.push(parsedPath);
    });
    // Combine all phosphosites (from relations and leftovers)
    phosphosites = lodash_1.default.union(phosphosites, Object.values(relations).flat());
    return { paths: paths, relations: relations, phosphosites: phosphosites, regulatory: regulatory, stoppingReasons: stoppingReasons };
};
