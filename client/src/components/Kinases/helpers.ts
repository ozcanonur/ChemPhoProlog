import { pick, zip } from 'lodash';

export const formatTableData = (data: Kinase[]) => {
  const relevantFieldsPicked = data.map((e) =>
    pick(e, ['kinase_name', 'expressed_in', 'uniprot_id'])
  );
  return relevantFieldsPicked.map(Object.values);
};

export const findKinaseInfo = (data: Kinase[], selectedKinase: string) => {
  return data.find((item) => item.kinase_name === selectedKinase);
};

const getPhosphositeBySite = (
  data: { substrate: string }[],
  aminoacid: string
) => {
  return data
    .map(Object.values)
    .flat()
    .filter((phosphosite) => {
      return phosphosite.includes(`(${aminoacid}`);
    })
    .map((phosphosite) => {
      return phosphosite.substring(
        phosphosite.indexOf('(') + 1,
        phosphosite.length - 1
      );
    });
};
export const formatPhosphosites = (data: { substrate: string }[]) => {
  // Split the phosphosites per aminoacid
  const dividedPhosphosites = zip(
    getPhosphositeBySite(data, 'S'),
    getPhosphositeBySite(data, 'T'),
    getPhosphositeBySite(data, 'Y')
  );

  return dividedPhosphosites;
};
