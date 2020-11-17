import _ from 'lodash';

interface dbResult {
  path: string;
  explanation: string;
  inhibited: string;
}

const parsePaths = (pathsFromDB: dbResult[]) => {
  const paths: string[][] = []; // Legit paths Root > KPa > PsonKPa > KPa...
  const relations: { [key: string]: string[] } = {}; // KPa affects phosphosites
  let phosphosites: string[] = []; // Phosphosites that just EXIST
  const regulatory: { [key: string]: string } = {}; // Regulatory effect of phosphosites
  const stoppingReasons: { [key: string]: string } = {}; // Why we stopped

  pathsFromDB.forEach((pathFromDB) => {
    // Adding comma to allow cleaner regex
    // Split by every 7th word
    const path = (pathFromDB.path + ',').match(/(.*?\,){7}/g);

    let parsedPath = [];
    for (let i = 0; i < path.length; i++) {
      let step = path[i].split(',');

      const [affected, affectedObs, affectedRegulatory, affecting, psOnAffecting, psOnAffectingObs, psOnAffectingRegulatory] = step;

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
        } else if (psOnAffecting.includes('(')) {
          phosphosites.push(psOnAffecting);
          regulatory[psOnAffecting] = psOnAffectingRegulatory;
          stoppingReasons[psOnAffecting] = pathFromDB.explanation;
          // parsedPath.push(psOnAffecting)
        } else {
          stoppingReasons[affecting] = pathFromDB.explanation;
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

export default parsePaths;
