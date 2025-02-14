const innerObject = {};
const middleArray = [1,2,3,innerObject ];
const workingObject = {
  a:middleArray 
}

// _______________________________________________________________________
// Задание 1 – Создать объект workingObject всеми возможными способами; 
const workingObject1 = { 
  a: middleArray,
};
const workingObject2 = Object.create({ a: middleArray });
const workingObject3 = Object.assign({}, { a: middleArray });
const workingObject4 = new Object({ a: middleArray });

class WorkingObject {
  constructor(a) {
  this.a = a;
  }
}
const workingObject5 = new WorkingObject(middleArray);

//_____________________________________________________________________
// Задание 2 – Скопировать объект workingObject всеми возможными способами
const copiedWorkingObject1 = {...workingObject }
const copiedWorkingObject2 = JSON.parse(JSON.stringify(workingObject))
const copiedWorkingObject3 = Array.from(workingObject);
const copiedWorkingObject4 = Object.assign({}, workingObject)
const copiedWorkingObject5 = structuredClone(workingObject)
// lodash (методы _.assign, _.clone, _.cloneDeep)
// написать функцию копирования вручную

// _______________________________________________________________________________
// Задание 3 – На последних страницах лекции(в аттаче) есть функция makeCounter. 
// Создать функцию makeCounter всеми описанными и возможными способами; 
const makeCounter1 = () => {
  let count = 0;

  return function () {
    return count++;
  };
};

function makeCounter2() {
  let count = 0;

  return function () {
    return count++;
  };
}

const makeCounter3 = function () {
  let count = 0;

  return function () {
    return count++;
  };
};

const makeCounter4 = function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
};

function MakeCounter(count = 0) {
  this.count = count;

  this.up = function () {
    return this.count++;
  };
}

class MakeCounter {
  constructor(count = 0) {
    this.count = count;
  }

  up() {
    return this.count++;
  }
}

// _______________________________________________________________________________
// Бонус Задание 1 – Написать функцию глубокого сравнения двух обьектов:
const obj1 = {
  here: { is: "on", other: "3" },
  object: 5,
};

const obj2 = {
  here: { is: "on", other: "2" },
  object: 5,
};

const deepEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

//_________________________________________________________________________________________
// Бонус Задание 2 – Развернуть строку в обратном направлении при помощи методов массивов: 

const reverseStr = (str) => { str.split('').reverse().join('') }

//_________________________________________________________________________________________
// Задача на замыкание 1:

function createIncrement() {
  let value = 0

  function increment(){
    value += 1;
    console.log(value)
  }

  const message = `Current value is ${value}`

  function log(){
    console.log(message)
  }

  return [increment, log];
}

const [increment, log] = createIncrement();

increment() // 1
increment() // 2
increment() // 3

log() //"Current value is 0"        // почему не 3?
// При вызове increment() мы увеличиваем значение value. Но message не обновляется, мы не получаем 3 на выходе,
// так как значение message вычисляется один раз во время создании функции, а значит log() 
// использует первоначальное значение message

// Задача на замыкание 2:
let group = getGroup();

group[0](); // 10
group[5](); // 10

function getGroup() {
  let students = [];
  let i = 0;
  while (i < 10) {
    students[i] = function() {
      console.log(i);
    }
    i++
  }

  return students;
}

// Задача на замыкание 3:

var globalVar = 'global';
var outerVar = 'outer';

function outerFunc(outerParam) {
    function innerFunc(innerParam) {
        console.log(globalVar, outerParam, innerParam); // guess,outer,inner
    }
    return innerFunc;
}

const x = outerFunc(outerVar);
outerVar = 'outer-2';
globalVar = 'guess'; 
x('inner'); // guess, outer, inner


// По желанию, можно выполнить как без сдачи, так и в txt/md/js файле: прочитать 
// и описать работу глобальной функции structuredClone(), отдельно остановиться на ограничениях 
//structuredClone() позволяет выполнять глубокое копирование сложных структур данных. Работает синхронно.
//У этого метода есть ограничение — копируемые данные должны быть сериализуемы.
//Примеры несериализуемых данных: примитив undefined, функция, symbol - при вызове JSON.stringify получаем undefined
//Массивы и объекты - сериализуемы. Если у них в качестве ключа или значения будут несериализуемые данные, то
//для массивов: такие значения будут превращены в null;
//для объектов: такие значения будут опущены, а если symbol является ключом объекта, 
//то он будет проигнорирован, даже при использовании функции replacer.
//Работает с Map, Set, Date, ArrayBuffer и многие другие типы.
//Не клонирует функции,прототипы, DOM-элементы

// JSON.parse JSON.stringify - работа, возможности и ограничения. На ограничениях могут делать акцент на срезе.
// JSON.parse используется для преобразования строки JSON в объекты JavaScript. Принимает строку JSON 
// в качестве аргумента и возвращает соответствующий объект JavaScript. Этот метод полезен, 
// когда необходимо обработать данные, полученные от сервера в формате JSON.
// SON.stringify() выполняет обратную операцию — преобразование объектов JavaScript в формат JSON. 
// Он принимает объект JavaScript в качестве аргумента и возвращает соответствующую строку JSON. 
// Этот метод полезен при отправке данных на сервер или сохранении их в локальном хранилище. 
// 
// ОГРАНИЧЕНИЯ JSON.parse():: Для объектов имена свойств JSON должны быть строками с двойными кавычками, 
// а запятые в конце строки запрещены. 
// Для чисел запрещены начальные нули, а за десятичной точкой должна следовать хотя бы одна цифра. 
// Любые нарушения синтаксиса JSON приводят к ошибке SyntaxError. 
// ОГРАНИЧЕНИЯ JSON.stringify(): JSON не умеет работать с  Map, Set, Date, BigInt, RegExp, undefined.
// Чтобы преобразовать такие данные в JSON-строку, необходимо привести их к поддерживаемому типу. 
// Метод не может работать с циклическими зависимостями. Чтобы исключить из сериализации значения 
// с такими зависимостями, можно вместо функции передать вторым параметром массив ключей. 
// В результате метод вернёт строку, содержащую только пары ключ-значение с этими ключами. 


// Дополнительно про замыкание можно почитать здесь:
// https://habr.com/ru/articles/828618/

// https://github.com/azat-io/you-dont-know-js-ru/blob/master/scope%20%26%20closures/README.md

// Контекст (больше захватывает следующую тему, обсуждали, что скину к этой лекции:)

// https://habr.com/ru/companies/ruvds/articles/422089/