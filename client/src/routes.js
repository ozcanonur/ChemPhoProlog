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
    componentDirectory: 'Welcome',
    layout: '/home',
  },
  {
    path: '/kinaseList',
    name: 'Kinase List',
    icon: PanoramaHorizontal,
    componentDirectory: 'KinaseList',
    layout: '/home',
  },
  {
    path: '/perturbagenList',
    name: 'Perturbagen List',
    icon: Healing,
    componentDirectory: 'PerturbagenList',
    layout: '/home',
  },
  {
    path: '/api',
    name: 'API',
    icon: Web,
    componentDirectory: 'Welcome',
    layout: '/home',
  },
  {
    path: '/pathway',
    name: 'Pathway',
    icon: TrendingDown,
    componentDirectory: 'Pathway',
    layout: '/home',
  },
];

export default routes;
