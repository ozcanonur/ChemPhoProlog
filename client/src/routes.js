// core components/views for Admin layout
import WelcomePage from 'views/Home/Welcome.js';
import KinaseList from 'views/Home/KinaseList';
import PerturbagenList from 'views/Home/PerturbagenList';

import AboutUs from 'views/Home/AboutUs';

import HomeIcon from '@material-ui/icons/Home';
import PanoramaHorizontalIcon from '@material-ui/icons/PanoramaHorizontal';
import PerturbagenIcon from '@material-ui/icons/Healing';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import InfoIcon from '@material-ui/icons/Info';
import WebIcon from '@material-ui/icons/Web';

const dashboardRoutes = [
  {
    path: '/welcome',
    name: 'Home',
    icon: HomeIcon,
    component: WelcomePage,
    layout: '/home',
  },
  {
    path: '/kinaseList',
    name: 'Kinase List',
    icon: PanoramaHorizontalIcon,
    component: KinaseList,
    layout: '/home',
  },
  {
    path: '/perturbagenList',
    name: 'Perturbagen List',
    icon: PerturbagenIcon,
    component: PerturbagenList,
    layout: '/home',
  },
  {
    path: '/observationData',
    name: 'Observation Data',
    icon: ZoomInIcon,
    component: WelcomePage,
    layout: '/home',
  },
  {
    path: '/omnipathData',
    name: 'Omnipath Data',
    icon: AccountTreeIcon,
    component: WelcomePage,
    layout: '/home',
  },
  {
    path: '/aboutUs',
    name: 'About Us',
    icon: InfoIcon,
    component: AboutUs,
    layout: '/home',
  },
  {
    path: '/api',
    name: 'API',
    icon: WebIcon,
    component: WelcomePage,
    layout: '/home',
  },
];

export default dashboardRoutes;
