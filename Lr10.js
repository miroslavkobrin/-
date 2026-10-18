let userName = prompt("Введіть ваше ім'я:");
if (!userName || userName.trim() === "") {
    userName = "Гравець";
}
document.getElementById("username").textContent = userName;
let attempt = 0;
let isWinner = false;
const fruits = [
    "https://w7.pngwing.com/pngs/201/794/png-transparent-palisade-nectarine-drupe-apricot-fruit-peach-fruit-natural-foods-food-united-states-thumbnail.png",
    "https://photoshop-kopona.com/uploads/posts/2019-03/1552933256_1.jpg",
    "https://i.3dmodels.org/uploads/evermotion2/6183_AM130_024/AM130_024_1000_0001.jpg",
    "https://api.nashkraj.com.ua/img/1309.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Qd5zkAGrT8z5l_ZLq_pancjr6UIr3Qe6VjNm7FJoHQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqcZJYrlu0IwESbnDb6bCyC3xHDt_bQ6tB4UcyFL_6eg&s=10"
];
function generateGrid() {
    const slotMachine = document.getElementById("slotMachine");
    slotMachine.innerHTML = ""; 
    let columns = [];
    for (let col = 0; col < 3; col++) {
        let shuffled = [...fruits];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        columns.push(shuffled.slice(0, 3));
    }
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let cell = document.createElement("div");
            cell.className = "slot-cell";
            cell.id = `cell-${row}-${col}`; 
            let img = document.createElement("img");
            img.src = columns[col][row];
            cell.appendChild(img);
            slotMachine.appendChild(cell);
        }
    }
    checkWin(columns);
}

function checkWin(columns) {
    for (let row = 0; row < 3; row++) {
        let c1 = columns[0][row];
        let c2 = columns[1][row];
        let c3 = columns[2][row];
        if (c1 === c2 && c2 === c3) {
            isWinner = true;
            for (let col = 0; col < 3; col++) {
                document.getElementById(`cell-${row}-${col}`).classList.add("win-row");
            }
            
            document.getElementById("genBtn").disabled = true;
            setTimeout(() => alert("🎉 Вітаємо! Ви виграли! Випав однаковий ряд!"), 100);
            return; 
        }
    }
}
function play() {
    if (attempt >= 3 || isWinner) return;
    attempt++;
    document.getElementById("attemptText").textContent = `Спроба ${attempt} з 3`;
    generateGrid();
    if (attempt === 3 && !isWinner) {
        document.getElementById("genBtn").disabled = true;
        setTimeout(() => alert("Гра закінчена. Computer переміг. 🤖"), 100);
    }
}

document.getElementById("genBtn").addEventListener("click", play);