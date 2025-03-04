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


async function selectionSort() {
    let len = array.length;
    sortingInProgress = true;
    stopSorting = false;

    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;

    for(let i = 0; i < len - 1; i++) {
        let minIndex = i;

        for(let j = i + 1; j < len; j++) {
            if(stopSorting) { 
                sortingInProgress = false;
                document.getElementById("startButton").disabled = false;
                return;
            }

            if(array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if(minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            drawArray(array, i);
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    sortingInProgress = false;
    document.getElementById("startButton").disabled = false;
}

async function insertionSort() {
    let len = array.length;
    sortingInProgress = true;
    stopSorting = false;

    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;

    for(let i = 1; i < len; i++) {
        let key = array[i];
        let j = i - 1;

        while(j >= 0 && array[j] > key) {
            if (stopSorting) { 
                sortingInProgress = false;
                document.getElementById("startButton").disabled = false;
                return;
            }

            array[j + 1] = array[j];
            j--;

            drawArray(array, j + 1);
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        array[j + 1] = key;
        drawArray(array, i);
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    sortingInProgress = false;
    document.getElementById("startButton").disabled = false;
}
async function heapSort() {
    let len = array.length;
    sortingInProgress = true;
    stopSorting = false;

    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;

    for(let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        if(stopSorting) break;
        await heapify(len, i);
    }

    for(let i = len - 1; i > 0; i--) {
        if (stopSorting) break;

        [array[0], array[i]] = [array[i], array[0]];
        drawArray(array, i);  
        await new Promise(resolve => setTimeout(resolve, 50));

        await heapify(i, 0);
    }

    sortingInProgress = false;
    document.getElementById("startButton").disabled = false;
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if(left < n && array[left] > array[largest]) {
        largest = left;
    }

    if(right < n && array[right] > array[largest]) {
        largest = right;
    }

    if(largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        drawArray(array, largest);
        await new Promise(resolve => setTimeout(resolve, 50));

        await heapify(n, largest);
    }
}

async function countingSort() {
    let max = Math.max(...array);
    let min = Math.min(...array); 
    let range = max - min + 1; 

    let count = new Array(range).fill(0); 
    let output = new Array(array.length); 

    sortingInProgress = true;
    stopSorting = false;
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;

    for(let i = 0; i < array.length; i++) {
        if(stopSorting) 
            return stopSort();
        count[array[i] - min]++;
        drawArray(array, i);
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    for(let i = 1; i < count.length; i++) {
        if(stopSorting) 
            return stopSort();
        count[i] += count[i - 1];
        drawArray(array, i);
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    for(let i = array.length - 1; i >= 0; i--) {
        if(stopSorting) 
            return stopSort();
        let index = count[array[i] - min] - 1;
        output[index] = array[i];
        count[array[i] - min]--;
        drawArray(output, index);
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    for(let i = 0; i < array.length; i++) {
        if(stopSorting) 
            return stopSort();
        array[i] = output[i];
        drawArray(array, i);
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    stopSort();
}

function stopSort() {
    sortingInProgress = false;
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
}




function stopSortingFun() {
    if (sortingInProgress) { 
        stopSorting = true;  
        sortingInProgress = false; 
        document.getElementById("startButton").disabled = false;  
        document.getElementById("stopButton").disabled = true;  
    }
}

function getBack() {
    window.location.href = "index.html";
}



document.getElementById("stopButton").addEventListener("click", stopSortingFun);
drawArray(array);

