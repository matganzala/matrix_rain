const canvas = document.getElementById("canvas");
const contexto = canvas.getContext("2d");

let larguraTela = window.innerWidth;
let alturaTela = window.innerHeight;

canvas.width = larguraTela;
canvas.height = alturaTela;

window.addEventListener('resize', function(event) {
    larguraTela = window.innerWidth;
    alturaTela = window.innerHeight;
    canvas.width = larguraTela;
    canvas.height = alturaTela;
}, true);

const caracteres = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "1", "2", "3", "4", "5", "6", "7", "8",
    "А", "В", "Г", "Д", "Є", "Ѕ", "З", "И", "Ѳ", "І", "К", "Л", "М", "Н", "Ѯ", "Ѻ", "П", "Ч", "Р", "С", "Т", "Ѵ", "Ф", "Х", "Ѱ", "Ѿ", "Ц"
];

let maxCaracteres = 300;
let caracteresCaindo = [];
let tamanhoFonte = 13;
let maxColunas = larguraTela / tamanhoFonte;

let quadros = 0;

class CaractereCaindo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.valor = caracteres[Math.floor(Math.random() * caracteres.length)].toUpperCase();
        this.velocidade = (Math.random() * tamanhoFonte * 2) + tamanhoFonte;
    }

    desenhar(ctx) {
        ctx.fillStyle = "rgba(0,255,0,0.8)";
        ctx.font = tamanhoFonte + "px sans-serif";
        ctx.fillText(this.valor, this.x, this.y);
        this.y += this.velocidade;

        if (this.y > alturaTela) {
            this.y = -tamanhoFonte;
            this.x = Math.floor(Math.random() * maxColunas) * tamanhoFonte;
            this.valor = caracteres[Math.floor(Math.random() * caracteres.length)].toUpperCase();
            this.velocidade = (Math.random() * tamanhoFonte * 2) + tamanhoFonte;
        }
    }
}

function atualizar() {
    if (caracteresCaindo.length < maxCaracteres && quadros % 5 === 0) {
        let caractereCaindo = new CaractereCaindo(
            Math.floor(Math.random() * maxColunas) * tamanhoFonte,
            Math.random() * alturaTela - tamanhoFonte
        );
        caracteresCaindo.push(caractereCaindo);
    }

    contexto.fillStyle = "rgba(0,0,0,0.05)";
    contexto.fillRect(0, 0, larguraTela, alturaTela);

    for (let i = 0; i < caracteresCaindo.length; i++) {
        caracteresCaindo[i].desenhar(contexto);
    }

    requestAnimationFrame(atualizar);
    quadros++;
}

atualizar();
