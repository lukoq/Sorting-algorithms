const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const array = [];
const numBars = 64;
const barWidth = canvas.width / numBars;

let sortingInProgress = false;
let stopSorting = false;

for(let i = 0; i < numBars; i++){
    array.push(Math.floor(Math.random() * canvas.height));
}

function drawArray(arr, indx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < arr.length; i++) {
        ctx.fillStyle = "#89cff0";
        if(i === indx){
            ctx.fillStyle = "#f0899c";
        }
        ctx.fillRect(i * barWidth, canvas.height - arr[i], barWidth - 2, arr[i]);
    }
}

async function bubbleSort() {
    let len = array.length;
    sortingInProgress = true;
    stopSorting = false;

    document.getElementById("startButton").disabled = true; 
    document.getElementById("stopButton").disabled = false; 

    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len - i - 1; j++) {
            if (stopSorting) { 
                sortingInProgress = false;
                document.getElementById("startButton").disabled = false; 
                return;
            }

            if(array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray(array, j + 1);
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
    }

    sortingInProgress = false;
    document.getElementById("startButton").disabled = false; 
}

function startSorting() {
    if(!sortingInProgress) {
        bubbleSort();
    }
}

function stopSortingFunction() {
    if(sortingInProgress) {
        stopSorting = true; 
        document.getElementById("startButton").disabled = false; 
    }
}

document.getElementById("stopButton").addEventListener("click", stopSortingFunction);
drawArray(array);

