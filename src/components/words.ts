export const vowels = ['a', 'e', 'i', 'o', 'u'];
export const consonants = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const letters: Array<string> = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export async function getCountry() {
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
