import WelcomePage from 'views/Welcome/Welcome';
import KinaseDetailsDescription from 'views/KinaseDetails/Description/Description';
import KinaseDetailsKnownPerturbagens from 'views/KinaseDetails/KnownPerturbagens/KnownPerturbagens';

import PanoramaHorizontalIcon from '@material-ui/icons/PanoramaHorizontal';
import PerturbagenIcon from '@material-ui/icons/Healing';
import InfoIcon from '@material-ui/icons/Info';

export const additionalRoutes = (type, selection) => {
  if (type === 'kinase') {
    return [
      {
        path: `/${selection}/description`,
        name: 'Description',
        icon: InfoIcon,
        component: KinaseDetailsDescription,
        layout: '/home',
      },
      {
        path: `/${selection}/knownPerturbagens`,
        name: 'Known Perturbagens',
        icon: PerturbagenIcon,
        component: KinaseDetailsKnownPerturbagens,
        layout: '/home',
      },
      {
        path: `/${selection}/newPerturbagens`,
        name: 'New Perturbagens',
        icon: PerturbagenIcon,
        component: WelcomePage,
        layout: '/home',
      },
      {
        path: `/${selection}/knownSubstrates`,
        name: 'Known Substrates',
        icon: PanoramaHorizontalIcon,
        component: WelcomePage,
        layout: '/home',
      },
      {
        path: `/${selection}/PDTs`,
        name: 'PDTs',
        icon: PanoramaHorizontalIcon,
        component: WelcomePage,
        layout: '/home',
      },
    ];
  } else if (type === 'perturbagen') {
    return [
      {
        path: `/${selection}/description`,
        name: 'Description',
        icon: InfoIcon,
        component: WelcomePage,
        layout: '/home',
      },
      {
        path: `/${selection}/knownTargets`,
        name: 'Known Targets',
        icon: PerturbagenIcon,
        component: WelcomePage,
        layout: '/home',
      },
      {
        path: `/${selection}/newTargets`,
        name: 'New Targets',
        icon: PerturbagenIcon,
        component: WelcomePage,
        layout: '/home',
      },
      {
        path: `/${selection}/observationData`,
        name: 'Observation data',
        icon: PanoramaHorizontalIcon,
        component: WelcomePage,
        layout: '/home',
      },
      {
        path: `/${selection}/placeholder`,
        name: 'Placeholder',
        icon: PanoramaHorizontalIcon,
        component: WelcomePage,
        layout: '/home',
      },
    ];
  }
};
