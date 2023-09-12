// Задание №9.
// Напишите функцию add,
// которая бы работала следующим образом add(1)(2)(7)...(n).
// Количество последовательных вызовов не ограничено.
//
// Пример:
//
// Number(add(1)(2)); // == 3
// Number(add(1)(2)(5)); // == 8
// Number(add(1)(2)(-3)(4)); //  == 4
// Number(add(1)(2)(3)(4)(-5)); // == 5
//________________________________________________________________________



// Создаем функцию, которая принимает первое слагаемое
function add(firstNumber: number) {
    // Внутри функции add сразу создаем функцию sum, которая будет принимать второе слагаемое.
    const sum = (secondNumber: number | undefined) => {
        // В условии проверяем, передан ли аргумент для внутренней функции sum
        if (typeof secondNumber === 'undefined') {
            // В случае когда второго аргумента нет вернем переданное число
            return firstNumber;
        } else {
            // Если есть второе слагаемое, вызываем функцию add рекурсивно и передаем ей сумму двух слагаемых
            return add(firstNumber + (secondNumber as number));
        }
    };
    // Переопределяем метод valueOf у функции sum, чтобы она возвращала сумму как примитивное значение
    sum.valueOf = (): number => firstNumber;
    return sum;
}


// Примеры использования
const result1: number = Number(add(1)(2)); // == 3
const result2: number = Number(add(1)(2)(5)) // == 8
const result3: number = Number(add(1)(2)(-3)(4)) // == 4
const result4: number = Number(add(1)(2)(3)(4)(-5)) // == 5

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);