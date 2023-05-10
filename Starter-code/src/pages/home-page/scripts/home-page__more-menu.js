let http = new XMLHttpRequest();

http.open('get', './public/json/songs.json', true);
http.send();
http.onload = function () {

}