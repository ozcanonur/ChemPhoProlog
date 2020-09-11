import Welcome from 'views/Welcome/index';
import KinaseList from 'views/KinaseList';
import PerturbagenList from 'views/PerturbagenList';
import Pathway from 'views/Pathway';

import Home from '@material-ui/icons/Home';
import PanoramaHorizontal from '@material-ui/icons/PanoramaHorizontal';
import Healing from '@material-ui/icons/Healing';
import Web from '@material-ui/icons/Web';
import TrendingDown from '@material-ui/icons/TrendingDown';

const routes = [
  {
    path: '/welcome',
    name: 'Home',
    icon: Home,
    component: Welcome,
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
    path: '/api',
    name: 'API',
    icon: Web,
    component: Welcome,
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

export default routes;
