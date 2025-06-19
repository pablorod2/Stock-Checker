# Stock Price Checker

This is the boilerplate for the Stock Price Checker project. Instructions for building your project can be found at https://freecodecamp.org/learn/information-security/information-security-projects/stock-price-checker

Final solution explication on Spanish:

La solución se realizó en un local y fue subido a un repositorio de GitHub para ser validado por el sistema. Para completar se requiere mantener una solución viva y el repositorio en git. Por lo que se debe crear cuenta en:

FreeBootCamp
MongoDB
GitHub

El proyecto contiene una librería prestablecida que permite operar con datos de bolsa, pero se nos pide utilizarla para realizar operaciones de chequeo individuales con grabación de preferencias, un simple me gusta que se graba en una base de datos y muestra cuantos gustazos ha tenido cada acción. Las acciones funcionan por símbolo de bolsa o código. Se puede entrar un código y se consulta una API previamente elaborada que entrega, para ese código, un listado de parámetros relativos a la empresa a modo de XML.

El código permite crear una plantilla personalizada web en un servidor de prueba o de desarrollo donde uno ingrese el código y la programación rescate los datos de la API para mostrarlos en la web. Este proceso requiere de incorporar algunos módulos adicionales al proyecto original como requisitos. Estos son

mongoose para trabajo con la base de datos
node-fetch para el recate de datos o parámetros
nodemon para trabajo con el servidor web

El proyecto requiere de un servidor que configuraremos en un puerto específico, configurado a través del archivo sample.env que podemos utilizar de base, especificaremos: 

PORT=3000
DB="mongodbclusterURL"
#NODE_ENV=test 
#El comentario de la linea anterior la desactivaremos al final para resolver de forma automatizada los requerimientos del bootCamp. Para este proceso se utiliza tests/2_functional-tests.js

La programación de la solución se realiza en la carpeta routes/api.js debemos crear funciones que permitan crear encontrar, obtener y guardar acciones en la base de datos junto al modulo principal el que se encargará de resolver los precios y gustos de cada acción según sea el caso. El nivel de conocimiento de su funcionamiento es bastante alto para lo revisado hasta ahora. Si uno sigue el patrón de el bootCamp y enfrenta este requisito, es poco probable que alguien sea capaz de resolver de forma adecuada la codificación de las funciones, en especial porque son funciones asincrónicas que deben esperar respuesta antes de continuar. Verificar que no sea la misma IP la que de "me gusta" también puede resultar complejo, por ejemplo:

*************************************************
async function createStock(stock, like, ip) {
  const newStock = new StockModel({
    symbol: stock,
    likes: like ? [ip] : [],
  });
  const savedNew = await newStock.save();
  return savedNew;
}
*************************************************

Este ejemplo busca si existe el símbolo en la base de datos, si nunca se ha gustado no existe y crea la entrada de forma automática pero revisa el gusto por ip. Aunque es posible encontrar pistas en el repositorio, el bootcamp no entrega dicha información y se debe buscar por separado.

El sistema de servidor no siempre funciona adecuadamente y es más inestable cuando existen errores de programación. Se intenta correr una sobre otra instancia de forma automática cada vez que se llama "npm dev nodemon server.js" uno puede cerrar la terminal, abrir otra y el sistema sigue funcionando para reiniciar se debe terminar el proceso para lo cual es correcto utilizar "lsof -i:3000" donde 3000 es el puerto donde corre el servidor con eso identificamos si está corriendo y el PID asociado luego se puede correr "kill -9 PID" donde PID es el número de identificación de proceso PID. Esto terminará el servidor y se puede volver a llamar con el comando ya indicado.
