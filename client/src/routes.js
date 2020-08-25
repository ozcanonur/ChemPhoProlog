import WelcomePage from 'views/Welcome';
import KinaseList from 'views/Lists/KinaseList';
import PerturbagenList from 'views/Lists/PerturbagenList';
import AboutUs from 'views/AboutUs';
import Pathway from 'views/Pathway/index';

import Home from '@material-ui/icons/Home';
import PanoramaHorizontal from '@material-ui/icons/PanoramaHorizontal';
import Healing from '@material-ui/icons/Healing';
import Info from '@material-ui/icons/Info';
import Web from '@material-ui/icons/Web';
import TrendingDown from '@material-ui/icons/TrendingDown';

export const routes = [
  {
    path: '/welcome',
    name: 'Home',
    icon: Home,
    component: WelcomePage,
    layout: '/home',
  },
  {
    path: '/kinaseList',
    name: 'Kinase List',
    icon: PanoramaHorizontal,
    component: KinaseList,
    layout: '/home',
  },
  {
    path: '/perturbagenList',
    name: 'Perturbagen List',
    icon: Healing,
    component: PerturbagenList,
    layout: '/home',
  },

  {
    path: '/aboutUs',
    name: 'About Us',
    icon: Info,
    component: AboutUs,
    layout: '/home',
  },
  {
    path: '/api',
    name: 'API',
    icon: Web,
    component: WelcomePage,
    layout: '/home',
  },
  {
    path: '/pathway',
    name: 'Pathway',
    icon: TrendingDown,
    component: Pathway,
    layout: '/home',
  },
];
