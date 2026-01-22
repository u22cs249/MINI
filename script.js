const visualizer = document.getElementById('visualizer-area');
const stepText = document.getElementById('step-description');
let data = [];

// Configuration for Viva details
const algoDetails = {
    sorting: { name: "Bubble Sort", time: "O(n²)", space: "O(1)" },
    searching: { name: "Binary Search", time: "O(log n)", space: "O(1)" }
};

function init(mode = 'sorting') {
    visualizer.innerHTML = '';
    data = [];
    let count = mode === 'sorting' ? 30 : 15;
    
    for(let i=0; i<count; i++) {
        let val = mode === 'sorting' ? Math.floor(Math.random()*300)+20 : (i+1)*25;
        data.push(val);
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${val}px`;
        bar.style.width = `${600/count}px`;
        bar.innerText = mode === 'searching' ? val : '';
        visualizer.appendChild(bar);
    }
}

async function startSorting() {
    let bars = document.querySelectorAll('.bar');
    for(let i=0; i < data.length; i++) {
        for(let j=0; j < data.length - i - 1; j++) {
            bars[j].classList.add('comparing');
            bars[j+1].classList.add('comparing');
            stepText.innerText = `Comparing ${data[j]} and ${data[j+1]}`;

            if(data[j] > data[j+1]) {
                stepText.innerText = `Swapping ${data[j]} and ${data[j+1]}`;
                [data[j], data[j+1]] = [data[j+1], data[j]];
                bars[j].style.height = `${data[j]}px`;
                bars[j+1].style.height = `${data[j+1]}px`;
            }
            await new Promise(r => setTimeout(r, 50));
            bars[j].classList.remove('comparing');
            bars[j+1].classList.remove('comparing');
        }
        bars[data.length-i-1].classList.add('sorted');
    }
    stepText.innerText = "Array Sorted Successfully!";
}

async function startBinarySearch() {
    const target = data[Math.floor(Math.random()*data.length)];
    let bars = document.querySelectorAll('.bar');
    let low = 0, high = data.length - 1;

    while(low <= high) {
        let mid = Math.floor((low + high)/2);
        bars[mid].classList.add('comparing');
        stepText.innerText = `Checking middle element: ${data[mid]}`;
        await new Promise(r => setTimeout(r, 600));

        if(data[mid] === target) {
            bars[mid].classList.add('sorted');
            stepText.innerText = `Found target ${target} at index ${mid}!`;
            return;
        }
        if(data[mid] < target) {
            for(let i=low; i<=mid; i++) bars[i].style.opacity = "0.3";
            low = mid + 1;
        } else {
            for(let i=mid; i<=high; i++) bars[i].style.opacity = "0.3";
            high = mid - 1;
        }
    }
}

// Event Listeners
document.getElementById('actionBtn').onclick = () => {
    const mode = document.getElementById('algo-name').innerText;
    if(mode === "Bubble Sort") startSorting();
    else startBinarySearch();
};

document.getElementById('resetBtn').onclick = () => init();

// Change Lab Mode
function changeMode(m) {
    const info = algoDetails[m];
    document.getElementById('algo-name').innerText = info.name;
    document.getElementById('t-comp').innerText = info.time;
    document.getElementById('s-comp').innerText = info.space;
    init(m);
}

init();
