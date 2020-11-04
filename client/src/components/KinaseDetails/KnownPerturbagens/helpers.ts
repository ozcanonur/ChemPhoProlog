interface KnownPerturbagen {
  perturbagen: string;
  score: number;
  source: string;
  chemspider_id: string;
  action: string;
  synonyms: string;
}

export const formatDataForTable = (data: KnownPerturbagen[]) => {
  return data
    .map(({ perturbagen, score, source, chemspider_id }) => {
      return { perturbagen, score, source, chemspider_id };
    })
    .map((e) => ({ ...e, score: e.score.toFixed(2) }))
    .map(Object.values);
};

export const findPerturbagenInfo = (data: KnownPerturbagen[], selectedPerturbagen: string) => {
  return data.find((item) => item.perturbagen === selectedPerturbagen);
};
