// Login
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


// simple data table 


var data = [
    { device: "TV", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 50 },
    { device: "Fan", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 80 },
    { device: "PC", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 100 },
    { device: "Washer", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 200 },
    
];


var tbody = document.getElementById("tableBody");
var totalPowerConsumption = 0;

function updateTable() {
    tbody.innerHTML = ''; 
    totalPowerConsumption = 0; 

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
}

updateTable(); // Cập nhật bảng ban đầu




// ve chart theo data ban dau

var powerConsumptions = [];
var colors = [];

document.querySelectorAll(".styled-table tbody tr").forEach(function(row, index) {
    if (index < data.length) {
        var powerConsumption = parseFloat(row.children[4].textContent);
        powerConsumptions.push(powerConsumption);

        var randomColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
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
            borderColor: colors.map(color => color.replace('0.2', '1')), 
        }]
    },
    options: {
        responsive: true,
        legend: {
            position: 'bottom',
        },
        plugins: {
            title: {
                display: true,
                text: 'Power Consumption'
            }
        }
    }
    
});

// Update bieu do moi sau khi add data

function updateChart() {
    powerConsumptions = [];
    colors = [];
    data.forEach(function(item) {
        powerConsumptions.push(item.powerConsumption);
        var randomColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        colors.push(randomColor);
    });

    myPieChart.data.labels = data.map(item => item.device);
    myPieChart.data.datasets[0].data = powerConsumptions;
    myPieChart.data.datasets[0].backgroundColor = colors;
    myPieChart.data.datasets[0].borderColor = colors.map(color => color.replace('0.2', '1'));
    
    myPieChart.update();
}



document.getElementById("addDeviceBtn").addEventListener("click", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var ip = document.getElementById("ip").value;

    // Validate data
    if (!name.trim()) {
        alert("Vui lòng điền tên")
        return;
    } 

    if (!ip.trim()) {
        alert("Vui lòng điền ip")
        return;
    } 

    data.push({ device: name, macAddress: "00:00:0A:DS:0A:DS", ip: ip, createdDate: new Date().toISOString().slice(0, 10), powerConsumption: Math.floor(Math.random() * 200) + 1 });

    updateTable();
    updateChart();

    document.getElementById("name").value = "";
    document.getElementById("ip").value = "";
});

// end chart


// menu nav mobile 

function openMenu(){
    document.getElementsByClassName("menu").memu.style.display='none';
    document.getElementById("header").classList.add("header-avt-active");
    document.getElementById("sidebar").classList.add("header-active");
}

// function closeMenu(evt){
//     var sidebar = ocument.getElementById("sidebar").classList.add("header-active");
//     targetEL = evt.target;
//     if (targetEL != sidebar){
//         document.getElementsByClassName("menu").memu.style.display='block';
//         document.getElementById("header").classList.remove("header-avt-active");
//         document.getElementById("sidebar").classList.remove("header-active");
//     }
// }

document.addEventListener("click", function(evt) {
    let layout = document.getElementsByClassName("header-active").sidebar
    if( layout=== undefined) return;
    targetLayout = evt.target; // clicked element      
    do {
    if(targetLayout == layout) {
        // This is a click inside, does nothing, just return.
        console.log("o trong")
        return;
    }
    // Go up the DOM
    targetLayout = targetLayout.parentNode;
    } while (targetLayout);
    // This is a click outside.
    // document.getElementsByClassName("menu").memu.style.display='block';
    // document.getElementById("header").classList.remove("header-avt-active");
    // document.getElementById("sidebar").classList.remove("header-active");
});