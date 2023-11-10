/**********************************************************************
 * Objetivo: Informações sobre os estados do Brasil.
 * Data: 20/10/2023.
 * Autor: Carolina Neponucena.
 * Versao: 1.0
 **********************************************************************/

var estados_cidades = require('./estados_cidades')

const getListaDeEstados = () =>{

    let estadosCidades = estados_cidades.estadosCidades.estados
    let JSONsigla = {}
    let ARRAYuf = []
   
    estadosCidades.forEach( estados => {
        ARRAYuf.push(estados.sigla)
    })

    JSONsigla.uf = ARRAYuf
    JSONsigla.quantidade = ARRAYuf.length

    return JSONsigla
}

console.log(getListaDeEstados())

const getDadosEstado = (sigla) =>{

    let estadosCidades = estados_cidades.estadosCidades.estados
    let JSONsigla = {}

    estadosCidades.forEach( function(estados){

        if(estados.sigla.includes(sigla)){

            JSONsigla.uf = estados.sigla
            JSONsigla.descricao = estados.nome
            JSONsigla.capital = estados.capital
            JSONsigla.regiao = estados.regiao
        }
       
    })

    return JSONsigla
}

// console.log(getDadosEstado('RJ'))

const getCapitalEstado = (sigla) =>{

    let estadosCidades = estados_cidades.estadosCidades.estados
    let JSONsigla = {}

    estadosCidades.forEach( function(estados){

        if(estados.sigla.includes(sigla)){
            JSONsigla.capital = estados.capital
        }

    })

    return JSONsigla
}

// console.log(getCapitalEstado('SP'))

const getEstadosRegiao = (regiao) =>{

    let estadosCidades = estados_cidades.estadosCidades.estados

    let ARRAYestados = []

    estadosCidades.forEach( function(estados){

        if(estados.regiao.includes(regiao))
        {
            let JSONregiao = {}
            JSONregiao.uf = estados.sigla
            JSONregiao.descricao = estados.nome

            ARRAYestados.push(JSONregiao)  
        }

    })

    return ARRAYestados
}

// console.log(getEstadosRegiao('Sudeste'))

const getCapitalPais = function () {

    const estados = estados_cidades.estadosCidades.estados

    let informacoesCapitaisPais = {}
    let listaCapitais = []

    estados.forEach(function (estado) {
        if (estado.capital_pais !== undefined) {
            let infoEstado = {
                capital_atual: estado.capital_pais.capital,
                uf: estado.sigla,
                descricao: estado.nome,
                capital: estado.capital,
                regiao: estado.regiao,
                ano_inicio_capital_pais: estado.capital_pais.ano_inicio,
                ano_termino_capital_pais: estado.capital_pais.ano_fim
            }

            listaCapitais.push(infoEstado)
        }
    })

    informacoesCapitaisPais.capitais = listaCapitais
   
    return informacoesCapitaisPais
}

// console.log(getCapitalPais())

const getCidades = function(siglaEstado){

    let estados = estados_cidades.estadosCidades.estados

    let uf = siglaEstado.toUpperCase()

    let estadoCidades = {}
    let cidades = []

    estados.forEach(function(estado){
        if(estado.sigla.toUpperCase().includes(uf)){
            estadoCidades.uf = estado.sigla
            estadoCidades.descricao = estado.nome
            estadoCidades.quantidade_cidades = estado.cidades.length

            estado.cidades.forEach(function(cidade) {
                cidades.push(cidade.nome)
            })
        }
    })

    estadoCidades.cidades = cidades
    console.log(estadoCidades)
    return estadoCidades
}

// console.log(getCidades('RJ'))

