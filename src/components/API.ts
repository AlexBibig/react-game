export async function getAllCountries() {
  const response = await fetch(
    'https://restcountries.eu/rest/v2/all',
  );

  const result = await response.json();

  const countriesArr = result
    .slice()
    .filter(
      (el: any) =>
        el.name.length < 15 &&
        el.population > 1000000 &&
        /^[a-zA-Z]*$/.test(el.name),
    );

  const country = await countriesArr[
    Math.floor(Math.random() * countriesArr.length)
  ];

  return country;
}

export async function getEuropeanCountries() {
  const response = await fetch(
    'https://restcountries.eu/rest/v2/all',
  );

  const result = await response.json();

  const countriesArr = result
    .slice()
    .filter(
      (el: any) =>
        el.name.length < 15 &&
        el.region === 'Europe' &&
        el.population > 10000 &&
        /^[a-zA-Z]*$/.test(el.name),
    );

  const country = await countriesArr[
    Math.floor(Math.random() * countriesArr.length)
  ];

  return country;
}
