const activitiesRange = {1: "learning how to code", 2: "sports training activity", 3: "learning music", 4: "working on thesis", 5: "statistics course"}

function generate(i, j){
    let arr = [];
    return generateActivities (i);
    function generateActivities (i){
        if (i<1) {
            return;
        } else {
            generateActivities(i-1);
            arr.push(Math.floor(Math.random() * (j - 1 + 1)+ 1));
            return arr;
        }
    }
}

function buttonGenerator(){
    let arr = generate(7, 5);
    console.log(arr);
    document.querySelector("#mon-activ").innerText = activitiesRange[arr[0]];
    document.querySelector("#tue-activ").innerText = activitiesRange[arr[1]];
    document.querySelector("#wed-activ").innerText = activitiesRange[arr[2]];
    document.querySelector("#thu-activ").innerText = activitiesRange[arr[3]];
    document.querySelector("#fri-activ").innerText = activitiesRange[arr[4]];
    document.querySelector("#sat-activ").innerText = activitiesRange[arr[5]];
    document.querySelector("#sun-activ").innerText = activitiesRange[arr[6]];
}

document.querySelector("#pass-button").addEventListener("click", () => {
    function showOptions () {
        document.querySelector(".checkbox-list").setAttribute("style", "display: block;")
        document.querySelector(".checkbox-list-confirm").innerText = "Confirm selection and generate for " + daySelected + ".";
    }
    const daySelector = document.querySelector(".day-select")
    console.log(daySelector.value);
    let daySelected = daySelector.value;
    showOptions();
    return daySelected}
);


const generatingButton = document.querySelector(".generate-button")
generatingButton.addEventListener("click", buttonGenerator);

let activitiesGroup = document.querySelectorAll("input[name=activity-sel]");

let arrSet = new Set();
let indx = undefined;

for (activities of activitiesGroup) {
    activities.checked = false;
}

for (activities of activitiesGroup) {
    activities.addEventListener("change", e =>{
        if (activities.checked === false) {
            arrSet = new Set();
            console.log(arrSet)
        }
        for (const activity of activitiesGroup) {
        if (activity.checked) {
            arrSet.add(String(activity.value));
            console.log(arrSet);}
}})
}

document.querySelector(".checkbox-list-confirm").addEventListener("click", () => {
    let arr1 = [...arrSet];
    console.log(arr1);
    let activNumber = generate(1,arr1.length);
    activNumber--;
    console.log(activNumber);
    let selectedDay = document.querySelector(".day-select").value;
    switch (selectedDay) {
        case "Monday":
            document.querySelector("#mon-activ").innerText = arr1[activNumber]
            break;
        case "Tuesday":
            document.querySelector("#tue-activ").innerText = arr1[activNumber]
            break;
        case "Wednesday":
            document.querySelector("#wed-activ").innerText = arr1[activNumber]
            break;
        case "Thursday":
            document.querySelector("#thu-activ").innerText = arr1[activNumber]
            break;
        case "Friday":
            document.querySelector("#fri-activ").innerText = arr1[activNumber]
            break;
        case "Saturday":
            document.querySelector("#sat-activ").innerText = arr1[activNumber]
            break;
        case "Sunday":
            document.querySelector("#sun-activ").innerText = arr1[activNumber]
            break;
    }
    document.querySelector(".checkbox-list-confirm").innerText = "Confirm selection and generate for " + selectedDay + "." + " [DONE]"
})

document.querySelector(".day-select").addEventListener("change", () => {
    
    let selectedDay = document.querySelector(".day-select").value;
    function showOptions () {
        document.querySelector(".checkbox-list").setAttribute("style", "display: block;")
        document.querySelector(".checkbox-list-confirm").innerText = "Confirm selection and generate for " + selectedDay + ".";
    }
    
    for (activities of activitiesGroup) {
        activities.checked = false;
    }
    showOptions();
})

document.querySelector("#CSV-generator").addEventListener("click",()=>{
    console.log("click");
    const CsvArray = []

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const weekDayIds = ["#mon-activ","#tue-activ","#wed-activ","#thu-activ", "#fri-activ", "#sat-activ", "#sun-activ"]
    
    generateCsvArray (0, 7);

    let csvContent = "";

    CsvArray.forEach(row => {
        csvContent += row.join(",") + "\n";
    })

    const blob = new Blob ([csvContent], {type: "text/csv;charset=utf-8," })
    const objUrl = URL.createObjectURL(blob);
    document.querySelector("#CSV-anchor").setAttribute("href", objUrl)

    function generateCsvArray (n, i) {
        if (n === i) {
            return;
        } else {
            CsvArray.push([weekDays[n], document.querySelector(weekDayIds[n]).innerText])
            generateCsvArray(n+1, i);
            return CsvArray;
        }
    }


})
