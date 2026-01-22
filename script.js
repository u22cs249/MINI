const container = document.getElementById("visualizer-container");
const resetBtn = document.getElementById("resetBtn");
const sortBtn = document.getElementById("sortBtn");
const speedInput = document.getElementById("speed");

let array = [];

// Helper to pause execution for animation
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a random array and render bars
function generateArray(size = 30) {
    container.innerHTML = "";
    array = [];
    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 300) + 10;
        array.push(value);
        
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        container.appendChild(bar);
    }
}

// Bubble Sort Algorithm with Visual Updates
async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    let speed = 210 - speedInput.value; // Invert speed slider logic

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            // Highlight bars being compared
            bars[j].classList.add("active");
            bars[j + 1].classList.add("active");

            if (array[j] > array[j + 1]) {
                // Swap heights in UI
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            await sleep(speed);

            // Remove highlight
            bars[j].classList.remove("active");
            bars[j + 1].classList.remove("active");
        }
        // Mark the last element as sorted
        bars[array.length - i - 1].classList.add("sorted");
    }
}

resetBtn.addEventListener("click", () => generateArray());
sortBtn.addEventListener("click", () => bubbleSort());

// Initial call
generateArray();
