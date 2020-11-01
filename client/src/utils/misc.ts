/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line import/prefer-default-export
export const shortenExpressedIns = (data: Kinase[]): Kinase[] => {
  data.forEach((row) => {
    const { expressed_in } = row;

    let newField = '';
    if (expressed_in) {
      expressed_in.split(' ').forEach((field) => {
        if (field.includes('MCF')) newField += 'MCF ';
        else if (field.includes('HL')) newField += 'HL ';
        else if (field.includes('NTERA')) newField += 'NT';
      });
    }

    // eslint-disable-next-line no-param-reassign
    row.expressed_in = newField;
  });

  return data;
};
