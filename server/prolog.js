const prolog = require('tau-prolog');
const concatAsync = require('./concatAsync');

// console.log('gfds');
// console.log(prolog);

// const session = prolog.create();

// session.consult('./facts/expressed_in.pl', {
//   success: () => console.log('Parsed'),
//   error: (err) => console.log(err),
// });

// concatAsync('./facts', './combinedFacts.pl').then(() => console.log('Concat done.'));

const session = prolog.create();
const queryProlog = () => {
  return new Promise((resolve, reject) => {
    session.consult('./combinedFacts.pl', () => {
      console.log('Consult done.');
      session.query("expressedin('NRBP1', Y).", {
        success: () => {
          session.answer((answer) => {
            resolve(answer);
          });
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  });
};

queryProlog().then((res) => console.log(res));
