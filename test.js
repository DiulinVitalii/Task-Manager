const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:8000/user/register');
xhr.withCredentials = true;
xhr.onloadend = function(){
  console.log(xhr.responseText);
};
const body = JSON.stringify({
    email: 'sdsd',
    password: '1564'
});
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhr.send(body);
