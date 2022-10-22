class Grid {
    /**
     * 
     * @param {Number} row 
     * @param {Number} col 
     */
    constructor( row, col ) {
        this.row = row;
        this.col = col;
        // this.blockRow = Math.floor( row / 3 );
        // this.blockCol = Math.floor( col / 3 );
        this.visibility = true;
        this.value = 0;
        this.userValue = 0;
    }

    /**
     * Establecer valor (el valor en el juego final de Sudoku)
     * @param {Number} value
     */
    setValue( value ) {
        this.value = value;
    }

    /**
     * Valor rellenado por el usuario
     * @param {Number} value 
     */
    placeValue( value ) {
        this.userValue = value;
    }

    /**
     * Determinar si el valor ingresado por el usuario es correcto
     * @returns {Boolean}
     */
    isRight() {
        return this.value === this.userValue;
    }

    /**
     * Establecer si la cuadrícula es visible
     * @param {Boolean} v
     */
    setVisible( v ) {
        this.visibility = v;
    }

    /**
     * Compruebe si la cuadrícula es visible
     */
    isVisible() {
        return this.visibility;
    }

    /**
     * Determinar si el valor v está dentro del intervalo válido
     * @param {Number} v 
     */
    static isValidValue(v) {
        if( v > 0 && v < 10 ) {
            return true;
        }
        return false;
    }

    /**
     * Devuelve la fila y la columna del bloque donde se encuentra el objeto de cuadrícula.
     * @param {{row: Number, col: number}} grid 
     * @returns {{row:Number, col: Number}}
     */
    static blockBelonged(grid) {
        let block = {};
        block.row = Math.floor( grid.row / 3 );
        block.col = Math.floor( grid.col / 3 );
        return block;
    }
}

class Utils {
    /**
     * Los elementos de una matriz se deduplican y solo se conservan los elementos únicos
     * @param {Array<>} array matriz para deduplicar
     * @returns {Array<>} Matriz con todos los elementos únicos
     */
    static distinctArray(array) {
        let result = array.sort().reduce( (pre, current) => {
            if( pre.length == 0 || pre[pre.length-1] != current ) {
                pre.push( current );
            }
            return pre;
        }, []);
        return result;
    }

    /**
     * Eliminar los mismos elementos de la matriz básica que los de la matriz de exclusión
     * @param   {{basic: Array<Number>, exclude: Array<Number>, keepOrder: Boolean}} params
     * @param   {Array<Number>} basic  matriz básica
     * @param   {Array<Number>} exclude  Una matriz de elementos para excluir
     * @param   {Bollean} keepOrder  si se debe mantener el orden de la matriz original, si no o no está definido, la matriz se codificará
     * @returns {Array<Number>} Array de arrays con elementos superpuestos eliminados
     */
    static getRandomValue(params) {
        params = ( params === undefined ) ? {} : params;

        let basic = params.basic;
        let exclude = params.exclude;

        if( exclude && exclude.length > 0 ) {
            basic = [];
            for(let i = 1; i <= 9; i += 1) {
                if(exclude.indexOf(i) == -1) {
                    basic.push(i)
                }
            }
            // console.log("getR", basic, exclude)

            basic.sort( (a, b) => {
                return a > b;  // Ordenar de menor a mayor
            });

        } else if( basic === undefined ) {
            basic = this.genBasicArray();
            // let basic = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }

        if( !params.keepOrder )
            return this.randomArray(basic);
        else
            return basic;
    }

    /**
     * Baraja la matriz
     * @param {Array<>} array 
     * @returns Matriz fuera de servicio
     */
    static randomArray(array) {
        let size = array.length;
        let arr = new Array(size);
        let randomIndex;
        let exCount = 0;
        for(let i = 0; i < size; i++) {
            randomIndex = Math.floor( Math.random() * (size - exCount) );
            arr[i] = array[randomIndex];
            array[randomIndex] = array[ size - 1 - exCount ];
            array[ size - 1 - exCount ] = 0;
            exCount++;
        }
        return arr;
    }

    /**
     * Determine si un grupo de objetos Grid es válido, el valor es de 1 a 9 y no se repite
     * @param {Array<Number>} grids 
     *      
     * @returns {Boolean} 
     */
    static isGridsValueValid( gridsValue ) {
        let sum   = 0;
        let value = this.distinctArray(gridsValue);
        for( let i = 0; i < 9; i++ ) {
            sum += value[i];
        }

        if( sum == 45 ) {
            return true;
        }
        return false;
    }

    /**
     * Llene la matriz con 9 elementos 1 ~ 9 y devuelva la matriz
     * @returns {Array<Number>} Una matriz que contiene 9 matrices ordenadas del 1 al 9
     */
    static genBasicArray() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    /**
     * imprimir todas las cuadrículas en secuencia
     */
    static printAll(board) {
        let toPrint = "";
        let value, grid;
        for( let i = 0; i < 9; i++ ) {
            for( let j = 0; j < 9; j++ ) {
                grid = board.grids[i * 9 + j];
                if( grid.isVisible() )
                    value = grid.value
                else
                    value = 'X';
                    
                toPrint += value + " ";
            }

            toPrint += "\n";
        }

        console.log( toPrint );
    }

    static printRow(board, row) {
        let toPrint = "";
        for( let j = 0; j < 9; j++ ) {
            toPrint += board.grids[row * 9 + j].value + " ";
        }
        toPrint += "\n";

        console.log( toPrint );
    }
}

class Choice {
    /**
     * 
     * @param {Array<Number>} choiceSet 
     */
    constructor(choiceSet) {
        this.choiceSet = choiceSet;
        this.attemptIndex = -1;
    }

