1) Подробно прочитать про метод запроса OPTIONS - и кратко его описать - когда вызывается, 
где используется, что передает и принимает. 

Метод OPTIONS используется для получения параметров HTTP соединения и другой служебной информации. 
OPTIONS дает возможность запросить параметры для конкретного ресурса, указанного в URI.  
Особенность HTTP метода OPTIONS: он не производит никаких действий с самим ресурсом 
(если браузер будет использовать метод OPTIONS, то он даже не станет загружать страницу).

Сервер отвечает на запрос с методом OPTIONS только опциями соединения, 
например он посылает поля заголовков Allow, но не пошлет Content-Type, 
ответы сервера на запросы с методом OPTIONS не кэшируются. 
Если в качестве URI указана звездочка «*», то параметры соединения передаются для сервера в целом, 
а не для какого-то конкретного URL. Этот метод не самый безопасный для HTTP сервера, поэтому зачастую клиенты 
его не могут применять из-за настроек безопасности.

OPTIONS /index.html HTTP/1.1
OPTIONS * HTTP/1.1

Для того, чтобы узнать какие методы запросов поддерживаются сервером, 
можно воспользоваться curl:

curl -X OPTIONS http://example.org -i

HTTP/1.1 200 OK
Allow: OPTIONS, GET, HEAD, POST
Cache-Control: max-age=604800
Date: Thu, 13 Oct 2016 11:45:00 GMT
Expires: Thu, 20 Oct 2016 11:45:00 GMT
Server: EOS (lax004/2813)
x-ec-custom-error: 1
Content-Length: 0

По технологии CORS, с помощью метода OPTIONS направляется предварительный запрос, 
поэтому сервер может ответить приемлемо ли отправлять запросы этим методом. 
Access-Control-Request-Method заголовок уведомляет сервер в составе 
предварительного запроса о том что, запрос OPTIONS будет отправляться 
на сервер вместе с POST запросом. Access-Control-Request-Headers заголовок 
уведомляет сервер о том, что при отправке фактического запроса, он будет отправлен 
с помощью пользовательских заголовков X-PINGOTHER и Content-Type. В этом случае 
сервер имеет возможность определять возможно ли принять запрос с такими параметрами.

OPTIONS /resources/post-here/ HTTP/1.1
Host: bar.other
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type

Ответ сервера содержит параметр Access-Control-Allow-Methods и сообщает, что POST, GET, и OPTIONS методы являются приемлемыми для данного ресурса. Этот заголовок похож на заголовок Allow , но используется строго в контексте CORS.

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain  (ред.)

2) Прочитать ключевые особенности "HTTP" Версии 3.0
HTTP/3 предоставляет множество преимуществ по сравнению с HTTP/2 для онлайн-приложений, особенно с точки зрения производительности, безопасности и совместимости.
- улучшает механизм контроля перегрузки по сравнению с HTTP/2.
- требует повторных рукопожатий TCP, что позволяет удерживать соединение и сокращать время соединения на 80–90%.
- методы восстановления после потерь и контроля перегрузки в QUIC делают HTTP/3 более устойчивым к потере пакетов и сбоям в сети.
- более совместимый с локальной сетевой инфраструктурой и устройствами, т.к. использует UDP в качестве порта 443.В результате браузеры, включая Chrome, Firefox и Safari, теперь используют HTTP/3.

3) Прочитать про объект "AbortController" и кейсы применения.
AbortController — это глобальный класс в JavaScript, который можно использовать для прерывания асинхронных операций,
таких как Fetch запросы, Promise, fs, setTimeout и setInterval. С его помощью можно прерывать выполнение 
асинхронных задач и предотвращать нежелательные побочные эффекты от выполнения задач, которые уже неактуальны. 
AbortController предоставляет надежный и стандартизированный механизм для управления асинхронными задачами. 
Он позволяет разработчикам контролировать выполнение асинхронных операций, предотвращать выполнение ненужных 
запросов и избегать утечек памяти.

4) Прочитать про "temporal dead zone"
Temporal dead zone (TDZ) — это период во время выполнения кода в JavaScript, когда переменные, 
объявленные с let и const, недоступны. Он существует между началом блока, где объявлена переменная, 
и моментом её инициализации значением. 

Попытка обратиться к переменной внутри TDZ приводит к ReferenceError. 

Цель TDZ — гарантировать, что переменные правильно инициализированы перед использованием. 
Это помогает предотвратить ошибки, которые могут возникнуть при обращении к переменным 
в неопределённом или неинициализированном состоянии. 

TDZ применяется только к объявлениям let и const. У переменных, объявленных с var, нет TDZ, 
они implicitly инициализируются в неопределённое значение.

5) Написать по примеру создания примитивных значений 
(string, number, boolean, null, undefined, symbol, bigInt) 
(если знаете несколько способов - использовать все) 

STRING
const string1 = "Строка";
const string2 = 'Строка';
const string3 = `Строка`;
const string4 = new String("Строка");

NUMBER
let num = new Number(val);  
let num = 100; 
let num = Number.MAX_VALUE;
let num = Number.MIN_VALUE;
let num = Number.NAN;
let num = Number.NEGATIVE_INFINITY;
let num = Number.POSITIVE_INFINITY;

BOOLEAN
FALSE
const bNoParam = new Boolean();
const bZero = new Boolean(0);
const bNull = new Boolean(null);
const bEmptyString = new Boolean("");
const bfalse = new Boolean(false);

TRUE
const btrue = new Boolean(true);
const btrueString = new Boolean("true");
const bfalseString = new Boolean("false");
const bSuLin = new Boolean("Su Lin");
const bArrayProto = new Boolean([]);
const bObjProto = new Boolean({});

NULL
let x = null;

UNDEFINED
let x = undefined;

SYMBOL
const sym = Symbol();

BIGINT
const bigint = 42n;
const bigint = BigInt("42");
const bigintFromNumber = BigInt(42); 

// 6) Решить: 
console.log( "B" + "a" + (1 - "hello")); // 'BaNaN'
console.log((true && 3) + "d"); // '3d'
console.log(Boolean(true && 3) + "d"); // 'trued'
console.log(NaN + 1); // NaN
console.log(NaN + 'o'); // 'NaNo'
console.log(undefined + 1); // NaN
console.log(undefined - 1); // NaN
console.log(null + 1); // 1
console.log(null / 5); // 0
console.log(5 / undefined); //  NaN
console.log(-5 / null); // -Infinity
console.log(null == 0); // false
console.log(null == ''); // false
console.log(null > 0); // false
console.log(null >= 0); // true
console.log(null == ''); // false
console.log('foo' + + 'bar'); // 'fooNaN'
console.log('11' + '1' - 1); // 110
console.log(typeof Object); // 'function'
console.log(typeof Math); // 'object'
console.log(new String('foo')=='foo'); // true
console.log(new String('foo')==='foo'); // false

Доп. материалы:
CORS :
https://developer.mozilla.org/ru/docs/Web/HTTP/CORS
REST API :
https://cloud.yandex.ru/docs/glossary/rest-api
https://skillbox.ru/media/code/rest-api-chto-eto-takoe-i-kak-rabotaet/

Преобразование типов :https://habr.com/ru/companies/ruvds/articles/347866/

По преобразованию и неочевидному поведению переменных можно попроходить задания в "А ты знаешь JavaScript?":
https://play.google.com/store/apps/details?id=com.doyouknowjs