import addSidebarRouteKinase from 'actions/Sidebar/addSidebarRouteKinase';
import kinaseIds from 'views/Pathway/variables/kinaseIds';

const cxtmenuOptions = (dispatchFunc) => {
  return {
    menuRadius: 100,
    selector: '.KPa',
    commands: [
      {
        fillColor: 'rgba(0, 0, 0, 0.4)',
        content: 'Add to sidebar',
        contentStyle: {
          fontWeight: 500,
        },
        select: (ele) => {
          dispatchFunc(addSidebarRouteKinase(ele.data().id));
        },
        enabled: true,
      },
      {
        fillColor: 'rgba(255, 152, 0,.4)',
        content: 'Go to UniProt',
        contentStyle: {
          fontWeight: 500,
        },
        select: (ele) => {
          const id = kinaseIds[ele.data().id];
          window.open(`https://www.uniprot.org/uniprot/${id}`, '_blank');
        },
        enabled: true,
      },
    ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
    fillColor: 'rgba(0, 0, 0, 0.4)',
    activeFillColor: 'rgba(75, 119, 190, 0.6)', // the colour used to indicate the selected command
    activePadding: 20, // additional size in pixels for the active command
    indicatorSize: 24, // the size in pixels of the pointer to the active command
    separatorWidth: 3, // the empty spacing in pixels between successive commands
    spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
    minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
    maxSpotlightRadius: 24, // the maximum radius in pixels of the spotlight
    openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
    itemColor: 'white',
    itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
    zIndex: 9999,
    atMouse: false,
  };
};

export default cxtmenuOptions;
