const _ = require('lodash');

export const parsePaths = (prologOutput) => {
  const paths = []; // Legit paths Root > KPa > PsonKPa > KPa...
  const relations = {}; // KPa affects phosphosites
  let phosphosites = []; // Phosphosites that just EXIST
  const regulatory = {}; // Regulatory effect of phosphosites
  const stoppingReasons = {}; // Why we stopped

  prologOutput.forEach((output) => {
    let path = output.path;

    let parsedPath = [];
    for (let i = 0; i < path.length; i++) {
      const node = path[i];

      const [
        affected,
        affectedObs,
        affectedRegulatory,
        affecting,
        psOnAffecting,
        psOnAffectingObs,
        psOnAffectingRegulatory,
      ] = node;

      // If we are at the last node
      if (i === path.length - 1) {
        // na ending without KPa
        if (psOnAffecting === 'na' && affecting === 'na') {
          phosphosites.push(affected);
          regulatory[affected] = affectedRegulatory;
          stoppingReasons[affected] = output.explanation;
          parsedPath.push(affected);
          continue;
          // regular phosphosite ending
        } else if (psOnAffecting.includes('(')) {
          phosphosites.push(psOnAffecting);
          regulatory[psOnAffecting] = psOnAffectingRegulatory;
          stoppingReasons[psOnAffecting] = output.explanation;
          // parsedPath.push(psOnAffecting)
        } else {
          stoppingReasons[affecting] = output.explanation;
        }
      }

      parsedPath.push(affected);
      parsedPath.push(affecting);

      // One off fix for regular phosphosite ending
      if (i === path.length - 1 && psOnAffecting.includes('(')) parsedPath.push(psOnAffecting);

      if (!(affecting in relations)) relations[affecting] = [affected];
      else if (!relations[affecting].includes(affected)) relations[affecting].push(affected);
      regulatory[affected] = affectedRegulatory;
    }

    paths.push(parsedPath);
  });

  // Combine all phosphosites (from relations and leftovers)
  phosphosites = _.union(phosphosites, Object.values(relations).flat());

  return { paths, relations, phosphosites, regulatory, stoppingReasons };
};
