export function getList() {
  return fetch('https://denarios.herokuapp.com')
    .then(data => data.json())
}