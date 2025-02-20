// 1) Подобное бывает на срезе:
// Вы — руководитель команды, которая разрабатывает игру, хомяковую ферму.
// Один из программистов получил задание создать класс «хомяк» (англ - "Hamster").
// Объекты-хомяки должны иметь массив food для хранения еды и метод found, 
// который добавляет к нему еду.
// Ниже — его решение. При создании двух хомяков, если поел один — почему-то сытым 
// становится и второй тоже.
// В чём дело? Как поправить?

function Hamster() {  this.food = [] }
// ПРОБЛЕМА ТУТ. Мы создаем стор в прототипе.Если мы создадим стор в конструкторе, то у каждого хомяка будет свой живот. 
// //Hamster.prototype.food = [ ]; // пустой "живот" 

Hamster.prototype.found = function(something) {
  this.food.push(something);
};

// Создаём двух хомяков и кормим первого
speedy = new Hamster();
lazy = new Hamster();

speedy.found("яблоко");
speedy.found("орех");

console.log(speedy.food.length); // 2
console.log(lazy.food.length);   // 2 (!??) // должно быть 0

// 2) Решить несколькими способами. В чем ошибка? как исправить? Можно делать что угодно.
// В КЛАССЕ RABBIT НЕ ХВАТАЛО SUPER.
// 1.
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Rabbit extends Animal {
  constructor(name) {
    //// this.name = name;
    super(name); // Вызов конструктора родительского класса для его наследования
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("Белый кролик"); // Error: this is not defined
alert(rabbit.name);

// 2.
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Rabbit extends Animal {
  constructor(name) {
    super();
    this.name = name;
    this.created = Date.now();
  }
}

// 3. Можно "захардкодить" Object.setPrototypeOf(this, animal)
// 4. Или совсем отказаться от наследования и создать не привязанный ни к чему класс Rabbit. Однако это как будто противоречит заданию.
// 5. Как алтернатива пункту 3. Animal.call(this, name)

// 3)
class A {
  constructor() {
  }

  arrFunc = () => {
    console.log('wtf', this === i)
  }
}

  var i = new A();
  i.arrFunc(); // true потому что this привязывается к объекту на котором вызван, т.к. своего контекста стрелочная функция не имеет.
  // здесь он привязывается к i. Кроме этого var всплывает)

  console.log(i.hasOwnProperty('arrFunc')); // true
// arrFunc создана в объекте i и является его собстенным свойством

// БОНУС:
// 1) Создать приватное поле в функции-конструкторе, создать геттер и сеттер для него.

// 2) Написать функцию, которая вернет массив с первой парой чисел, сумма которых равна total:

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
total = 13;

function searchTotalSum(arr, total) {
  for (let i = 0; i <= arr.length; i += 1) {
    for (let j = 1; j <= arr.length; j += 1) {
      if (arr[i] + arr[j] === total) {
        return [arr[i], arr[j]];
      }
    }
  }
}

// solid:

// https://habr.com/ru/companies/productivity_inside/articles/505430/

// Big O:

// https://youtu.be/Fu4BzQNN0Qs?si=atSOojEA24F8dikG
// ООП:

// https://habr.com/ru/companies/ruvds/articles/665290/

// Если сложно с пониманием прототипов, можно посмотреть это:

// https://www.youtube.com/watch?v=b55hiUlhAzI&t=1761s&ab_channel=IT-KAMASUTRA
// https://youtu.be/SzaXTW2qcJE?si=A2MnZRx9175Rtinz