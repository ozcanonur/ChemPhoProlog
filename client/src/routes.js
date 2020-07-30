import WelcomePage from 'views/Welcome/Welcome';
import KinaseList from 'views/Lists/KinaseList/KinaseList';
import PerturbagenList from 'views/Lists/PerturbagenList/PerturbagenList';
import AboutUs from 'views/AboutUs/AboutUs.js';

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
