// const getFilesInDir = (directory) => {
//   let files = [];
//   fs.readdirSync(directory).forEach((file) => {
//     files.push(`./swipl/facts/${file}`);
//   });

//   return files;
// };

// // Pathway
// router.get('/api/pathway', (req, res) => {
//   (async () => {
//     const fileData = await fs.readFile('../toydata.csv');
//     parse(fileData, { columns: true, trim: true }, (err, csvData) => {
//       if (err) throw err;
//       const pathwayData = parseCSVToPaths(csvData);
//       res.send(pathwayData);
//     });
//   })();
// });
