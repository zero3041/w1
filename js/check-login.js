const check = window.localStorage.getItem('user');

if(!check) window.location.href = "http://127.0.0.1:5500/login.html"; 