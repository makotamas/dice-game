//változó deklarálás
let scores, roundScore, activePlayer

function newGame () {
// játékosok pontszámai, mindkét játékos nulla ponttal indul
// változó értékadás: value assignment 
scores = [0, 0];

//forduló alatt megszerzett pontok 
roundScore = 0;

// az első játékos kezd
activePlayer = 0;

document.querySelector('#score-0').textContent = 0; 

document.querySelector('#current-0').textContent = 0;
document.querySelector('#score-1').textContent = 0;
document.querySelector('#current-1').textContent = 0;

// a játék indításakor a kocka még nem látszik:
document.querySelector('#dice-1').style.display = 'none'; 
document.querySelector('#dice-2').style.display = 'none'; 


document.querySelector('.btn-hold').style.display = 'block';
document.querySelector('.btn-roll').style.display = 'block';

document.querySelector('#name-0').textContent = 'Player 1';
document.querySelector('#name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}

newGame();


// a kocka dobás, gombra kattintás
document.querySelector('.btn-roll').addEventListener('click', function () {
    //1. generálunk egy véletlen számot 1-6 között
    const diceOne = Math.floor(Math.random() * 6) + 1; 
    const diceTwo = Math.floor(Math.random() * 6) + 1; 

    //2. jelenítsük meg az UI-on:
    document.querySelector('#dice-1').style.display = 'block'; // láthatóvá tesszük
    document.querySelector('#dice-2').style.display = 'block'; // láthatóvá tesszük

    document.querySelector('.dice').setAttribute('src', `dice-${diceOne}.png`); 
    document.querySelector('.dice').setAttribute('src', `dice-${diceTwo}.png`); 
    
    // Ha nem egy a dobott érték akkor felírjuk a pontszámot és ugyanaz a játékos dobhat újra 
    // elágazás:
    if (diceOne !== 1 && diceTwo !== 1) {
        roundScore = roundScore + diceOne + diceTwo;
        // A UI-on megjelenítjük az eredményt:
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
    } else {
        nextPlayer ();
    }
});


function nextPlayer () {
    roundScore = 0;
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    // A UI-on frissítjük az értékeket:
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// hold gombra kattintás
document.querySelector('.btn-hold').addEventListener('click', function () {
    // 1. lépés A játékos megszerzi a kör alatt szerzett pontjait
    scores[activePlayer] = scores[activePlayer] + roundScore;
    
    // 2. UI-t frissítjük
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    // 3. meg kell nézni van-e nyertes, mivel 20 pontig megy a játék
    if (scores[activePlayer] >= 20) {
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner'); 
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active'); 
    
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('brn-hold').style.display = 'none';
        document.querySelector('.btn-roll').style.display = 'none';

    } else {
       nextPlayer();
    }
});

// new game gomb
document.querySelector('.btn-new').addEventListener('click', newGame);
