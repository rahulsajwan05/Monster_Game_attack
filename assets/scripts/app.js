const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

//write to log variables
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
let battleLog =[];

adjustHealthBars(chosenMaxLife);

function writeToLog(ev , value , monsterHealth , playerHealth) {
  let logEntry = {
    event : ev,
    value : value,
    monsterHealth : monsterHealth,
    playerHealth : playerHealth,
  }

  if(ev= LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target="MONSTER"
  } else if(ev= LOG_EVENT_PLAYER_STRONG_ATTACK) {
    let logEntry = {
      event : ev,
      value : value,
      target : "MONSTER",
      monsterHealth : monsterHealth,
      playerHealth : playerHealth,
    }
   } else if(ev=LOG_EVENT_MONSTER_ATTACK) {
      let logEntry = {
        event : ev,
        value : value,
        target : "PLAYER",
        monsterHealth : monsterHealth,
        playerHealth : playerHealth,
      }
    } else if(ev=LOG_EVENT_PLAYER_HEAL) {
      let logEntry = {
        event : ev,
        value : value,
        monsterHealth : monsterHealth,
        playerHealth : playerHealth,
      }
    } else if(ev=LOG_EVENT_GAME_OVER) {
      let logEntry = {
        event : ev,
        value : value,
        monsterHealth : monsterHealth,
        playerHealth : playerHealth,
      }
    }
    battleLog.push(logEntry);
  }


function reset() {
   currentMonsterHealth = chosenMaxLife;
   currentPlayerHealth = chosenMaxLife;
   resetGame(chosenMaxLife) 
}

function endResult() {
  const initialPLayerHealth = currentPlayerHealth;
  const playerDamage=dealPlayerDamage(MONSTER_ATTACK_VALUE)
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  )
  
  if (currentPlayerHealth <=0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPLayerHealth;
    setPlayerHealth(initialPLayerHealth)
    alert("You would be die but bonus life saved you")
  }

  if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won")
    writeToLog(
    LOG_EVENT_GAME_OVER,
    "PLAYER WON",
    currentMonsterHealth,
    currentPlayerHealth
    )
  } else if( currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lost");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER LOST",
      currentMonsterHealth,
      currentPlayerHealth
      )
  } else if ( currentMonsterHealth <=0 && currentPlayerHealth <=0) {
    alert("Draw");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER DRAW",
      currentMonsterHealth,
      currentPlayerHealth
      )
  }

  if(currentPlayerHealth <=0 || currentMonsterHealth <=0) {
    reset();
  }
}

function monsterAttack(mode) {
  let maxDamage;
  let logEventAttack;
  if(mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
    logEventAttack = LOG_EVENT_PLAYER_ATTACK;
  } else if(mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
    logEventAttack = LOG_EVENT_PLAYER_STRONG_ATTACK; 
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(
    logEventAttack,
    damage,
    currentMonsterHealth,
    currentPlayerHealth
    )
  endResult();
}

function attackHandler() {
  monsterAttack("ATTACK");
}

function strongAttackHandler() {
  monsterAttack("STRONG_ATTACK");
}

function healHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal")
    healValue = chosenMaxLife - currentPlayerHealth
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
    );
  endResult();
}

function printlogHandler() {
  console.log(battleLog)
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', printlogHandler);
