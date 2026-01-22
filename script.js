const container = document.getElementById("container");
const statusText = document.getElementById("status");
const timeComp = document.getElementById("time-complexity");
const spaceComp = document.getElementById("space-complexity");

let array = [];

// Helper to pause execution for animation
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, 510 - document.getElementById('speed').value));

function generateArray(size = 20) {
    container.innerHTML = "";
    array = [];
    for (let i = 0; i < size; i++) {
        let val = Math.floor(Math.random() * 100) + 10;
        array.push(val);
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${val * 3}px`;
        bar.id = `bar-${i}`;
        bar.innerText = val;
        container.appendChild(bar);
    }
}

async function startVisualization() {
    const algo = document.getElementById("algorithm").value;
    document.getElementById("start-btn").disabled = true;

    if (algo === "bubble") {
        timeComp.innerText = "O(n²)";
        spaceComp.innerText = "O(1)";
        await bubbleSort();
    } else if (algo === "linear") {
        timeComp.innerText = "O(n)";
        spaceComp.innerText = "O(1)";
        await linearSearch(array[Math.floor(Math.random() * array.length)]);
    }
    
    statusText.innerText = "Algorithm Completed!";
    document.getElementById("start-btn").disabled = false;
}

// --- BUBBLE SORT ---
async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "#f39c12"; // Comparing
            bars[j+1].style.backgroundColor = "#f39c12";

            if (array[j] > array[j + 1]) {
                statusText.innerText = `Swapping ${array[j]} and ${array[j+1]}`;
                // Swap values in array
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                // Update UI
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j].innerText = array[j];
                bars[j+1].style.height = `${array[j+1] * 3}px`;
                bars[j+1].innerText = array[j+1];
            }
            await sleep();
            bars[j].style.backgroundColor = "#4a90e2"; // Reset
            bars[j+1].style.backgroundColor = "#4a90e2";
        }
        bars[array.length - i - 1].style.backgroundColor = "#2ecc71"; // Sorted
    }
}

// --- LINEAR SEARCH ---
async function linearSearch(target) {
    let bars = document.getElementsByClassName("bar");
    statusText.innerText = `Searching for: ${target}`;
    
    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = "#f39c12";
        await sleep();
        
        if (array[i] === target) {
            bars[i].style.backgroundColor = "#2ecc71";
            statusText.innerText = `Found ${target} at index ${i}!`;
            return;
        }
        bars[i].style.backgroundColor = "#e74c3c"; // Not found
    }
}

// Initial Call
generateArray();
