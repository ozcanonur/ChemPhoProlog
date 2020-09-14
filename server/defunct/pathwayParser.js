// const _ = require('lodash');

// String.prototype.replaceAll = function (search, replacement) {
//   var target = this;
//   return target.split(search).join(replacement);
// };

// const parseCSVToPaths = (csvData) => {
//   const paths = []; // Legit paths Root > KPa > PsonKPa > KPa...
//   const relations = {}; // KPa affects phosphosites
//   let phosphosites = []; // Phosphosites that just EXIST
//   const regulatory = {}; // Regulatory effect of phosphosites
//   const stoppingReasons = {}; // Why we stopped

//   csvData.forEach((row) => {
//     let path = row.Path;
//     path = path.substring(1, path.length - 1);
//     path = path.split(/\[(.+?)\]/);

//     let parsedPath = [];
//     for (let i = 1; i < path.length - 1; i += 2) {
//       let step = path[i].split(', ');
//       step = step.map((e) => e.replaceAll("'", ''));

//       const affected = step[0];
//       const affecting = step[3];
//       // If we are at the last node
//       if (i === path.length - 2) {
//         // na ending without KPa
//         if (step[4] === 'na' && step[3] === 'na') {
//           phosphosites.push(step[0]);
//           regulatory[step[0]] = step[2];
//           stoppingReasons[step[0]] = row.Explanation;
//           parsedPath.push(step[0]);
//           continue;
//           // regular phosphosite ending
//         } else if (step[4].includes('(')) {
//           phosphosites.push(step[4]);
//           regulatory[step[4]] = step[6];
//           stoppingReasons[step[4]] = row.Explanation;
//           // parsedPath.push(step[4])
//         } else {
//           stoppingReasons[step[3]] = row.Explanation;
//         }
//       }

//       parsedPath.push(affected);
//       parsedPath.push(affecting);
//       // One off fix for regular phosphosite ending
//       if (i === path.length - 2 && step[4].includes('(')) parsedPath.push(step[4]);

//       if (!(affecting in relations)) relations[affecting] = [affected];
//       else if (!relations[affecting].includes(affected)) relations[affecting].push(affected);
//       regulatory[step[0]] = step[2];
//     }
//     paths.push(parsedPath);
//   });

//   // Combine all phosphosites (from relations and leftovers)
//   phosphosites = _.union(phosphosites, Object.values(relations).flat());

//   return { paths, relations, phosphosites, regulatory, stoppingReasons };
// };

// module.exports = parseCSVToPaths;
