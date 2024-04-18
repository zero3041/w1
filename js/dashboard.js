

var data = [
    { device: "TV", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 50 },
    { device: "Fan", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 80 },
    { device: "Fan", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 100 },
    { device: "Washer", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 200 },
    
];

if(localStorage.getItem('data')) data = JSON.parse(localStorage.getItem("data"));


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

updateTable(); 

function saveData(){
    const cvdata =  JSON.stringify(data)

    localStorage.setItem(
        "data", cvdata
    )

    const rdata = localStorage.getItem("data")

    data = JSON.parse(rdata)
    console.log(data);
}

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
    type: 'doughnut',
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
updateChart();
// update charts with new data and merge data duplicate

function updateChart() {
    var mergeData = {}; 
    data.forEach(function(item) {
        var deviceName = item.device.toLowerCase(); 
        if (!mergeData[deviceName]) {
            mergeData[deviceName] = item.powerConsumption;
        } else {
            mergeData[deviceName] += item.powerConsumption;
        }
    });

    var deviceNames = Object.keys(mergeData);
    powerConsumptions = deviceNames.map(function(device) {
        return mergeData[device];
    });

    myPieChart.data.labels = deviceNames;
    myPieChart.data.datasets[0].data = powerConsumptions;
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
    saveData();
    updateTable();
    updateChart();

    document.getElementById("name").value = "";
    document.getElementById("ip").value = "";
});

// end chart
