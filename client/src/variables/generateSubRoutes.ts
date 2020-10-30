import KinaseDetailsDescription from 'components/KinaseDetails/Description/Description';
import KinaseDetailsKnownPerturbagens from 'components/KinaseDetails/KnownPerturbagens/KnownPerturbagens';
import KinaseDetailsSubstrates from 'components/KinaseDetails/Substrates/Substrates';
import PerturbagenDetailsDescription from 'components/PerturbagenDetails/Description/Description';
import PerturbagenDetailsKnownTargets from 'components/PerturbagenDetails/KnownTargets/KnownTargets';

import PanoramaHorizontalIcon from '@material-ui/icons/PanoramaHorizontal';
import PerturbagenIcon from '@material-ui/icons/Healing';
import InfoIcon from '@material-ui/icons/Info';

const generateSubRoutes = (type: string, selection: string): Route[] => {
  if (type === 'kinase') {
    return [
      {
        path: `/${selection}/description`,
        name: 'Description',
        icon: InfoIcon,
        component: KinaseDetailsDescription,
      },
      {
        path: `/${selection}/substrates`,
        name: 'Substrates',
        icon: PanoramaHorizontalIcon,
        component: KinaseDetailsSubstrates,
      },
      {
        path: `/${selection}/knownPerturbagens`,
        name: 'Known Perturbagens',
        icon: PerturbagenIcon,
        component: KinaseDetailsKnownPerturbagens,
      },
    ];
  }
  return [
    {
      path: `/${selection}/description`,
      name: 'Description',
      icon: InfoIcon,
      component: PerturbagenDetailsDescription,
    },
    {
      path: `/${selection}/knownTargets`,
      name: 'Known Targets',
      icon: PerturbagenIcon,
      component: PerturbagenDetailsKnownTargets,
    },
  ];
};

export default generateSubRoutes;
