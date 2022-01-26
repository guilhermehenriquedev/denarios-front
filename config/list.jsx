export function getList() {
  return fetch('https://denarios.herokuapp.com/api/exchanges/list')
    .then(data => data.json())
}