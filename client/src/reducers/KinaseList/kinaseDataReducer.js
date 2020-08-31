import pick from 'lodash/pick';

const formatKinaseData = (data) =>
  data.map((e) => pick(e, ['kinase_name', 'expressed_in', 'uniprot_id'])).map(Object.values);

export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_KINASE_DATA':
      return formatKinaseData(action.payload);
    default:
      return state;
  }
};
