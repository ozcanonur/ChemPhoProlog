import { parsePaths } from './parsePaths';

String.prototype.replaceAll = function (search, replacement) {
  return this.split(search).join(replacement);
};

// Consult
const consultFiles = (swipl, files) => {
  files.forEach((file) => {
    swipl.call(`consult("${file}").`);
  });
};

// Parsing the swipl output
const parsePath = (path, pathList) => {
  if (path.tail === null) return pathList;

  const extendedHead = parseHead(path.head, []);
  pathList.push(extendedHead);

  return parsePath(path.tail, pathList);
};

const parseHead = (head, extendedHead) => {
  if (!head.tail) return extendedHead;

  extendedHead.push(head.head);
  parseHead(head.tail, extendedHead);

  return extendedHead;
};

// Query
export const queryProlog = (swipl, { cellLine, perturbagen, substrate, onlyKinaseEnds }) => {
  // Fix cell line string because prolog facts have it differently
  if (cellLine === 'MCF-7') cellLine = 'MCF7';
  else if (cellLine === 'HL-60') cellLine = 'HL60';
  else if (cellLine === 'NTERA-2 clone D1') cellLine = 'NTERA';

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
  ];

  // Also consult specific perturbagen observation file if provided
  if (perturbagen) filesToConsult.push(`./facts/${cellLine}/${perturbagen}.pl`);

  console.log('Consult started');
  consultFiles(swipl, filesToConsult);

  // Query
  const queryString = `perturbed_path_init('${cellLine}', '${perturbagen}', '${substrate}', Path, Explanation, Inhibited).`;
  const query = new swipl.Query(queryString);

  let node = null;
  let paths = [];
  while ((node = query.next())) {
    const path = parsePath(node.Path, []);
    paths.push({ path, explanation: node.Explanation, inhibited: node.Inhibited });
  }

  // Filter phosphosite ends if specified, keep if there are no paths (so only the ps start)
  if (onlyKinaseEnds === 'true') {
    paths = paths.filter((path) => {
      const lastStep = path.path[path.path.length - 1];
      const singleNode = path.path.length === 1 && paths.length === 1;

      const endsWithKPaAndPs = lastStep[4].includes('(');
      const endsWithPs = lastStep[3] === 'na' && lastStep[4] === 'na';
      return !(endsWithKPaAndPs || endsWithPs) || singleNode;
    });
  }
  query.close();
  console.log('Query end');

  // Parse the final output into data before sending back to client
  return parsePaths(paths);
};
