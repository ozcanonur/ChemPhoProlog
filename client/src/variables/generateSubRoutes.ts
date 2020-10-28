import KinaseDetailsDescription from 'freshComponents/KinaseDetails/Description/';
import KinaseDetailsKnownPerturbagens from 'freshComponents/KinaseDetails/KnownPerturbagens/KnownPerturbagens';
import KinaseDetailsSubstrates from 'freshComponents/KinaseDetails/Substrates/Substrates';
import PerturbagenDetailsDescription from 'freshComponents/PerturbagenDetails/Description/Description';
import PerturbagenDetailsKnownTargets from 'freshComponents/PerturbagenDetails/KnownTargets/KnownTargets';

import PanoramaHorizontalIcon from '@material-ui/icons/PanoramaHorizontal';
import PerturbagenIcon from '@material-ui/icons/Healing';
import InfoIcon from '@material-ui/icons/Info';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

interface Route {
  path: string;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  component: () => JSX.Element;
}

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
