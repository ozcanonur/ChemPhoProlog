import phosphatases from 'variables/phosphatases';

export const getExplanationForPath = (
  path: string[],
  observation: Pathway.PathwayObservation,
  regulatory: Pathway.Regulatory,
  stoppingReasons: Pathway.StoppingReasons
): string[][] => {
  const outputList = [];
  let prevBottomKPaActivity = 'inhibited';

  let startIndex = 0;
  // Manage if it's a phosphosite ending
  if (path.length > 0 && path[0].includes('(')) startIndex = 1;

  // Add the stop reason
  outputList.push([`Stopped at ${path[0]}, (${stoppingReasons[path[0]]})`, '', '']);

  for (let i = startIndex; i < path.length; i += 2) {
    const topKPa = path[i];
    const midPhosphosite = path[i + 1];
    const bottomKPa = path[i + 2];

    const topKPaActivity = prevBottomKPaActivity;
    const topKPaFunction = Object.keys(phosphatases).includes(topKPa) ? 'dephosphorylates' : 'phosphorylates';

    const foldChange = parseFloat(observation[midPhosphosite].fold_change);
    const reg = regulatory[midPhosphosite];

    const bottomKPaActivated = (foldChange > 0 && reg === 'p_inc') || (foldChange < 0 && reg === 'p_dec');
    const bottomKPaInhibited = (foldChange > 0 && reg === 'p_dec') || (foldChange < 0 && reg === 'p_inc');
    const bottomKPaActivity = bottomKPaActivated ? 'activated' : bottomKPaInhibited ? 'inhibited' : 'conflicting';

    const topKPaOutput = `${topKPa} is ${topKPaActivity}, (${topKPaFunction})`;
    const midPhosphositeOutput = `${midPhosphosite}, fc: ${foldChange}, reg: ${reg}`;
    const bottomKPaOutput = `${bottomKPa} is ${bottomKPaActivity}`;

    const isEnd = i === path.length - 2;

    const output = isEnd ? [topKPaOutput, midPhosphositeOutput, ''] : [topKPaOutput, midPhosphositeOutput, bottomKPaOutput];

    outputList.push(output);

    prevBottomKPaActivity = bottomKPaActivity;
  }

  return outputList;
};
