const Database = require('better-sqlite3');

const db = new Database('chemphopro2.db', { verbose: console.log });

const fields = '(cellLine, perturbagen, substrate, path, explanation, inhibited)';
const values = '(@cellLine, @perturbagen, @substrate, @path, @explanation, @inhibited)';

const insert = db.prepare(`INSERT INTO Paths ${fields} VALUES ${values}`);

const insertMany = db.transaction((items) => {
  for (let item of items) insert.run(item);
});

const select = (query) => {
  return db.prepare(query);
};

module.exports = { insertMany, select };
