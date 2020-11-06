interface KnownPerturbagen {
  perturbagen: string;
  score: string;
  source: string;
  chemspider_id: string;
  action: string;
  synonyms: string;
}

export const formatDataForTable = (data: KnownPerturbagen[]) => {
  return data.map((e) => ({ ...e, score: parseFloat(e.score).toFixed(2) })).map(Object.values);
};

export const findPerturbagenInfo = (data: KnownPerturbagen[], selectedPerturbagen: string) => {
  return data.find((item) => item.perturbagen === selectedPerturbagen);
};