    /**
     * Mueva el índice a la siguiente posición y devuelva el número en esa posición
     */
    next() {
        this.attemptIndex++;
        if(this.attemptIndex <= this.choiceSet.length) {
            return this.choiceSet[this.attemptIndex];
        }
        return undefined;
    }
}

class Board {

    constructor() {
        this.grids = new Array( 81 );

        for( let i = 0; i < 9; i++ ) {
            for( let j = 0; j < 9; j++ ) {
                this.grids[i * 9 + j] = new Grid( i, j );
            }
        }
    }

    init() {
        // llenar la primera fila
        let row0 = this.getRowGrids(0);
        let randomArray = Utils.getRandomValue();
        randomArray.forEach( (element, index ) => {
            row0[index].setValue( element );
        });

        // Utils.printAll(this);
 
        let used, unused, grid, index;
        let temp = 0;
        for(let i = 1; i < 9; i += 1) {
            for(let j = 0; j < 9; j += 1) {
                grid = this.grids[i*9+j];
                // process.stdout.write( `i=${i}, j=${j}.  `);
                if( grid.choice === undefined ) {
                    used   = this.getUsedValueArrayAt( {row: i, col: j} );
                    unused = Utils.getRandomValue( {exclude: used} );
                    grid.choice = new Choice( unused );
                }
                index = this.populateGrid(grid);
                // console.log(used, unused, i, j, index)
                i = index.i; 
                j = index.j;
                temp += 1;
            }

        }
    }

    /**
     * Rellene los cuadrados y devuelva los índices i,j corregidos
     * 
     * Esta función pertenece a la parte de retroceso, cuando no hay un número opcional en el cuadrado, el índice se corrige para retroceder
     * @param {Grid} grid 
     * @returns {{i: Number, j: Number}}
     */
    populateGrid(grid) {
        let i = grid.row, j = grid.col;
        let value = grid.choice.next();

        if( value !== undefined ) {
            // Hay números para elegir
            grid.setValue(value);
        }
        else {
            // Sin números opcionales
            // Utils.printRow(this, i);
            grid.value  = 0;
            grid.choice = undefined;
            if( j == 0 ) {
                // i = (i > 0 ? i - 1 : i );
                i -= 1;
                j -= 1;
                this.resetPartialGrids({rowStart: i, rowEnd: i+1, colStart: 1, colEnd: 9});  // 返回上一行后，清空该行其它列的数据
            }
            else {
                j -= 2;
            }
        }
        return {i, j};
    }

