// Задание №6.
// Есть функция primitiveMultiply, которая умножает числа,
// но случайным образом может выбрасывать исключения
// типа: NotificationException, ErrorException.
// Задача написать функцию обертку которая будет повторять вычисление
// при исключении NotificationException, но прекращать работу при исключениях ErrorException
//
// Пример:
// function NotificationException() {}
// function ErrorException() {}
// function primitiveMultiply(a, b) {
//     const rand = Math.random();
//     if (rand < 0.5) {
//         return a * b;
//     } else if(rand > 0.85) {
//         throw new ErrorException()
//     } else {
//         throw new NotificationException()
//     }
// }
//
// function reliableMultiply(a, b) {
//     // Ваш код
// }
//
// console.log(reliableMultiply(8, 8));
//________________________________________________________________________

// Создание объектов ошибок
class NotificationException extends Error {}
class ErrorException extends Error {}

// Функция заданная по условию (переписанная на TS)
function primitiveMultiply(a: number, b: number): number {
    const rand = Math.random();
    if (rand < 0.5) {
        return a * b;
    } else if (rand > 0.85) {
        throw new ErrorException()
    } else {
        throw new NotificationException();
    }
}


// Создание функции обертки
// Функция принимает 2 числа и возвращает либо число, либо null (в случае ошибки ErrorException)
function reliableMultiply(a: number, b: number): number | null {

    //Будем использовать конструкцию try...catch
    try {
        // Пытаемся выполнить заданную по условию функцию
        return primitiveMultiply(a, b);
    } catch (error) {
        // Если функция возвращает ошибку, проверяем принадлежит ли объект ошибки к нужному классу
        if (error instanceof NotificationException) {
            // Согласно условию при ошибке "NotificationException" перезапускаем функцию
            // (важно перезапускать функцию обертку,
            // а не функцию с вычислениями, так-как нам нужно заново использовать блок try)
            reliableMultiply(a, b);
        } else if (error instanceof ErrorException) {
            // В случае когда получаем ошибку от объекта "ErrorException", завершаем выполнение функции
            // и возвращаем null
            return null;
        } else {
            // В случае если произойдет непредвиденная ошибка, вернем объект ошибки. Функция завершит свое выполнение
            throw error;
        }
        // Добавляем оператор return, так-как функция должна завершиться либо числом, либо null'ом
        return null
    }
}
const result: (number | null) = reliableMultiply(8, 8)
console.log(result);


