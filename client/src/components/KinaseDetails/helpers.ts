/* eslint-disable @typescript-eslint/naming-convention */
import { pick } from 'lodash';

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

export const formatObservation = (data: Observation[]) => {
  const relevantFieldsPicked = data.map((e) => pick(e, ['perturbagen', 'substrate', 'cell_line', 'fold_change']));
  const decimalsCut = relevantFieldsPicked.map((e) => {
    return {
      ...e,
      fold_change: Math.round(parseFloat(e.fold_change) * 1e2) / 1e2,
    };
  });
  return decimalsCut;
};
