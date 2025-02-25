// ЗАДАЧА 1___________________________________
Promise.reject("a") // 'a'
  .catch(p => p + "b") // 'ab' так как 'a' передалось в параметр 'p' 
  .catch(p => p + "c") // выше промис в состоянии fulfilled, поэтому этот кэтч пропускаем
  .then(p => p + "d") // 'abd', так как мы выполняем этот зен потому что состояние fulfilled сохраняется
  .then(p => p + "f") // 'abdf', так как мы выполняем этот зен потому что состояние fulfilled сохраняется
  .catch(p => p + "h") // игнорируем кэтч, так как выше состояние fulfilled
  .finally(p => p + "e") // выполняется в любом случае и просто выполняет функцию не изменяя состояние промисаа
  .then(p => console.log(p)) // 'abdf' 

// ЗАДАЧА 2___________________________________
console.log("1"); // синхронный код 1 шаг

setTimeout(() => {
    console.log("2")
}, 1) // маркрозадача, таймер 1, шаг 6

const promise = new Promise(resolve => {
    console.log("3") // синхронный код шаг 2
    resolve()
});

promise.then(() => console.log("4")) // микрозадача шаг 4

setTimeout(() => console.log("5")) // макрозадача, таймер 0, шаг 5

console.log("6") //  синхронный код шаг 3

// 1 3 6 4 5 2

// ЗАДАЧА 3___________________________________
setTimeout(() => console.log("a")) // макротаска и последний шаг

Promise.resolve()
    .then((first) => {
        console.log("first", first);
        return "b"
    })
    .then(Promise.resolve()
        .then((second) => {
            console.log("second", second);
            return "c"
        })) // это аргумент!!!
    .then((third) => console.log("third", third)) // поэтому b оказываетс здесь

console.log("d") // синхронный код

// d
// first undefined
// second undefined
// third b
// a

// ЗАДАЧА 4___________________________________
let a = 5
console.log(a) // 5 (1 шаг, синхронный код выполняется сразу)

setTimeout(() => {
    console.log(a)
    a = 10
}, 0) // макротаска улетает в ожидание (будет шагом 4 и выведет 15, так как а уже стало 15 после шага 3, а становится 10, но упражнение закончено)

Promise.resolve().then(() => {
    console.log(a) // микро а === 5
    a = 15 // перезаписали
}) // микротаска 5 (шаг 3, а становится 15)

console.log(a) // синхронный код 5 (шаг 2, значение взято из своей глобальной области видимости)

// 5 5 5 15

// БОНУС ЗАДАЧА 5 FETCH_____________________________
// Необходимо реализовать функцию fetchUrl. Принимает url, запрашивает данные, если всё ок,
// возвращает промис с данными, если нет, то пытается снова и выкидывает промис с ошибкой только
// после 5 попыток.

const url = 'https://google/com&#39'

async function fetchUrl(url) {
  let count = 0;

  while (count < 5) {
    try {
      let res = await fetch(url)

      if (res.ok) {
        let resp = await res.json()

        return resp;
      }

    } catch (e) {
      count++;

      if (count === 5) {
        throw new Error('выполнено более 5 попыток')
      }
    }
  }
}

fetchUrl(url)
