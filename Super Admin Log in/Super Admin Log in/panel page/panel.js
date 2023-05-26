import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBD576LYxAx-gCb1Ji7rIChWPbRFVZXxIs",
    authDomain: "hiram-47c23.firebaseapp.com",
    databaseURL: "https://hiram-47c23-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hiram-47c23",
    storageBucket: "hiram-47c23.appspot.com",
    messagingSenderId: "243656291374",
    appId: "1:243656291374:web:6b50f8bbeab08f25b81bbf",
    measurementId: "G-WPVKDGC1MY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, child, onValue, get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

const db = getDatabase();

//filling the table

var userID = 0;
var tbody = document.getElementById('tbody1');

function AddItemToTable(username, room, DTborrow, DTreturn, items, status) {
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");

    td1.innerHTML = ++userID;
    td2.innerHTML = username;
    td3.innerHTML = room;
    td4.innerHTML = DTborrow;
    td5.innerHTML = DTreturn;
    td6.innerHTML = items;
    td7.innerHTML = status;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    tbody.appendChild(trow);
}

function AddAllItemsToTable(Transactions) {
    userID = 0;
    tbody.innerHTML = "";
    Transactions.forEach(element => {
        AddItemToTable(element.user, element.username, element.roomNo, element.borrowedTime,
            element.returnedTime, element.acRemote, element.status)
    });
}

//Getting All Data

function GetAllDataOnce() {
    const dbRef = ref(db);

    get(child(dbRef, "transactions"))
        .then((snapshot) => {
            var trans = [];
            snapshot.forEach(childSnapshot => {
                trans.push(childSnapshot.val());
            });

            AddAllItemsToTable(trans);
        });
}

window.onload = GetAllDataOnce;