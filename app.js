/**********************************************************************************
 * Objetivo: Criar uma API para responder dados de Estados e Cidades
 * Data: 10/11/2023
 * Autor: Carolina Neponucena
 * Versao:1.0
 **********************************************************************************/

/**********************************************************************************
 * Instalações da dependencias para a criação da API
 * express             -npm install express --save
 * Dependencia para auxiliar na criação da API 
 * 
 * cors                -npm install cors --save
 * Dependencia para manipular recursos de acesso, permissões, etc da API (HEADER)
 * 
 * body-parser         -npm install body-parser --save
 * Dependencia para auxiliar na chegada de dados da API (BODY)
 ***********************************************************************************/
/*************************************************************************************
 * REQUISICAO DE DADOS
 * Metodos:
 * GET - Pegar dados
 * POST - Envia dados
 * PUT - Altera dados existentes
 * DELETE - Apaga dados existentes
 * ----------------------------------------------------------------------------------
 * HEADER - Enderecamento de dados (Quem envia e quem recebe)
 * BODY - Conteúdo de dados 
 *************************************************************************************/

//Import das bibliotecas do projeto 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { request } = require('http')

//Cria um objeto app tendo como referencia a classe do express
const app = express()

//REQUEST - Receber dados
//RESPONSE - Devolve dados

//Função para configuração as permições do cors 
app.use((request, response, next)=>{
    //Configura quem poderá fazer requisiçoes na API (* - Libera para todos | IP restringe o acesso )
    response.header('Access-Control-Allow-Origin', '*')
    //Configura os metodos que poderão ser utilizados na API (GET, POST, PUT, e DELETE)
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())
    next()
})

//EndPoints: Listar a sigla de todos os Estados 
app.get('/estado/sigla/:uf', cors(), async function (request,response, next){
    let siglaEstado = request.params.uf
    let controleDadosEstados = require('./model/manipulando_array_json.js')
    let dadosEstados = controleDadosEstados.getDadosEstado(siglaEstado)

    if(dadosEstados){
        response.json(dadosEstados)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro: "Não foi possível encontrar um item"})
    }
})
//EdPoint: Retorna os dados da capital filtrado pela sigla
app.get('/capital/estado', cors(), async function(request,response,next){
    let siglaEstado = request.query.uf
    let controleDadosCapital = require('./model/manipulando_array_json.js')
    let dadosCapital = controleDadosCapital.getCapitalEstado(siglaEstado)

    if(dadosCapital){
        response.json(dadosCapital)
        response.json({erro: "Não foi possível encontrar um item"})
    }
    console.log(siglaEstado)
})


//Executa a API e faz ela ficar aguardando aquisições
app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições')
})