// Подключение всех модулей к программе
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Отслеживание порта
server.listen(80);

// Отслеживание url адреса и отображение нужной HTML страницы
app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});

// Массив со всеми подключениями
connections = [];

// Функция, которая сработает при подключении к странице
// Считается как новый пользователь
io.sockets.on('connection', function(socket) {
	console.log("Успешное соединение");
	// Добавление нового соединения в массив
	connections.push(socket);

	// Функция, которая срабатывает при отключении от сервера
	socket.on('disconnect', function(data) {
		// Удаления пользователя из массива
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
	});

	// Функция получающая сообщение от какого-либо пользователя
	socket.on('send mess', function(data) {
		// Внутри функции мы передаем событие 'add mess',
		// которое будет вызвано у всех пользователей и у них добавиться новое сообщение
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});

});
