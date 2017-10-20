/*Apenas de teste pra ver se roda o backend*/

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());

var contatos = [
{id: 1, nome: "Bruno da SILVA", telefone: "9999-2222", data: new Date(), operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}},
{id: 2, nome: "Sandra de andrade", telefone: "9999-3333", data: new Date(), operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}},
{id: 3, nome: "Mariana rosa", telefone: "9999-9999", data: new Date(), operadora: {nome: "Tim", codigo: 41, categoria: "Celular"}}
];
var operadoras = [
{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
{nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
{nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1},
{nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2}
];

app.listen(process.env.PORT || 3412);

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/contatos', function(req, res) {
	res.json(contatos);
});

//Selecionando contato pelo ID
contatos.forEach(function(item){	
	var string = '/contatos/' + item.id;

	app.get(string, function(req, res) {
		res.json(item);
	});
});

app.post('/contatos', function(req, res) {
	contatos.push(req.body);
	res.json(true);
});

app.get('/operadoras', function(req, res) {
	res.json(operadoras);
});

/*Apenas de teste pra ver se roda o backend*/

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var contentTypes = {
	'html' : 'text/html',
	'css'  : 'application/x-pointplus',
	'js'   : 'text/javascript',
	'ico'  : 'image/x-icon'
};

http.createServer(function (pedido, resposta) {


	var caminho = url.parse(pedido.url).pathname;

	if (caminho==='/') {
		var ficheiro = path.join(__dirname, 'public', caminho, 'index.html');
	} else {
		var ficheiro = path.join(__dirname, 'public', caminho);
	};

	fs.readFile(ficheiro, function (erro, dados) {

		var extensao = path.extname(ficheiro).slice(1);
		resposta.setHeader('Content-Type', contentTypes);

		if (erro) {
			resposta.writeHead(404);
			resposta.end();
		} else {
			resposta.end(dados);
		}
	});

}).listen(8000, 'localhost', function () {
	console.log('--- O servidor arrancou –--');
});
