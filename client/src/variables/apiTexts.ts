const apiTexts = [
  {
    cardTitle: 'Pathway',
    header: `GET /api/pathway`,
    text:
      'This endpoint allows you to generate and retrieve custom bottom-up pathway information given a cell line, perturbagen and a phosphosite.',
  },
  {
    cardTitle: 'Observation',
    header: 'GET /api/observation',
    text: 'Experimental / observational data that used to observe phosphorylation among many phosphosites.',
  },
  {
    cardTitle: 'Phosphosites',
    header: 'GET /api/phosphosites',
    text: 'Phosphosites that were analysed.',
  },
  {
    cardTitle: 'Known Substrates',
    header: 'GET /api/knownSubstrates',
    text: 'Previously reported substrates of a given kinase or phosphatase.',
  },
  {
    cardTitle: 'PDTs',
    header: 'GET /api/PDTs',
    text: 'Findings for putative downstream targets of a given kinase or phosphatase',
  },
  {
    cardTitle: 'Known Perturbagens',
    header: 'GET /api/knownPerturbagens',
    text: 'Previously reported perturbagens that were observed to inhibit/activate a given kinase or phosphatase',
  },
  {
    cardTitle: 'Known Perturbagen Targets',
    header: 'GET /api/knownTargets',
    text: 'Previously reported kinase / phosphatase targets of a given perturbagen',
  },
];

export default apiTexts;
