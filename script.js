const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const array = [];
const numBars = 64;
const barWidth = canvas.width / numBars;

for (let i = 0; i < numBars; i++) {
    array.push(Math.floor(Math.random() * canvas.height));
}

function drawArray(arr) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < arr.length; i++) {
        ctx.fillStyle = "blue";
        ctx.fillRect(i * barWidth, canvas.height - arr[i], barWidth - 2, arr[i]);
    }
}

async function bubbleSort() {
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
                drawArray(array);
                await new Promise(resolve => setTimeout(resolve, 10)); // Opóźnienie animacji
            }
        }
    }
}

function startSorting() {
    bubbleSort();
}

drawArray(array);