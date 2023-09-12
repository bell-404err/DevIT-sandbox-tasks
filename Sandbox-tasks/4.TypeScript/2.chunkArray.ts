// import { Generator } from "tslib";

// Задание #2.
// Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны.
// Пример:
// const iterator = chunkArray([1,2,3,4,5,6,7,8], 3);
// iterator.next() // { value: [1,2,3], done: false }
// iterator.next() // { value: [4,5,6], done: false }
// iterator.next() // { value: [7,8], done: false }
// iterator.next() // { value: undefined, done: true }
// _______________________________________________________________________________



// Объявляем функцию генератор chunkArray, которая принимает массив и размер чанка.
// Функция возвращает тип - генератор
function* chunkArray(arr: any[], chunk: number) {
    // В случае если мы используем TS нам уже не нужна проверка typeof chunk !== 'number',
    // функция и так ожидает число и в случае, если придет другой тип для аргумента - ф-н завершится ошибкой
    // if (typeof chunk !== 'number') {
    //     throw new SyntaxError(`Invalid chunk: ${JSON.stringify(chunk)}. Use only a positive number greater than or equal to zero!`);
    // }

    // Такая проверка нам не нужна по той же причине что и проверка переменной chunk на тип "number"
    // if (!Array.isArray(arr)) {
    //     throw new SyntaxError(`Invalid array: ${JSON.stringify(arr)}. The passed value is not an array!`);
    // }

    // Проверку на размер чанка оставлю
    if (chunk === 0) {
        throw new RangeError(`The chunk size is zero. Passed array: ${JSON.stringify(arr)}`);
    }

    // Итерируем по массиву, разбивая его на чанки заданного размера.
    for (let i: number = 0; i < arr.length; i += chunk) {
        // Вычисляем текущий размер чанка (может быть меньше заданного, если это последний чанк).
        const currentChunkSize: number = Math.min(chunk, arr.length - i);

        // Генерируем чанк (подмассив) и передаем его в генератор.
        yield arr.slice(i, currentChunkSize + i);
    }
}

// Создаем итератор для генерации чанков из массива [1, 2, 3, 4, 5, 6, 7, 8] с размером чанка 3.
// Итератор будет иметь тип Generator
const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);

// Выводим результаты выполнения генератора.
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


