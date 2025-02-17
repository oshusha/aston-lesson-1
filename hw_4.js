// 1) Написать ответ - почему массивы в JS являются "неправильными" и совмещают в себе несколько структур данных? Какие?
// Массивы в JS динамические  (можем менять длину массива). 
// Могут хранить в себе данные разных типов (гетерогенны) и представляют собой 
// частный случай хэш-таблиц.

// Массивы совмещают в себе:
// Стэк
// Очередь
// Двустроннюю очередь
// Упорядоченный список

// 2) Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value (Привязать через bind, call, apply)

function logger() {
    console.log(`I output only external context: ${this.item}`);
}

const obj = { item: "some value" };

const boundLogger = logger.bind(obj);
boundLogger();

logger.call(obj);

logger.apply(obj);

// 3.1 this: 
// При решении задач имеет смысл рассуждать вслух. 
// Прежде всего это касается срезов и собеседований. 
// Это может помочь споткнуться на неправильном решении, не  даёт повиснуть тишине 
// (скрадывает время для собеседующего) и позволяет вступить в диалог с интервьюером - 
// иногда он может помочь развить мысль о решении или повернуть в нужную сторону.

const obj = {
    a: 1,
    e: (function () {
      return () => {
        console.log(this.a);
      };
    })(),
};


obj.e(); // стрелочная функция не имеет своего контекста, получаем глобальный объект window 
// (undefined в строгом режиме). Наша переменная не определена, значит возвращается 
// undefined. Cтрелочная функция не имеет своего контекста, поэтому
// получаем глобальный объект window (undefined в строгом режиме). 
// Наша переменная не определена, значит возвращается undefined
obj.e.call({ a: 2 }); // функция все ещё стрелочная, а переменная все еще не определена, получаем undefined

// 3.2 this:
const obj = {
    child: {
      i: 10,
      b: () => console.log(this.i, this),
      c() {
        console.log(this.i, this);
      },
    }
};

obj.child.b(); // undefined (стрелочная функция, см. пример выше)
obj.child.c(); // 10

// 3.3 this:
function foo() {
  const x = 10;
  return {
    x: 20,
    bar: () => {
      console.log(this.x);
    },
    baz: function () {
      console.log(this.x);
    }
  };
}

const obj1 = foo();
obj1.bar(); // undefined
obj1.baz(); // 20

const obj2 = foo.call({ x: 30 });

let y = obj2.bar; 
let z = obj2.baz; 
 y();   // 30 контекст привязан явно
 z();   // функция обычная, контекст определяется в момент вызова, 
 // но он не определен (слева ничего нет), значит undefined

 obj2.bar();    //  30 стрелочная функция у которой this был зафиксирован во время создания foo(). 
 // Вызывается с this , где х: 30
 obj2.baz();    //  20 обычная функция, где контекст определяется в момент вызова this === obj2, а obj2.х === 20

// 4.1 Массивы:
// - Создайте массив чисел и найдите его сумму разными способами.
const nums = [1, 2, 3]

const sum = nums.reduce((acc, current) => acc + current, 0)

let sumForEeach = 0
nums.forEach(num => sumForEeach += num)

// различными типами циклов
let sumForOf = 0
for (const num of nums) {
  sumForOf += num
}

// - Создайте массив строк и объедините их в одну строку разными способами.
const strings = ['1', '2', '3']

let joinedString = strings.join('')
const joinedStringByReduce = strings.reduce((acc, current) => acc + ' ' + current)
function joinString(strings) {
  let res = ''
  for (const str of strings) {
    res += str
  }

  return res
}

// - Найдите максимальный и минимальный элементы в массиве чисел разными способами.
const nums = [1, 2, 3]

const maxNumber = Math.max(...nums)
const minNumber = Math.min(...nums)

const maxNumber1 = nums.sort((a, b) => b - a)[0]
const minNumber1 = nums.sort((a, b) => b - a)[nums.length - 1]

// 4.2 Stack (стек):
// - Реализуйте стек с использованием массива.
// - Не обязательно. По желанию можно попробовать пообходить дерево через стек.
class Stack {
  constructor() {
    this.stack = []
  }

  push(el) {
    this.stack.push(el)
  }
  
  pop() {
    if (this.isEmpty()) {
      throw new Error('stack is empty')
    }

    return this.stack.pop()
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty')
    }

    return this.stack[this.stack.length - 1]
  }

  isEmpty() {
    return this.stack.length === 0
  }

  size() {
  return this.stack.length
  }

  clear() {
  this.stack = []
  }
}

//4.3 Queue (очередь):
//- Реализуйте очередь с использованием массива.
//- Имитируйте работу очереди на примере ожидания на кассе.
class Queue {
  constructor() {
    this.queue = []
  }

  add(el) {
    this.queue.push(el)
  }

  delete() {
    if (this.queue.length === 0) {
      throw new Error('queue is empty')
    }

    return this.queue.shift()
  }
  
  whoIsLast() {
    if(this.queue.length === 0) {
      throw new Error('queue is empty')
    }

    return this.queue[this.queue.length - 1]
  }

  size() {
    return this.queue.length
  }
}

const queue = new Queue()
queue.add("client1")
queue.add("client2")
console.log(queue.delete())
console.log(queue.delete())
queue.add("client3")
queue.add("client4")
console.log(queue.whoIsFirst())
queue.add("client5")
console.log(queue.delete())

//___________________________________________________________________________________________________
// Бонус задание: Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()
// не успеваю выполнить до дедлайна, но проработаю самостоятельно!


// Дополнительно можно почитать:
// структуры данных:
// https://practicum.yandex.ru/blog/10-osnovnyh-struktur-dannyh/

// this binding:

// https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/ch1.md
// https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/ch2.md