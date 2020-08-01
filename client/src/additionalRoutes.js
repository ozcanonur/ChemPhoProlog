import React from 'react';
import WelcomePage from 'views/Welcome/Welcome';

import PanoramaHorizontalIcon from '@material-ui/icons/PanoramaHorizontal';
import PerturbagenIcon from '@material-ui/icons/Healing';
import InfoIcon from '@material-ui/icons/Info';

export const additionalRoutes = (selection) => {
  return {
    perturbagenDetailsRoutes: [
      {
        path: '',
        name: selection,
        icon: '',
        component: () => <React.Fragment></React.Fragment>,
        layout: '/home/null',
      },
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
        path: `/${selection}/observationData`,
        name: 'Placeholder',
        icon: PanoramaHorizontalIcon,
        component: WelcomePage,
        layout: '/home',
      },
    ],
    kinaseDetailsRoutes: [
      {
        path: '',
        name: selection,
        icon: '',
        component: () => <React.Fragment></React.Fragment>,
        layout: '/home/null',
      },
      {
        path: `/${selection}/description`,
        name: 'Description',
        icon: InfoIcon,
        component: WelcomePage,
        layout: '/home',
      },
      {
        path: `/${selection}/knownPerturbagens`,
        name: 'Known Perturbagens',
        icon: PerturbagenIcon,
        component: WelcomePage,
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
    ],
  };
};
