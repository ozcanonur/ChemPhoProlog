/* eslint-disable @typescript-eslint/naming-convention */
import { pick } from 'lodash';

interface PkData {
  kinase: string;
  perturbagen: string;
  source: string;
  score: string;
}

interface PDT {
  confidence: string;
  shared_with: string;
  substrate: string;
  uniprot_name: string;
}

export const formatObservation = (data: Observation[]) => {
  const relevantFieldsPicked = data.map((e) =>
    pick(e, ['perturbagen', 'fold_change'])
  );
  const decimalsCutRes = relevantFieldsPicked.map((e) => {
    return {
      ...e,
      fold_change: Math.round(e.fold_change * 1e2) / 1e2,
    };
  });
  return decimalsCutRes;
};

export const getBarChartLabel = (perturbagen: string, pkData: PkData[]) => {
  const hasIndicator = pkData.some((row) => row.perturbagen === perturbagen);
  return hasIndicator ? '*' : '';
};

export const getChartData = (PDTs: PDT[]) => {
  const sharedWithList: string[] = [];
  PDTs.forEach((entry) => {
    const { shared_with } = entry;
    if (shared_with !== null) sharedWithList.push(...shared_with.split(', '));
  });

  const sharedWithCount: { [key: string]: number } = {};
  sharedWithList.forEach((shared) => {
    sharedWithCount[shared] = (sharedWithCount[shared] || 0) + 1;
  });

  const chartData = Object.entries(sharedWithCount).map((e) => {
    return {
      Kinase: e[0],
      Count: e[1],
    };
  });

  return chartData.sort((x, y) => y.Count - x.Count);
};
