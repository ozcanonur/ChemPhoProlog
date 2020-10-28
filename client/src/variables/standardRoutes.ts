import Welcome from 'views/Welcome/index';
import KinaseList from 'freshComponents/Kinases/Kinases';
import PerturbagenList from 'views/PerturbagenList';
import Pathway from 'views/Pathway';
import API from 'views/API';

import Home from '@material-ui/icons/Home';
import PanoramaHorizontal from '@material-ui/icons/PanoramaHorizontal';
import Healing from '@material-ui/icons/Healing';
import Web from '@material-ui/icons/Web';
import TrendingDown from '@material-ui/icons/TrendingDown';

const routes = [
  {
    path: '/home',
    name: 'Home',
    icon: Home,
    component: Welcome,
  },
  {
    path: '/kinases',
    name: 'Kinases',
    icon: PanoramaHorizontal,
    component: KinaseList,
  },
  {
    path: '/perturbagens',
    name: 'Perturbagens',
    icon: Healing,
    component: PerturbagenList,
  },
  {
    path: '/pathways',
    name: 'Pathways',
    icon: TrendingDown,
    component: Pathway,
  },
  {
    path: '/api',
    name: 'API',
    icon: Web,
    component: API,
  },
];

export default routes;
