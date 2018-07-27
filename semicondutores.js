/* Programa feito por André Paiva Rodrigues e Pedro Augusto em 22/07/2018 para a disciplina ENGA47 -  Tecnologia dos Materiais 
    para a Engenharia Elétrica da UFBA, ministrada pelo professor Tiago Trindade Ribeiro */

var tipoSemiCondutor = 'P';
var materialSemiCondutor = 'silicio';

const MOBILIDADE_DOS_ELETRONS_SILICIO = 1350;
const MOBILIDADE_DOS_ELETRONS_GERMANIO = 3900;

const MOBILIDADE_DOS_BURACOS_SILICIO = 480;
const MOBILIDADE_DOS_BURACOS_GERMANIO = 1900;

const PARAMETRO_DE_REDE_SILICIO = 5.431; //em Angstroms
const PARAMETRO_DE_REDE_GERMANIO = 5.6575; //em Angstroms

const TEMPERATURA_FUSAO_SILICIO = 1688; //em Kelvin
const TEMPERATURA_FUSAO_GERMANIO = 1209; //em Kelvin

const VALOR_MINIMO_TEMPERATURA = 150; //em Kelvin
const VALOR_MAXIMO_TEMPERATURA = 500; //em Kelvin

const CARGA_ELETRON = 1.6 * (Math.pow(10, -19));


function calcular() {
    let select = document.getElementById('materialSemiCondutor');
    materialSemiCondutor = select.options[select.selectedIndex].value;

    var temperaturaInicial = document.getElementById('temperaturaInicial').value;
    var temperaturaFinal = document.getElementById('temperaturaFinal').value;

    var condutividade = document.getElementById('condutividade').value;
    condutividade = condutividade.replace(',', '.'); // para o caso do usuário botar vírgula ao invés de ponto na casa decimal do número
    condutividade = Number.parseFloat(condutividade); // transformando a string em um float

    let nomeCondutor;
    let mobilidade;
    let parametroDeRede;
    let temperaturaMaterial;

    switch(materialSemiCondutor) {
        case 'silicio' : {
            nomeCondutor = "Si";
            mobilidade = tipoSemiCondutor === 'P' ? MOBILIDADE_DOS_BURACOS_SILICIO : MOBILIDADE_DOS_ELETRONS_SILICIO;
            parametroDeRede = PARAMETRO_DE_REDE_SILICIO * Math.pow(10, -8);
            temperaturaMaterial = TEMPERATURA_FUSAO_SILICIO;
            break;
        }
        case 'germanio' : {
            nomeCondutor = "Ge";
            mobilidade = tipoSemiCondutor === 'P' ? MOBILIDADE_DOS_BURACOS_GERMANIO : MOBILIDADE_DOS_ELETRONS_GERMANIO;
            parametroDeRede = PARAMETRO_DE_REDE_GERMANIO * Math.pow(10, -8);
            temperaturaMaterial = TEMPERATURA_FUSAO_GERMANIO;
            break;
        }
        default: break;
    }

    let numeroDePortadoresDeCargaPorVolume = condutividade / (CARGA_ELETRON * mobilidade);

    let concentracaoDeDopantesPorAtomoDeMaterial = Math.pow(parametroDeRede, 3) * numeroDePortadoresDeCargaPorVolume / 8;


    if (tipoSemiCondutor === 'P') {
        document.getElementById('divtipoP').setAttribute('style', 'display: block');
        document.getElementById('divtipoN').setAttribute('style', 'display: none');
    } else {
        document.getElementById('divtipoN').setAttribute('style', 'display: block');
        document.getElementById('divtipoP').setAttribute('style', 'display: none');
    }

    let flagFaixaFora;
    let flagDerreteu;

    if (temperaturaInicial < VALOR_MINIMO_TEMPERATURA || temperaturaInicial > VALOR_MAXIMO_TEMPERATURA) {
        flagFaixaFora = true;
    } else if (temperaturaFinal < VALOR_MINIMO_TEMPERATURA || temperaturaFinal > VALOR_MAXIMO_TEMPERATURA ) {
        flagFaixaFora = true;
    } else {
        flagFaixaFora = false;
    }

    if (temperaturaFinal > temperaturaMaterial || temperaturaInicial > temperaturaMaterial) {
        flagDerreteu = true;
    } else {
        flagDerreteu = false;
    }

    if (flagFaixaFora) {
        document.getElementById('divForaDaFaixa').setAttribute('style', 'display: block');
    } else {
        document.getElementById('divForaDaFaixa').setAttribute('style', 'display: none');
    }

    if (flagDerreteu) {
        document.getElementById('divDerreteu').setAttribute('style', 'display: block');
    } else {
        document.getElementById('divDerreteu').setAttribute('style', 'display: none');
    }

    let potencia1 = numeroDePortadoresDeCargaPorVolume.toExponential().split('e+')[1];
    if (potencia1 == null || potencia1 == undefined) {
        potencia1 = numeroDePortadoresDeCargaPorVolume.toExponential().split('e')[1];
    }

    let potencia2 = concentracaoDeDopantesPorAtomoDeMaterial.toExponential().split('e+')[1];
    
    if (potencia2 == null || potencia2 == undefined) {
        potencia2 = concentracaoDeDopantesPorAtomoDeMaterial.toExponential().split('e')[1];
    }

    document.getElementById('resultado').innerHTML="<br> Para a condutividade informada, a quantidade de átomos doadores por unidade de volume é: " +
    "<br> <h2> " + numeroDePortadoresDeCargaPorVolume.toExponential().substring(0,4) + " x 10 ^" + potencia1 + " átomos doadores/cm³ </h2>"
    +"<br> A pureza do material, dada em átomos de dopante por átomos de semicondutor, é dada por <br>"
    +" <h2> " + concentracaoDeDopantesPorAtomoDeMaterial.toExponential().substring(0,4) + " x 10 ^" + potencia2 + " átomos de dopante por átomos de " 
    + nomeCondutor + "</h2>"
    
}

function selecionarTipoP() {
    tipoSemiCondutor = 'P';
}

function selecionarTipoN() {
    tipoSemiCondutor = 'N';
}