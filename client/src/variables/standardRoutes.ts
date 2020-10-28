import Home from 'freshComponents/Home/Home';
import Kinases from 'freshComponents/Kinases/Kinases';
import Perturbagens from 'freshComponents/Perturbagens/Perturbagens';
import Pathways from 'views/Pathway';
import API from 'freshComponents/API';

import HomeIcon from '@material-ui/icons/Home';
import PanoramaHorizontal from '@material-ui/icons/PanoramaHorizontal';
import Healing from '@material-ui/icons/Healing';
import Web from '@material-ui/icons/Web';
import TrendingDown from '@material-ui/icons/TrendingDown';

const routes = [
  {
    path: '/home',
    name: 'Home',
    icon: HomeIcon,
    component: Home,
  },
  {
    path: '/kinases',
    name: 'Kinases',
    icon: PanoramaHorizontal,
    component: Kinases,
  },
  {
    path: '/perturbagens',
    name: 'Perturbagens',
    icon: Healing,
    component: Perturbagens,
  },
  {
    path: '/pathways',
    name: 'Pathways',
    icon: TrendingDown,
    component: Pathways,
  },
  {
    path: '/api',
    name: 'API',
    icon: Web,
    component: API,
  },
];

export default routes;
