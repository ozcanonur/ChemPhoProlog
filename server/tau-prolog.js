const fs = require('fs');
const prolog = require('tau-prolog');

// Handles promise rejects, similar to try/catch but fancier
const handleError = (fn) => (...params) => fn(...params).catch(console.error);

const session = prolog.create();

const askQuery = (query) => {
  return new Promise((resolve, reject) => {
    session.query(query, {
      success: () => {
        resolve();
      },
      error: (err) => {
        reject(new Error(err));
      },
    });
  });
};

const getAnswer = () => {
  return new Promise((resolve, reject) => {
    session.answer({
      success: (answer) => {
        resolve(answer);
      },
      error: (err) => {
        reject(new Error(err));
      },
      fail: () => {
        reject(new Error('Get answer failed'));
      },
      limit: () => {
        reject(new Error('Limit exceeded'));
      },
    });
  });
};

const consultFile = (file) => {
  return new Promise((resolve, reject) => {
    session.consult(file, {
      success: () => {
        resolve();
      },
      error: (err) => {
        reject(new Error(err));
      },
    });
  });
};

const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i += 1) {
    await callback(array[i], i, array);
  }
};

const consultFiles = async (files) => {
  await asyncForEach(files, async (file) => {
    await consultFile(file);
  });
};

let files = [];
fs.readdirSync(path.join(__dirname, '/facts')).forEach((file) => {
  files.push(`./facts/${file}`);
});
console.log(files);

handleError(async () => {
  console.log('Started consult..');
  console.time('consult');
  // await consultFiles(files);
  console.timeEnd('consult');
})();

// const query = "findall(X, expressedin(X, 'MCF7'), List).";

// console.log(session);
// localStorage.setItem('prologSession', JSON.stringify(session));
// console.log(JSON.parse(localStorage.getItem('prologSession')));
// if (typeof localStorage === 'undefined' || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }

// handleError(async () => {
//   await consultFiles(files);
//   await askQuery(query);
//   const answer = await getAnswer();
//   console.log(prolog.format_answer(answer));
// })();
