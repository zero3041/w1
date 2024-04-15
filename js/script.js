var users = [
    { username: "admin", password: "admin123" },
    { username: "user", password: "user123" }
];

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var isValidUser = users.find(function(user){
        return user.username === username && user.password === password
    });

    // for (var i = 0; i < users.length; i++) {
    //     if (users[i].username === username && users[i].password === password) {
    //         isValidUser = true;
    //         break;
    //     }
    // }

    if (isValidUser) {
        alert("Login successful!");
        // window.location.href = "home.html";
    } else {
        alert("Login failed!");;
    }
}