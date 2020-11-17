/* eslint-disable @typescript-eslint/naming-convention */

interface ObsData {
  perturbagen: string;
  substrate: string;
  cell_line: string;
  fold_change: number;
}

/* Required format for heatmap
  cellLine: 'MCF-7',
  AZD1480: -15.2342,
  Torin: 15.2324,
  ..
  */
export const createHeatmapObject = (obsData: ObsData[], cellLine: string) => {
  const filtered = obsData.filter((e) => e.cell_line === cellLine);

  const result: { [key: string]: string | number } = { cellLine };
  filtered.forEach((observation) => {
    const { perturbagen, fold_change } = observation;
    result[perturbagen] = fold_change;
  });

  return result;
};
