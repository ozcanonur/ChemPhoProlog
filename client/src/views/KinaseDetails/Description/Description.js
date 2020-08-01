import React from 'react';

const Description = ({ match }) => {
  const kinase = match.url.split('/')[2];

  return <div>Description for {kinase}</div>;
};

export default Description;
