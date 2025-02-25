
// 1. Написать собственную реализацию методов массивов: some, reduce, map

Array.prototype.mySome = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return true;
  }
  return false;
};

Array.prototype.myReduce = function(callback, initialValue) {
  let acc = initialValue || this[0];

  for (let i = 0; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};

Array.prototype.myMap = function(callback) {
  let res = []

  for (let i = 0; i < this.length; i++) {
    res.push(callback(this[i], i, this))
  }

  return res
};


// 2.
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1); // уходит в цикл макрозадач, а цикл работает пока var не станет i
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1); // здесь блочная область видимости у i, поэтому результат цикла
  // запомнится за счет замыкания
}
// 3 3 3 0 1 2

//3. 
Promise.resolve(1)
    .then((val) => {
        console.log(val); // 1
        return val + 1;
    })
    .then((val) => {
        console.log(val); // 2
    })
    .then((val) => {
        console.log(val); // undefined так как отсутствует return выше 
        return Promise.resolve(3).then((val) => {
            console.log(val); // 3 результат резолв 
        });
    })
    .then((val) => {
        console.log(val); // undefined так как отсутствует return выше 
        return Promise.reject(4);
    })
    .catch((val) => {
        console.log(val); //4 как результат промиса reject
    })
    .finally((val) => {
        console.log(val); // undefined (проваливаемся)
        return 10;
    })
    .then((val) => {
        console.log(val); // undefined 
    });
//что в консоли и в каком порядке? 1 2 undefined 3 undefined 4 undefined undefined 

//4. 
function F() {
  // Ниже происходит создание нового объекта с помощью new F(), и присвоение ему this.
  // Тело
  // Возврат this
}

const x = {}

F.prototype =  x;//что тут происходит? зачем? Здесь идет запись свойства х в виде объекта в прототайп объекта функции

const z = new F();

console.log(z.__proto__ === x) // true

// какой ответ? Почему? Потому что свойство __proto__ указывает на F.prototype, 
// а в F.prototype лежит ссылка на х

//5.
const user = {
  name: 'Bob',
  funcFunc() {
    return function() {
      console.log(this);
    }
  },
  funcArrow() {
    return () => {
      console.log(this);
    }
  },
  arrowFunc: () => {
    return function() {
      console.log(this);
    }
  },
  arrowArrow: () => {
    return () => {
      console.log(this);
    }
  },
};

user.funcFunc()(); // user при первом вызове, window or undefined в строгом режиме далее
user.funcArrow()(); // стрелочная функция не имеет своего зис запоминает его в момент создания 
// значит отображает сам объект {name: 'Bob', funcFunc: ƒ, funcArrow: ƒ, arrowFunc: ƒ, arrowArrow: ƒ}
user.arrowFunc()(); // внешняя стрелочная функция не имеет своего зис, значит возвращает window,
//  а внутренняя отображает тот же контекст window or undefined в строгом режиме
user.arrowArrow()(); // стрелочные функции не имеют своих зис, значит возвращает window,
//  а внутренняя отображает тот же контекст window or undefined в строгом режиме

// 6. 
var a = 1;
var b = 2;

(function() {
    var b = 3;
    a += b;
})();

console.log(a);  // 4
console.log(b);  // 2
// что в консоли? почему так? Потому что в результате выполнения функции 
// а становится 4 в результате сложения с переопределенной внутри функции b,
// но последний консоль отображает 2, так как берет значение из глобальной области видимости