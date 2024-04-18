// Login
var users = [
    { username: "admin", password: "admin" },
    { username: "john", password: "1234" }
];

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var isValidUser = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            isValidUser = true;
            window.localStorage.setItem('user',username)
            break;
        }
    }

    if (isValidUser===true) {
        window.location.href = "http://127.0.0.1:5500/index.html";
    } else {
        alert("Login failed");
    }
}



// menu nav mobile 

function openMenu(){
    document.getElementsByClassName("menu").menu.style.display='none';
    document.getElementById("header").style.width = "45%"
    document.getElementById("sidebar").style.width = "45%"
}


document.addEventListener("click", function(evt) {  
    const sidebar = document.getElementById("sidebar")
    const header= document.getElementById("menu")
    
    if(evt.target !== sidebar && evt.target !==header  && !sidebar.contains(evt.target)&& !header.contains(evt.target)) {
        if(document.getElementById('menu').style.display === "none")
        {
            document.getElementsByClassName("menu").menu.style.display='block';
            document.getElementById("header").style.width = null
            document.getElementById("sidebar").style.width = null
        }
        
    }
});