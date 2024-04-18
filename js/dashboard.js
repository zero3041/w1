

var data = [
    { device: "TV", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 50 },
    { device: "Fan", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 80 },
    { device: "Fan", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 100 },
    { device: "Washer", macAddress: "00:00:0A:DS:0A:DS", ip: "127.0.0.1", createdDate: "2021-05-31", powerConsumption: 200 },
    
];

if(localStorage.getItem('data')) data = JSON.parse(localStorage.getItem("data"));

// document.getElementById('tableBody').addEventListener('click', function(event) {
//     if (event.target.classList.contains('btn-edit')) {
//         const index = parseInt(event.target.getAttribute('data-id'));
//         showEditForm(index);
//     } else if (event.target.classList.contains('btn-delete')) {
//         const index = parseInt(event.target.getAttribute('data-id'));
//         console.log(index);
//         deleteItem(index);
//     }
// });


var tbody = document.getElementById("tableBody");
var totalPowerConsumption = 0;

function updateTable() {
    tbody.innerHTML = ''; 
    totalPowerConsumption = 0; 

    data.forEach(function(item, index) { 
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.device}</td>
            <td>${item.macAddress}</td>
            <td>${item.ip}</td>
            <td>${item.createdDate}</td>
            <td>${item.powerConsumption}</td>
            <td>
                <button class="btn-edit btn btn-action" data-id="${index}">Edit</button>
                <button class="btn-delete btn btn-action" data-id="${index}">Delete</button>
            </td>
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
    document.querySelectorAll('.btn-delete').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (confirm('Bạn có muốn xoá')) {
                data.splice(index, 1); 
                saveData(); 
                updateTable(); 
                updateChart(); 
            }
        });
    });
    document.querySelectorAll('.btn-edit').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            showEditForm(index); 
            document.getElementById("formAdd").style.display = "none";
        });
    });
    
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

// advanced




function showEditForm(index) {
    const editForm = document.querySelector('.content-main-add form:nth-child(2)');
    const selectedItem = data[index];
    editForm.querySelector('#name').value = selectedItem.device;
    editForm.querySelector('#mac').value = selectedItem.macAddress; 
    editForm.querySelector('#ip').value = selectedItem.ip;
    editForm.querySelector('#powerConsumption').value = selectedItem.powerConsumption; 
    editForm.classList.remove('none'); 
    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const editedItem = {
            device: editForm.querySelector('#name').value,
            macAddress: editForm.querySelector('#mac').value,
            ip: editForm.querySelector('#ip').value,
            createdDate: "2021-05-31",
            powerConsumption: parseInt(editForm.querySelector('#powerConsumption').value) 
        };
        data[index] = editedItem; 
        saveData();
        updateTable(); 
        updateChart(); 
        editForm.reset(); 
        editForm.classList.add('none');
        document.getElementById("formAdd").style.display = null;
        
    });
}



// end advanced