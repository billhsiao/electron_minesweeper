
initialize();

var game, player;
const props = {
    mineCount : null,
    widthInput : null,
    lengthInput : null
}
function setGameProps(evt) {
    var event = evt.target.id;
    if (event === 'minecount_input') {
        props.mineCount = +evt.target.value;
        console.log(evt.target.value);
    } else if (event === 'width_input') {
        props.widthInput = +evt.target.value;
    } else if (event === 'length_input') {
        props.lengthInput = +evt.target.value;
    }
}
function display(cb) {
    game = new Board(props.widthInput, props.lengthInput);
    mines(props.mineCount, props.widthInput * props.lengthInput);
    return game
}
function mines(p) {
    if (p === 0) {
        return
    };
    let cell = c(...parse(Math.floor(Math.random() * (props.widthInput * props.lengthInput))));
    cell.mine ? mines(p) : (
        cell.mine = true,
        adjCellOpen(numAdder1, adjacenters(...parse(cell.id))),
        mines(p - 1)
    )
}
function parse(id) {
  let y = id % props.lengthInput;
  let x = (id - y ) / props.widthInput;
  return [x, y]
}
function c(x, y) {
    return game.field[x][y]
}
function player(value) {
    this.flag = value;
}
function initialize() {
   player = new player(null);
    document.getElementById('minecount_input').addEventListener('input', setGameProps);
    document.getElementById('width_input').addEventListener('input', setGameProps);
    document.getElementById('length_input').addEventListener('input', setGameProps);
    document.getElementById('play_button').addEventListener('click', display);
    document.getElementById('button').addEventListener('click', createCells);
    document.getElementById('flag').addEventListener('click', flagHandler)
}
function gameOver() {
    console.log('game over')
}
function winCheck() {
    if (game.revealed + props.mineCount === game.area) {
        console.log('You Win!')
    }
}
function createCells() {
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
function renderSt() {
        for (let i = 0; i < props.widthInput; i++) {
            for (let j = 0; j < props.lengthInput; j++ ) {
                let td = document.getElementById(i * props.widthInput + j);
                let cell = c(i, j);
                td.textContent = cell.textContent;
                td.className = cell.htmlClass;
        }
    }
}
function openControlFlow(cell) {
    console.log(`opening ${cell}`)
    if (cell.revealed) {
        console.log('cell already revealed');
    }
    if (!cell.revealed) {
        cell.revealed = true;
        cell.htmlClass = 'revealed';
        game.revealed = game.revealed + 1;
        if (cell.number === 0) {
            adjCellOpen(openControlFlow, adjacenters(...parse(cell.id)));
        }
        if (!cell.mine) {
            cell.textContent = cell.number;
        }
        if (cell.mine) {
            cell.textContent = "B";
            cell.htmlClass = 'bomb';
        }
    }
}
function numAdder1(cell) {
    cell.number = cell.number + 1;
}
function handleClick(evt) {
   var cell = c(...parse(evt.target.id));
    winCheck();
    if (evt.shiftKey) {
        if (!cell.flagged) {
            cell.textContent = 'F';
            cell.htmlClass = 'flagged';
            cell.flagged = true;
        } else {
            cell.textContent = '';
            cell.htmlClass = '';
            cell.flagged = false;
        }
    } else {
    openControlFlow(cell);
    }
    console.log(cell);

    renderSt();
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
        x === 0 ?
        y === 0 ? [adj.rc, adj.rb, adj.cb] :
        y === maxW ? [adj.lc, adj.lb, adj.cb] : [adj.lc, adj.lb, adj.rc, adj.rb, adj.cb] :
        y === maxW ?
        x === 0 ? [adj.lc, adj.lb, adj.cb] :
        x === maxL ? [adj.lc, adj.lt, adj.ct] : [adj.lc, adj.lt, adj.lb, adj.ct, adj.cb] :
        x === maxL ?
        y === maxW ? [adj.lc, adj.lt, adj.ct] :
        y === 0 ? [adj.rc, adj.rt, adj.ct] : [adj.lc, adj.lt, adj.ct, adj.rt, adj.rc] :
        y === 0 ?
        x === maxL ? [adj.rc, adj.rt, adj.ct] :
        x === 0 ? [adj.rb, adj.rc, adj.cb] : [adj.rc, adj.rt, adj.rb, adj.ct, adj.cb] : [adj.lc, adj.lt, adj.lb, adj.rc, adj.rt, adj.rb, adj.ct, adj.cb]
        //Object.values(adj)
      );
  return neighbors
}
function adjCellOpen(cb, array) {
    console.log(array);
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

function flagHandler(evt) {
    var flag = evt.target.textContent;
    if (flag === 'flagOff') {
        evt.target.textContent = "flag on";
        flag =  evt.target.textContent;
        player.flag = true;
        return 1;
    } else if (flag === "flag on") {
         evt.target.textContent = 'flagOff';
        flag =  evt.target.textContent;
        player.flag = false;
        return 0;
    }
    console.dir(evt.target, evt.target.focus);
};

function reset() {
    game = null;
}c