    /**
     * Obtenga el conjunto de valores que se pueden almacenar en la posición pos (fuera de servicio)
     * 
     * Tenga en cuenta que puede haber casos en los que no haya ningún número disponible en cada posición, en cuyo caso la función devuelve 0 en lugar de indefinido
     * @param {{row: Number, col: Number}} pos 
     * @return Number
     */
    getRandomValidValue(pos) {
        let used = this.getUsedValueArrayAt(pos);
        let valueArray = Utils.getRandomValue({exclude: used});
        return valueArray[0] === undefined ? 0 : valueArray[0];
    }

    /**
     * Obtenga el conjunto de números usados ​​en la posición (i, j) de acuerdo con el patrón especificado
     * @param {{mode: String, row: Number, col: Number}} cond 
     *      el modo puede ser fila, columna o bloque
     * @returns Array<Number>
     */
    getUsedValueArray( cond ) {
        let grids = this.getGrids( cond );
        let arr = new Array();
        grids.forEach( grid => {
            if( Grid.isValidValue( grid.value ) )
                arr.push( grid.value )
        });
        return arr;
    }

    /**
     *Obtenga el conjunto de valores no disponibles en la posición pos, incluidos los valores que son válidos en la fila, columna y bloque donde se encuentra pos
     * @param {{row: Number, col: Number}} pos 
     * @returns Array<Number>
     */
    getUsedValueArrayAt(pos) {
        let row = pos.row;
        let col = pos.col;
        let used = new Array();
        let block = Grid.blockBelonged(pos);
        let rowGrids = this.getUsedValueArray( {mode: "row", row: row} );
        let colGrids = this.getUsedValueArray( {mode: "column", col: col});
        let blockGrids = this.getUsedValueArray( {mode: "block", row: block.row, col: block.col} );
        used.push.apply( used, rowGrids );
        used.push.apply( used, colGrids );
        used.push.apply( used, blockGrids );
        let result = Utils.distinctArray( used );
        // console.log( `used at: ${row}  ${col}  ${result}` );
        return result;
    }

    /**
     * Obtener todos los objetos de cuadrícula en fila fila
     * @param {Number} row
     * @return {Array<Grid>}
     */
    getRowGrids( row ) {
        let rowArray = new Array( 9 );

        for( let i = 0; i < 9; i++ ) {
            rowArray[i] = this.grids[i + row * 9];
        }

        return rowArray;
    }

    /**
     * Obtenga todos los objetos de cuadrícula en la columna columna
     * @param {Number} col 
     * @return {Array<Grid>}
     */
    getColumnGrids( col ) {
        let colArray = new Array( 9 );

        for( let i = 0; i < 9; i++ ) {
            colArray[i] = this.grids[i * 9 + col];
        }

        return colArray;
    }

    /**
     * Obtenga el objeto de cuadrícula de un bloque (el número de filas en el bloque es fila y el número de columnas en el bloque es col)
     * @param {Number} row 
     * @param {Number} col 
     * @return {Array<Grid>}
     */
    getBlockGrids( row, col ) {
        let block = new Array( 9 );

        for( let i = 0; i < 3; i++ ) {
            for( let j = 0; j < 3; j++ ) {
                block[i * 3 + j] = this.grids[ ( row ) * 27 + col * 3 + i * 9 + j ];
            }
        }

        return block;
    }

    /**
     * Obtenga la grilla de cualquier área válida
     * row range: [rowStart, rowEnd) , rowStart is INCLUDED while rowEnd is not
     * col range: [colStart, colEnd)
     * @param {{rowStart: Number, colStart: Number, rowEnd: Number, colEnd: Number}} area 
     * @return {Array<Grid>}
     */
    getPartialGrids(area) {
        let size = (area.rowEnd - area.rowStart) * (area.colEnd - area.colStart);
        if( size <= 0 ) {
            return new Array();
        }
        let part = new Array();

        for(let i = area.rowStart; i < area.rowEnd; i++) {
            for( let j = area.colStart; j < area.colEnd; j++ ) {
                part.push( this.grids[i*9+j] );
            }
        }
        return part;
    }

