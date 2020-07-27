// core components/views for Admin layout
import WelcomePage from 'views/Kinase/Welcome.js';
import KnownPerturbagens from 'views/Kinase/KnownPerturbagens';

import PerturbagenIcon from '@material-ui/icons/Healing';
import InfoIcon from '@material-ui/icons/Info';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExtensionIcon from '@material-ui/icons/Extension';

const dashboardRoutes = (term) => {
  return [
    {
      path: `/${term}/description`,
      name: 'Description',
      icon: InfoIcon,
      component: WelcomePage,
      layout: '/kinase',
    },
    {
      path: `/${term}/knownPerturbagens`,
      name: 'Known perturbagens',
      icon: PerturbagenIcon,
      component: KnownPerturbagens,
      layout: '/kinase',
    },
    {
      path: `/${term}/newPerturbagens`,
      name: 'New perturbagens',
      icon: WbSunnyIcon,
      component: WelcomePage,
      layout: '/kinase',
    },
    {
      path: `/${term}/knownSubstrates`,
      name: 'Known substrates',
      icon: FilterListIcon,
      component: WelcomePage,
      layout: '/kinase',
    },
    {
      path: `/${term}/pdts`,
      name: 'PDTs',
      icon: ExtensionIcon,
      component: WelcomePage,
      layout: '/kinase',
    },
  ];
};

export default dashboardRoutes;
