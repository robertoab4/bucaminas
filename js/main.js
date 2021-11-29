"use strict"

class Tablero {
    constructor(alto, ancho, minas) {
        this.tablero = new Array(alto)
        this.alto = alto
        this.ancho = ancho
        this.minas = minas
    }

    crearTablero() {
        for (let i = 0; i < this.alto; i++) {
            this.tablero[i] = new Array()
            for (let j = 0; j < this.ancho; j++) {
                this.tablero[i][j] = "0"
            }
        }
    }

    crearMinas() {
        for (let i = 0; i < this.minas; i++) {
            let ejeX = Math.floor(Math.random() * this.alto)
            let ejeY = Math.floor(Math.random() * this.ancho)
            if( this.tablero[ejeX][ejeY] != "*") {
                this.tablero[ejeX][ejeY] = "*"
            }
        }
    }

    contarBombas() {
        let bombas = 0
        for (let x = 0; x < this.alto; x++) {
            for (let y = 0; y < this.ancho; y++) {
                bombas = this.contarUnaCasilla(x, y)
                if(this.tablero[x][y] != "*"){
                    this.tablero[x][y] = bombas
                }
            }
        }
    }

    contarUnaCasilla(x, y){
        let bombas = 0

        let coordenadasX = [x - 1, x, x + 1]
        let coordenadasY = [y - 1, y, y + 1]

        coordenadasX = coordenadasX.filter(a => a >= 0 && a < this.alto)
        coordenadasY = coordenadasY.filter(a => a >= 0 && a < this.ancho)

        coordenadasX.forEach(x => {
            coordenadasY.forEach(y => {
                if(this.tablero[x][y] == "*"){
                    bombas++
                }
            })
        })

        return bombas;
    }

    colocarNumeros(){
        for (let i = 0; i < this.alto; i++) {
            for (let j = 0; j < this.ancho; j++) {
                if(this.tablero[i][j] = ""){}
            }
        }
    }
}

function jugar(){
    document.getElementById("buscaminas").innerHTML = ""
    let alto = document.getElementById("alto").value
    let ancho = document.getElementById("ancho").value
    let minas = document.getElementById("minas").value

    document.getElementById("formulario").style.display = "none"

    // Esto crea un array
    let tablero = new Tablero(alto, ancho, minas)

    tablero.crearTablero()
    tablero.crearMinas()
    tablero.contarBombas()

    for (let y = 0; y < tablero.alto; y++) {
        document.getElementById("buscaminas").innerHTML += "<div class='fila" + (y + 1) + "'>"
        for (let x = 0; x < tablero.ancho; x++) {
            document.getElementById("buscaminas").innerHTML += "<button class='boton' id='" + y + "" + x + "'></button>"
        }
        document.getElementById("buscaminas").innerHTML += "</div>"
    }

    let casillas = [...document.getElementsByClassName("boton")]

    casillas.forEach(casilla => {
        casilla.addEventListener("click", () => {
            let y = casilla.id[0]
            let x = casilla.id[1]
            if(tablero.tablero[y][x] == "*"){
                alert("Perdiste")
                jugar()
            }
            else{
                casilla.innerText = tablero.tablero[y][x]
            }
        })
    })
}


document.getElementById("jugar").addEventListener("click", jugar)


