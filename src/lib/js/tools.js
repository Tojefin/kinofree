export function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++){
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

export async function apiReq(url) {
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
    },
  });
  if (response.ok) {
    let data = await response.json();
    if (data.searchFilmsCountResult != 0) {
      return data
    } else {
      console.log("Ошибка запроса");
      return 'Error'
    }
  } else {
    console.log("Ошибка сервера "+response.status);
    return 'Error'
  }
}
