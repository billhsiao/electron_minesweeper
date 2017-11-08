"use strict";
const controller = require('./src/js/controller')




var game, player, danger = [];
function updateStates(string) {
  var gameFaceObj = {
    win:' •‿•)',
    lose:'•︹•)',
    default:' •_•)'
  }
  var gameFace = document.getElementById('gameFace');
  if (!string || string.length < 1) {
    gameFace.textContent = gameFaceObj.default;
  } else {
    if (string === 'win') {
      gameFace.textContent = gameFaceObj.win;
      console.log('win')
    }
    if (string === 'lose') {
      gameFace.textContent = gameFaceObj.lose;
      console.log('lose')
    }
  }
}

function render(object) {
  object.updateState(object.id)
}
var mineCount = Symbol('mineCount')
const props = {
  mineCount: 10,
  widthInput: 10,
  lengthInput: 10
}


document.getElementById('gameFace').addEventListener('click', reset);


initialize();

function initialize() {
  generateTable();
  reset();
}
function reset() {
  updateStates();
  game = new Board(props.widthInput, props.lengthInput)
  danger = [];
  mines(props.mineCount, props.widthInput * props.lengthInput)
  game.field.forEach(x=>x.forEach(y=>render(y)));
}
function mines(p) {
    if (p === 0) {
        return
    }
    let cell = c(...parse(Math.floor(Math.random() * (props.widthInput * props.lengthInput))));
    cell.mine ? mines(p) : (
        cell.mine = true,
        danger.push(parse(cell.id)),
        adjCellOpen(numAdder1, adjacenters(...parse(cell.id))),
        mines(p - 1)
    )
}
function numAdder1(cell) {
    cell.number = cell.number + 1;
}
function parse(id) {
  let y = id % props.lengthInput;
  let x = (id - y ) / props.widthInput;
  return [x, y]
}
function c(x, y) {
    return game.field[x][y]
}

function gameOver() {
    adjCellOpen(openBombs, danger);
    Object.freeze(game);
    updateStates('lose');

}
function openBombs(cell) {
  cell.revealed = true;
  cell.textContent = 'B';
  cell.htmlClass = 'bomb';
  render(cell);

}
function winCheck() {
    if (game.revealed + props.mineCount === game.area) {
        console.log('You Win!');
        updateStates('win');
    }
}
function generateTable() {
        var table = document.createElement('table');
        var div = document.getElementById('gameLocation');
        for (let i = 0; i < props.widthInput; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < props.lengthInput; j++ ) {
                let cell = document.createElement('td');
                cell.id = i * props.widthInput + j;
                row.appendChild(cell);
            }
            table.appendChild(row)
        }
        div.appendChild(table)
        table.addEventListener('click', handleClick);
}
// function renderSt() {
//         for (let i = 0; i < props.widthInput; i++) {
//             for (let j = 0; j < props.lengthInput; j++ ) {
//                 let td = document.getElementById(i * props.widthInput + j);
//                 let cell = c(i, j);
//                 td.textContent = cell.textContent;
//                 td.className = cell.htmlClass;
//         }
//     }
// }
// function openControlFlow(cell) {
//     console.log(`opening ${cell}`)
//     if (cell.revealed) {
//         console.log('cell already revealed');
//     }
//     if (!cell.revealed) {
//         cell.revealed = true;
//         cell.htmlClass = 'revealed';
//         game.revealed = game.revealed + 1;
//         if (cell.number === 0) {
//           render(cell);
//             adjCellOpen(openControlFlow, adjacenters(...parse(cell.id)));
//         }
//         if (!cell.mine) {
//           cell.textContent = cell.number;
//           render(cell);
//         }
//         if (cell.mine) {
//             cell.textContent = "B";
//             cell.htmlClass = 'focusBomb';
//             render(cell);
//             gameOver();
//         }
//     }
// }
// function flagFlow(cell) {
//   if (!cell.flagged && !cell.revealed) {
//       cell.textContent = 'F';
//       cell.htmlClass = 'flagged';
//       cell.flagged = true;
//       render(cell);
//   } else if (cell.flagged && !cell.revealed) {
//     cell.textContent = '';
//     cell.htmlClass = '';
//     cell.flagged = false;
//     render(cell);
//   } else {
//       console.log('can\'t do that')
//   }
// }


function handleClick(evt) {
   var cell = c(...parse(evt.target.id));
    winCheck();
    if (evt.shiftKey) {
      controller.flag(cell);
    } else {
      controller.gamePlay(cell);
    }
    // renderSt();
};
function adjacenters(x, y) {
    var maxW = props.widthInput - 1;
    var maxL = props.lengthInput - 1;
    var adj = {
        lc: [x, y - 1],
        lt: [x - 1, y - 1],
        lb: [x + 1, y - 1],
        rc: [x, y + 1],
        rt: [x - 1, y + 1],
        rb: [x + 1, y + 1],
        ct: [x - 1, y],
        cb: [x + 1, y]
    }
    var neighbors = (
        x === 0 ?  y === 0 ? [adj.rc, adj.rb, adj.cb] :  y === maxW ? [adj.lc, adj.lb, adj.cb] : [adj.lc, adj.lb, adj.rc, adj.rb, adj.cb] :  y === maxW ?  x === 0 ? [adj.lc, adj.lb, adj.cb] :  x === maxL ? [adj.lc, adj.lt, adj.ct] : [adj.lc, adj.lt, adj.lb, adj.ct, adj.cb] :  x === maxL ?  y === maxW ? [adj.lc, adj.lt, adj.ct] :  y === 0 ? [adj.rc, adj.rt, adj.ct] : [adj.lc, adj.lt, adj.ct, adj.rt, adj.rc] :  y === 0 ? x === maxL ? [adj.rc, adj.rt, adj.ct] : x === 0 ? [adj.rb, adj.rc, adj.cb] : [adj.rc, adj.rt, adj.rb, adj.ct, adj.cb] : [adj.lc, adj.lt, adj.lb, adj.rc, adj.rt, adj.rb, adj.ct, adj.cb]
      );
  return neighbors
}
function adjCellOpen(cb, array) {
    if (array.length > 0) {
    let x = array[0][0];
    let y = array[0][1];
    let cell = c(x, y);
          cb(cell);
      adjCellOpen(cb, array.slice(1));
  } else {
    return;
  }
}
