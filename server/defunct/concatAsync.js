const fs = require('fs');
const async = require('async');
const path = require('path');

module.exports = function (directory, destination) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) return reject(err);

      files = files.map((file) => path.join(directory, file));

      //Read all files in parallel
      async.map(files, fs.readFile, (err, results) => {
        if (err) return reject(err);

        //results[0] contents of file #1
        //results[1] contents of file #2
        //results[n] ...

        //Write the joined results to destination
        fs.writeFile(destination, results.join('\n'), (err) => {
          if (err) return reject(err);

          resolve();
        });
      });
    });
  });
};
