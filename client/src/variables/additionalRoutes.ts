import WelcomePage from 'views/Welcome';

import KinaseDetailsDescription from 'views/KinaseDetails/Description/';
import KinaseDetailsKnownPerturbagens from 'views/KinaseDetails/KnownPerturbagens/';
import KinaseDetailsSubstrates from 'views/KinaseDetails/Substrates/';

import PerturbagenDetailsDescription from 'views/PerturbagenDetails/Description';
import PerturbagenDetailsKnownTargets from 'views/PerturbagenDetails/KnownTargets';
import PerturbagenDetailsNewTargets from 'views/PerturbagenDetails/NewTargets';
import PerturbagenDetailsObservationData from 'views/PerturbagenDetails/ObservationData';

import PanoramaHorizontalIcon from '@material-ui/icons/PanoramaHorizontal';
import PerturbagenIcon from '@material-ui/icons/Healing';
import InfoIcon from '@material-ui/icons/Info';

// eslint-disable-next-line consistent-return
const additionalRoutes = (type, selection) => {
  if (type === 'kinase') {
    return [
      {
        path: `/${selection}/description`,
        name: 'Description',
        icon: InfoIcon,
        component: KinaseDetailsDescription,
      },
      {
        path: `/${selection}/substrates`,
        name: 'Substrates',
        icon: PanoramaHorizontalIcon,
        component: KinaseDetailsSubstrates,
      },
      {
        path: `/${selection}/knownPerturbagens`,
        name: 'Known Perturbagens',
        icon: PerturbagenIcon,
        component: KinaseDetailsKnownPerturbagens,
      },
      {
        path: `/${selection}/newPerturbagens`,
        name: 'New Perturbagens',
        icon: PerturbagenIcon,
        component: WelcomePage,
      },
    ];
  }
  if (type === 'perturbagen') {
    return [
      {
        path: `/${selection}/description`,
        name: 'Description',
        icon: InfoIcon,
        component: PerturbagenDetailsDescription,
      },
      {
        path: `/${selection}/knownTargets`,
        name: 'Known Targets',
        icon: PerturbagenIcon,
        component: PerturbagenDetailsKnownTargets,
      },
      {
        path: `/${selection}/newTargets`,
        name: 'New Targets',
        icon: PerturbagenIcon,
        component: PerturbagenDetailsNewTargets,
      },
      {
        path: `/${selection}/observationData`,
        name: 'Observation data',
        icon: PanoramaHorizontalIcon,
        component: PerturbagenDetailsObservationData,
      },
    ];
  }
};

export default additionalRoutes;
