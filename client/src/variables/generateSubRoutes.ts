import KinaseDetailsDescription from 'components/KinaseDetails/Description/Description';
import KinaseDetailsKnownPerturbagens from 'components/KinaseDetails/KnownPerturbagens/KnownPerturbagens';
import KinaseDetailsSubstrates from 'components/KinaseDetails/Substrates/Substrates';

import PanoramaHorizontalIcon from '@material-ui/icons/PanoramaHorizontal';
import PerturbagenIcon from '@material-ui/icons/Healing';
import InfoIcon from '@material-ui/icons/Info';

const generateSubRoutes = (name: string): Route[] => {
  return [
    {
      path: `/${name}/description`,
      name: 'Description',
      icon: InfoIcon,
      component: KinaseDetailsDescription,
    },
    {
      path: `/${name}/substrates`,
      name: 'Substrates',
      icon: PanoramaHorizontalIcon,
      component: KinaseDetailsSubstrates,
    },
    {
      path: `/${name}/knownPerturbagens`,
      name: 'Known Perturbagens',
      icon: PerturbagenIcon,
      component: KinaseDetailsKnownPerturbagens,
    },
  ];
};

export default generateSubRoutes;
