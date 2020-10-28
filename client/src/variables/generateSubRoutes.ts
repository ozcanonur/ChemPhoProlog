import KinaseDetailsDescription from 'views/KinaseDetails/Description/';
import KinaseDetailsKnownPerturbagens from 'views/KinaseDetails/KnownPerturbagens/';
import KinaseDetailsSubstrates from 'views/KinaseDetails/Substrates/';

import PerturbagenDetailsDescription from 'views/PerturbagenDetails/Description';
import PerturbagenDetailsKnownTargets from 'views/PerturbagenDetails/KnownTargets';

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
