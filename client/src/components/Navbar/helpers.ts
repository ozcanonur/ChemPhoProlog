interface SearchResult {
  [key: string]: string;
}

export const filterSearchResults = (
  searchResults: SearchResult[],
  value: string
) => {
  // Filter it by the input value in the search field
  return searchResults.filter(
    (e) =>
      e[Object.keys(e)[0]]
        .toString()
        .toLowerCase()
        .indexOf(value.toLowerCase()) === 0
  );
};

export const getCurrentNav = (routes: Route[]) => {
  let name;
  let term = '';

  routes.map((route) => {
    if (window.location.href.indexOf(route.path) !== -1) name = route.name;
    if (window.location.href.split('/').length > 4)
      [, , , term] = window.location.href.split('/');
    return null;
  });

  return term !== '' ? `${name} for ${term}` : name;
};
