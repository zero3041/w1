function displayData(data, currentPage, rowsPerPage) {
    var tbody = document.getElementById("tableBody-log");
    tbody.innerHTML = "";

    var startIndex = (currentPage - 1) * rowsPerPage;
    var endIndex = Math.min(startIndex + rowsPerPage, data.length);

    for (var i = startIndex; i < endIndex; i++) {
        var row = data[i];
        var tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.deviceId}</td>
            <td>${row.name}</td>
            <td>${row.action}</td>
            <td>${row.date}</td>
        `;
        tbody.appendChild(tr);
    }
}

function displayPagination(numPages) {
    var pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (var i = 1; i <= numPages; i++) {
        var li = document.createElement("li");
        var input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("id", `page${i}`);
        input.setAttribute("name", "pagination");
        input.addEventListener("click", function() {
            currentPage = parseInt(this.id.replace("page", ""));
            displayData(data, currentPage, rowsPerPage);
        });
        li.appendChild(input);
        
        var label = document.createElement("label");
        label.setAttribute("for", `page${i}`);
        label.textContent = i;
        li.appendChild(label);

        pagination.appendChild(li);
    }
}

var data = [];
var rowsPerPage = 10;
var currentPage = 1;

function init() {
    data = [
        { deviceId: 1, name: "TV", action: "Sleep", date: "2021-05-31" },
        { deviceId: 2, name: "Fan", action: "Turn on", date: "2021-05-31" },
        // Add 98 more fake data here
    ];
    
    for (var i = 3; i <= 100; i++) {
        var device = {
            deviceId: i,
            name: "Device " + i,
            action: Math.random() < 0.5 ? "Sleep" : "Turn on",
            date: randomDate(new Date(2021, 0, 1), new Date())
        };
        data.push(device);
    }

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0, 10);
    }

    var totalRows = data.length;
    var numPages = Math.ceil(totalRows / rowsPerPage);
    displayData(data, currentPage, rowsPerPage);
    displayPagination(numPages);
}

function search() {
    var searchText = document.getElementById("searchInput").value.toLowerCase();
    var filteredData = data.filter(function(item) {
        return item.name.toLowerCase().includes(searchText);
    });
    displayData(filteredData, currentPage, rowsPerPage);
    var totalRows = filteredData.length;
    var numPages = Math.ceil(totalRows / rowsPerPage);
    displayPagination(numPages);
}

document.getElementById("searchBtn").addEventListener("click", search);


init();
