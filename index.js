var link = "https://node2.francescodb.me"
// var link = "http://127.0.0.1:8080";
var counter = 0;

function parseTable(userData, problemsData) {
    var j = JSON.parse(userData);
    var p = JSON.parse(problemsData);
    var classifica = document.querySelector("table")

    if (j.length == 0) {
        console.log("Empty leaderbord");
        return;
    }

    classifica.innerHTML = "";
    let row = classifica.insertRow();
    let cell = row.insertCell(); 
    cell.classList.add("pos");
    cell = row.insertCell(); 
    cell.classList.add("name");
    cell = row.insertCell(); 
    cell.classList.add("pos");
    for (var x in j[0]["Problems"]) {
        cell = row.insertCell(); 
        cell.classList.add("points");
        cell.classList.add("bold");
        cell.innerText = parseInt(x) + 1;
        cell.innerHTML = `<p class="problem-points">${p[x]}</p>` + cell.innerHTML
    }

    for (var user in j) {
        row = classifica.insertRow();
        cell = row.insertCell(); 
        cell.classList.add("pos");
        cell.innerText = j[user]["Position"];
        cell = row.insertCell(); 
        cell.classList.add("name");
        cell.innerText = j[user]["Name"];
        cell = row.insertCell(); 
        cell.classList.add("pos");
        cell.innerText = j[user]["Points"];

        for (var x in j[user]["Problems"]) {
            cell = row.insertCell(); 
            cell.classList.add("points");
            var points = parseInt(j[user]["Problems"][x]);
            if (points < 0) {
                cell.classList.add("error");
            } else if (points > 0) {
                cell.classList.add("correct");
            }
            if (j[user]["Jolly"] == parseInt(x)+1) {
                cell.classList.add("jolly");
            }
            cell.innerText = points;
            console.log(j[user]["Jolly"], x)
        }
    }
}

function updateProblemPoints(userData) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", link + "/problems", true); // false for synchronous request
    xmlHttp.onload = function(e) {
        if (xmlHttp.status === 200) {
            parseTable(userData, xmlHttp.responseText);
        }
    };
    xmlHttp.onerror = function (e) {
        console.error(xmlHttp.statusText);
    };
    xmlHttp.send(null);
}

function updateTable() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", link + "/leaderboard", true); // false for synchronous request
    xmlHttp.onload = function(e) {
        if (xmlHttp.status === 200) {
            updateProblemPoints(xmlHttp.responseText);
        }
    };
    xmlHttp.onerror = function (e) {
        console.error(xmlHttp.statusText);
    };
    xmlHttp.send(null);
}

updateTable();

window.setInterval(function() {
    document.getElementById("counter").innerText = ++counter;
    if (counter == 15) {
        updateTable();
        counter = -1;
    }
}, 1000) 