    /**
     * restablecer el valor de una parte de la cuadrícula a 0
     * 
     * row range: [rowStart, rowEnd) , rowStart is INCLUDED while rowEnd is not
     * 
     * col range: [colStart, colEnd)
     * @param {{rowStart: Number, colStart: Number, rowEnd: Number, colEnd: Number}} area 
     */
    resetPartialGrids(area) {
        let part = this.getPartialGrids(area);
        part.forEach( grid => {
            grid.value = 0;
            grid.choice = undefined;
        });
    }

    /**
     * Obtener la red de acuerdo con el parámetro cond
     * @param {{mode: String, row:Number, col: Number}} cond 
     */
    getGrids(cond) {
        let mode = cond.mode;
        let grids;
        switch (mode) {
            case "row":
            grids = this.getRowGrids( cond.row );
            break;
            case "column":
            grids = this.getColumnGrids( cond.col );
            break;
            case "block":
            grids = this.getBlockGrids( cond.row, cond.col );
            break;
            default: 
            grids = new Array();
            break;
        }
        return grids;
    }

    /**
     * El usuario completa fila fila, columna col con valor num
     * @param {Number} row 
     * @param {Number} col 
     * @param {Number} num 
     */
    setNumberAt( row, col, num ) {
        if(     row < 0 || row > 8
            ||  col < 0 || col > 8
            ||  num < 0 || num > 9 ) {
            console.log( "Position or Number is invalid." )
            return;
        }

        let grid = this.grids[row * 9 + col];
        grid.placeValue( num );
    }

    /**
     * Determina si el tablero actual es un tablero final de Sudoku válido y devuelve falso si no cumple con las reglas de Sudoku.
     * @param {Boolean} userPlaced Ya sea para juzgar el valor rellenado por el usuario
     */
    isValid(userPlaced) {
        let grids;
        let sum = 0;
        let valid = true;
        for(let i = 0; i < 9; i++) {
            grids = this.getRowGrids(i);
            sum = this.sumGrids( grids, userPlaced );
            valid &= ( sum === 45 );
            sum = 0;
        }

        for(let i = 0; i < 9; i++) {
            grids = this.getColumnGrids(i);
            sum = this.sumGrids( grids, userPlaced );
            valid &= ( sum === 45 );
            sum = 0;
        }

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                grids = this.getBlockGrids(i, j);
                sum = this.sumGrids( grids, userPlaced );
                valid &= ( sum === 45 );
                sum = 0;
            }
        }
        return valid;
    }

    /**
     * 
     * @param {Array<Grid>} grids 
     * @param {Boolean} userPlaced
     */
    sumGrids(grids, userPlaced) {
        let sum = 0;
        grids.forEach(g => {
            if( userPlaced && !g.isVisible()) {
                sum += g.userValue;
            }
            else {
                sum += g.value;
            }
        });
        return sum;
    }
}

Board.width  = 9;
Board.height = 9;

class Game {
    constructor( difficuty ) {
        this.board = new Board();
        this.board.init();
        if( difficuty <= 0 || difficuty > 3 ) {
            difficuty = 2;
        }
        this.digTimes = difficuty*2;

        this.digBoard();
    }

    /**
     * Excave una parte de la cuadrícula y establezca el atributo en oculto
     */
    digBoard() {
        let dig = 0, block;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                for( let k = 0; k < this.digTimes; k++) {
                    block = this.board.getBlockGrids(i, j);
                    dig   = Math.floor( Math.random() * 9 );

                    if( block[dig].isVisible() ) {
                        // avoid duplicated hiding
                        block[dig].setVisible(false);
                    } 
                }
            }
        }
        // Utils.printAll(this.board);
    }

    /**
     * Si el valor devuelto no está definido, significa que el valor de esta posición no debe mostrarse
     * @param {Number} row índice de fila
     * @param {Number} col índice de columna
     */
    getValueAt(row, col) {
        let grid = this.board.grids[ row * 9 + col ];
        if( grid.isVisible() )
            return grid.value;

        return undefined
    }

}

Game.DifficutyEasy = 1;
Game.DifficutyNormal = 2;
Game.DifficutyHard = 3;

// export {Game, Board, Grid}
