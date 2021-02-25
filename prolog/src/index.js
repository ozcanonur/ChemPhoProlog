const { parsePath } = require('./swipl');
const swipl = require('swipl');
const { insertMany, select } = require('./db');

String.prototype.replaceAll = function (search, replacement) {
  return this.split(search).join(replacement);
};

// Consult
const consultFiles = (files) => {
  files.forEach((file) => {
    swipl.call(`consult("${file}").`);
  });
};

// Query
const queryProlog = ({ cellLine, perturbagen, substrate, onlyKinaseEnds }) => {
  // Fix cell line string because prolog facts have it differently
  if (cellLine === 'MCF-7') cellLine = 'MCF7';
  else if (cellLine === 'HL-60') cellLine = 'HL60';
  else if (cellLine === 'NTERA-2 clone D1') cellLine = 'NTERA';

  // Query
  const queryString = `perturbed_path_init('${cellLine}', '${perturbagen}', '${substrate}', Path, Explanation, Inhibited).`;
  const query = new swipl.Query(queryString);

  console.time('query');
  let node = null;
  let paths = [];
  while ((node = query.next())) {
    const path = parsePath(node.Path, []);
    paths.push({ path, explanation: node.Explanation, inhibited: node.Inhibited });
  }
  console.timeEnd('query');
  query.close();

  // Parse the final output into data before sending back to client
  return paths;
};

const getPathsAndInsert = (cellLine) => {
  // Set directory
  swipl.call(`working_directory(_, "${__dirname.replaceAll('\\', '/')}").`);

  // Consult
  const filesToConsult = [
    './facts/expressed_in.pl',
    './facts/kinases.pl',
    './facts/knowninhibitor.pl',
    './facts/knownsign_uniq.pl',
    './facts/knowntarget_all.pl',
    './facts/phosphatases.pl',
    './facts/rules.pl',
    `./facts/${cellLine}.pl`,
  ];

  console.log('Consult started');
  consultFiles(filesToConsult);

  const validStartingPoints = select(
    'select distinct Observation_valid.cell_line, Observation_valid.perturbagen, Observation_valid.substrate ' +
      'from Observation_valid join known_target on Observation_valid.substrate = known_target.PsT ' +
      `where Observation_valid.cell_line = '${cellLine}' order by Observation_valid.substrate`
  ).all();

  const toBeInserted = [];
  let i = 0;
  validStartingPoints.forEach((point) => {
    const { cell_line, perturbagen, substrate } = point;
    const input = {
      cellLine: cell_line,
      perturbagen,
      substrate,
      onlyKinaseEnds: 'false',
    };

    console.log(`Starting ${cell_line}, ${perturbagen}, ${substrate}`);
    const paths = queryProlog(input);

    const result = paths.map((path) => {
      return {
        cellLine: cell_line,
        perturbagen,
        substrate,
        path: path.path.toString(),
        explanation: path.explanation,
        inhibited: path.inhibited,
      };
    });

    toBeInserted.push(...result);
    console.log(`${i} finished.`);
    i++;
  });

  insertMany(toBeInserted);
};

console.time('total');
['MCF-7', 'HL-60', 'NTERA-2 clone D1'].forEach((cellLine) => {
  getPathsAndInsert(cellLine);
});
console.timeEnd('total');

// select cellLine, perturbagen, substrate, count(path) as pathCount from paths group by cellLine, perturbagen, substrate order by pathCount desc
