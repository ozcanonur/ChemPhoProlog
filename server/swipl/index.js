const parsePaths = require('./parse');
const { lastIndexOf } = require('lodash');
///////////////////////////////////
//////////////CONSULT//////////////
///////////////////////////////////
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

const consultFiles = (swipl, files) => {
  files.forEach((file) => {
    swipl.call(`consult("${file}").`);
  });
};
///////////////////////////////////

///////////////////////////////////
//////////////PARSE////////////////
///////////////////////////////////
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
///////////////////////////////////

///////////////////////////////////
//////////////QUERY////////////////
///////////////////////////////////
const queryProlog = (swipl, cellLine, perturbagen, substrate, onlyKinaseEnds) => {
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
    './facts/rules_bottomup.pl',
    `./facts/${perturbagen}.pl`,
  ];

  console.log('Consult started');
  consultFiles(swipl, filesToConsult);

  // Query
  const query = new swipl.Query(
    `perturbed_path_init('MCF7', '${perturbagen}', '${substrate}', Path, Explanation, Inhibited).`
  );

  let node = null;
  let paths = [];
  while ((node = query.next())) {
    const path = parsePath(node.Path, []);
    paths.push({ path, explanation: node.Explanation, inhibited: node.Inhibited });
  }

  if (onlyKinaseEnds === 'true') {
    paths = paths.filter((path) => {
      const lastStep = path.path[path.path.length - 1];
      const endsWithKPaAndPs = lastStep[4].includes('(');
      const endsWithPs = lastStep[3] === 'na' && lastStep[4] === 'na';
      return !(endsWithKPaAndPs || endsWithPs);
    });
  } else {
    console.log('else');
  }

  query.close();
  console.log('Query end');

  return parsePaths(paths);
};

module.exports = queryProlog;
