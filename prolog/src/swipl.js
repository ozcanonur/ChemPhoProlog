const parsePaths = require('./parsePaths');

// Parsing the swipl output
const parsePath = (path, pathList) => {
  if (path.tail === null) return pathList;

  const extendedHead =
    typeof path.head === 'string' ? parseHead(path, []) : parseHead(path.head, []);
  pathList.push(extendedHead);

  if (typeof path.head === 'string') return pathList;

  return parsePath(path.tail, pathList);
};

const parseHead = (head, extendedHead) => {
  if (!head.tail) return extendedHead;

  extendedHead.push(head.head);
  parseHead(head.tail, extendedHead);

  return extendedHead;
};

module.exports = { parsePath };
