function SD(){
    this.sdArr = [];//Matriz  de sudoku generada    	
    this.errorArr = [];//Cuadrícula  de errores.
    this.blankNum = 30;// Número de celdas en blanco 
    this.backupSdArr = [];//Copia de seguridad de la matriz de Sudoku
}

SD.prototype={
    constructor:SD,
    init:function(blankNum){
        this.createDoms();
        var beginTime = new Date().getTime();
        this.createSdArr();
        console.log(new Date().getTime() / 1000)+ "Generación de Sudoku completada, consume mucho tiempo: ";
                this.blankNum = this.setLevel()||blankNum || this.blankNum;		
        this.drawCells();
        this.createBlank(this.blankNum);
        this.createBlankCells();
    },
    reset:function(){
        // Reiniciar el programa.。
        this.errorArr = [];
        $(".sdspan").removeClass('bg_red blankCell');
        var beginTime = new Date().getTime();
        this.createSdArr();
        console.log(new Date().getTime() / 1000)+ "Generación de Sudoku completada, consume mucho tiempo: ";
        this.blankNum = this.setLevel()||this.blankNum;
        $(".sdspan[contenteditable=true]").prop('contenteditable',false);
        this.drawCells();
        this.createBlank(this.blankNum);
        this.createBlankCells();
    },
    again:function(){
        // reproducir el juego
        this.errorArr = [];
        $(".sdspan").removeClass('bg_red blankCell');		
        this.createBlankCells();
    },
    setLevel:function(){
        // Dificultad de entrada del usuario.
        var num = prompt("Por favor ingrese la dificultad (5-50) "); 
        if(!isNaN(num)){
            num = parseInt(num);
            num = num<5?5:num;
            num = num>50?50:num;
        }else{
            num = false;
        }
        return num;
    },
    createSdArr:function(){
        // Generar una matriz de sudoku.
        var that = this;
        try{
            this.sdArr = [];
            this.setThird(2,2);
            this.setThird(5,5);
            this.setThird(8,8);
            var allNum = [1,2,3,4,5,6,7,8,9];
            outerfor:
            for(var i=1;i<=9;i++){
                innerfor:
                for(var j=1;j<=9;j++){
                    if(this.sdArr[parseInt(i+''+j)]){
                        continue innerfor;
                    }
                    var XArr = this.getXArr(j,this.sdArr);
                    var YArr = this.getYArr(i,this.sdArr);
                    var thArr = this.getThArr(i,j,this.sdArr);
                    var arr = getConnect(getConnect(XArr,YArr),thArr);
                    var ableArr = arrMinus(allNum,arr);


                    if(ableArr.length == 0){
                        this.createSdArr();
                        return;
                        break outerfor;
                    }


                    var item;
                    // Regenerar si el generado está duplicado.

                    do{
                        item = ableArr[getRandom(ableArr.length)-1];
                    }while(($.inArray(item, arr)>-1));


                    this.sdArr[parseInt(i+''+j)] = item;
                }
            }
            this.backupSdArr = this.sdArr.slice();
        }catch(e){
            // Si ocurre un error porque se excedió el límite de pila del navegador, vuelva a ejecutar.
            that.createSdArr();
        }
    },
    getXArr:function(j,sdArr){
        //Obtener el valor de la fila.
        var arr = [];
        for(var a =1;a<=9;a++){
            if(this.sdArr[parseInt(a+""+j)]){
                arr.push(sdArr[parseInt(a+""+j)])
            }
        }
        return arr;
    },
    getYArr:function(i,sdArr){
        //Obtenga el valor de la columna en la que se encuentra.
        var arr = [];
        for(var a =1;a<=9;a++){
            if(sdArr[parseInt(i+''+a)]){
                arr.push(sdArr[parseInt(i+''+a)])
            }
        }
        return arr;
    },
    getThArr:function(i,j,sdArr){
        //Obtener el valor de las tres grillas donde se encuentra.
        var arr = [];
        var cenNum = this.getTh(i,j);
        var thIndexArr = [cenNum-11,cenNum-1,cenNum+9,cenNum-10,cenNum,cenNum+10,cenNum-9,cenNum+1,cenNum+11];
        for(var a =0;a<9;a++){
            if(sdArr[thIndexArr[a]]){
                arr.push(sdArr[thIndexArr[a]]);
            }
        }
        return arr;
    },
    getTh:function(i,j){
        //Obtenga las coordenadas de la posición media de la cuadrícula de tres cuadrados donde se encuentra.
        var cenArr = [22,52,82,25,55,85,28,58,88];
        var index = (Math.ceil(j/3)-1) * 3 +Math.ceil(i/3) -1;
        var cenNum = cenArr[index];
        return cenNum;
    },
    setThird:function(i,j){
        //Genera aleatoriamente tres cuadrados en la diagonal.
        var numArr = [1,2,3,4,5,6,7,8,9];
        var sortedNumArr= numArr.sort(function(){return Math.random()-0.5>0?-1:1});
        var cenNum = parseInt(i+''+j);
        var thIndexArr = [cenNum-11,cenNum-1,cenNum+9,cenNum-10,cenNum,cenNum+10,cenNum-9,cenNum+1,cenNum+11];
        for(var a=0;a<9;a++){
            this.sdArr[thIndexArr[a]] = sortedNumArr[a];
        }
    },
    drawCells:function(){
        // Rellene la matriz generada en la cuadrícula de nueve cuadrados
        for(var j =1;j<=9;j++){
            for(var i =1;i<=9;i++){					
                $(".sdli").eq(j-1).find(".sdspan").eq(i-1).html(this.sdArr[parseInt(i+''+j)]);
            }
        }
    },
    createBlank:function(num){
        //Generar las coordenadas del número especificado de celdas en blanco.
        var blankArr = [];
        var numArr = [1,2,3,4,5,6,7,8,9];
        var item;
        for(var a =0;a<num;a++){
            do{
                item = parseInt(numArr[getRandom(9) -1] +''+ numArr[getRandom(9) -1]);
            }while($.inArray(item, blankArr)>-1);
            blankArr.push(item);
        }
        this.blankArr = blankArr;
    },
    createBlankCells:function(){
        //Eliminar el valor de una parte de la cuadrícula en el Sudoku creado y completarlo para el usuario. Haga que la cuadrícula correspondiente sea editable y agregue eventos.
        var blankArr = this.blankArr,len = this.blankArr.length,x,y,dom;


        for(var i =0;i<len;i++){
            x = parseInt(blankArr[i]/10);
            y = blankArr[i]%10;	
            dom = $(".sdli").eq(y-1).find(".sdspan").eq(x-1);
            dom.attr('contenteditable', true).html('').addClass('blankCell');		
            this.backupSdArr[blankArr[i]] = undefined;
        }


        $(".sdspan[contenteditable=true]").keyup(function(event) {
            var val = $(this).html();			
            var reStr = /^[1-9]{1}$/;
            if(!reStr.test(val)){
                $(this).html('');
            };
        });
    },
    checkRes:function(){
        //Detectar el resultado de la entrada del usuario. Agregue la entrada a la matriz antes de verificar. Al detectar uno solo, el valor de este se almacena en caché y se elimina de la matriz, y la detección finaliza en la parte posterior de la asignación.
        var blankArr = this.blankArr,len = this.blankArr.length,x,y,dom,done,temp;
        this.getInputVals();
        this.errorArr.length = 0;
        for(var i =0;i<len;i++){
            x = parseInt(blankArr[i]/10);
            y = blankArr[i]%10;
            temp = this.backupSdArr[blankArr[i]];
            this.backupSdArr[blankArr[i]] = undefined;
            this.checkCell(x,y);
            this.backupSdArr[blankArr[i]] = temp;


        }
        done = this.isAllInputed();
        if(this.errorArr.length == 0 && done ){
            alert('¡tú ganas!');
            $(".bg_red").removeClass('bg_red');
        }else{
            if(!done){
                alert("¡No terminaste el juego!");
            }
            this.showErrors();
        }
    },
    checkCell:function(i,j){
        //Compruebe si el valor ingresado en una cuadrícula ya existe en los palacios horizontal y vertical.
        var index = parseInt(i+''+j);
        var backupSdArr = this.backupSdArr;
        var XArr = this.getXArr(j,backupSdArr);
        var YArr = this.getYArr(i,backupSdArr);
        var thArr = this.getThArr(i,j,backupSdArr);
        var arr = getConnect(getConnect(XArr,YArr),thArr);			
        var val = parseInt($(".sdli").eq(j-1).find(".sdspan").eq(i-1).html());
        if($.inArray(val, arr)>-1){
            this.errorArr.push(index);
        }
    },
    getInputVals:function(){
        //Agregue el resultado ingresado por el usuario a la matriz.
        var blankArr = this.blankArr,len = this.blankArr.length,i,x,y,dom,theval;
        for(i=0;i<len;i++){
            x = parseInt(blankArr[i]/10);
            y = blankArr[i]%10;	
            dom = $(".sdli").eq(y-1).find(".sdspan").eq(x-1);
            theval = parseInt(dom.text())||undefined;
            this.backupSdArr[blankArr[i]] = theval;
        }
    },
    isAllInputed:function(){
        //Comprobar si se han introducido todos los espacios.
        var blankArr = this.blankArr,len = this.blankArr.length,i,x,y,dom;
        for(i=0;i<len;i++){
            x = parseInt(blankArr[i]/10);
            y = blankArr[i]%10;	
            dom = $(".sdli").eq(y-1).find(".sdspan").eq(x-1);
            if(dom.text()==''){
                return false
            }
        }
        return true;
    },
    showErrors:function(){
        // Mostrar el error.
        var errorArr = this.errorArr,len = this.errorArr.length,x,y,dom;
        $(".bg_red").removeClass('bg_red');
        for(var i =0;i<len;i++){
            x = parseInt(errorArr[i]/10);
            y = errorArr[i]%10;	
            dom = $(".sdli").eq(y-1).find(".sdspan").eq(x-1);
            dom.addClass('bg_red');
        }
    },
    createDoms:function(){
        //Generar la cuadrícula de nueve cuadrados.
        var html='<ul class="sd clearfix">';
        String.prototype.times = String.prototype.times || function(n) { return (new Array(n+1)).join(this);}; 
        html = html + ('<li class="sdli">'+'<span class="sdspan"></span>'.times(9) +'</li>').times(9)+'</ul>';
        $("body").prepend(html);


        for(var k=0;k<9;k++){
            $(".sdli:eq("+k+") .sdspan").eq(2).addClass('br');
            $(".sdli:eq("+k+") .sdspan").eq(5).addClass('br');
            $(".sdli:eq("+k+") .sdspan").eq(3).addClass('bl');
            $(".sdli:eq("+k+") .sdspan").eq(6).addClass('bl');
        }
        $(".sdli:eq(2) .sdspan,.sdli:eq(5) .sdspan").addClass('bb');
        $(".sdli:eq(3) .sdspan,.sdli:eq(6) .sdspan").addClass('bt');
    }		
}




//genera un entero positivo aleatorio
function getRandom(n){
    return Math.floor(Math.random()*n+1)
}


// Unión de dos arreglos simples.
function getConnect(arr1,arr2){
    var i,len = arr1.length,resArr = arr2.slice();
    for(i=0;i<len;i++){
        if($.inArray(arr1[i], arr2)<0){
            resArr.push(arr1[i]);
        }
    }
    return resArr;
}


//La diferencia entre dos arreglos simples, arr1 es un arreglo grande
function　arrMinus(arr1,arr2){
    var resArr = [],len = arr1.length;
    for(var i=0;i<len;i++){
        if($.inArray(arr1[i], arr2)<0){
            resArr.push(arr1[i]);
        }
    }
    return resArr;
}
