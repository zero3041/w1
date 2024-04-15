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

var data = [
    { device: "TV", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 50 },
    { device: "Fan", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 80 },
    { device: "PC", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 100 },
];

var tbody = document.getElementById("tableBody");
var totalPowerConsumption = 0;

data.forEach(function(item) {
    var row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.device}</td>
        <td>${item.macAddress}</td>
        <td>${item.ip}</td>
        <td>${item.createdDate}</td>
        <td>${item.powerConsumption}</td>
    `;
    tbody.appendChild(row);

    totalPowerConsumption += item.powerConsumption;
});

var totalRow = document.createElement("tr");
totalRow.innerHTML = `
    <td>Total</td>
    <td></td>
    <td></td>
    <td></td>
    <td>${totalPowerConsumption}</td>
`;
tbody.appendChild(totalRow);

var powerConsumptions = [];
var colors = [];

document.querySelectorAll(".styled-table tbody tr").forEach(function(row, index) {
    // Bỏ qua dòng cuối cùng của bảng
    if (index < data.length) {
        var powerConsumption = parseFloat(row.children[4].textContent);
        powerConsumptions.push(powerConsumption);

        // Tạo màu ngẫu nhiên
        var randomColor = 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ', 0.2)';
        colors.push(randomColor);
    }
});

var ctx = document.getElementById('myPieChart').getContext('2d');
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: data.map(item => item.device),
        datasets: [{
            label: 'Power Consumption',
            data: powerConsumptions,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.2', '1')), // Chuyển đổi màu sắc đậm tương ứng
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Power Consumption by Device',
            fontSize: 18
        }
    }
    
});

