// Задание #2.
// Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны.
// Пример:
// const iterator = chunkArray([1,2,3,4,5,6,7,8], 3);
// iterator.next() // { value: [1,2,3], done: false }
// iterator.next() // { value: [4,5,6], done: false }
// iterator.next() // { value: [7,8], done: false }
// iterator.next() // { value: undefined, done: true }

// Создание функции генератора.
// Функция принимает два аргумента:
// массив с данными arr, а так же значение chunk (отвечает за количество элементов в одном подмассиве)
function* chunkArray(arr, chunk) {

    // Создаю блок проверок для переменных arr и chunk,
    // проверяем на соответствие необходимому типу аргумента (array и number соответственно).
    // В случае возникновения ошибок, создается объект ошибки, для удобства.
    if (typeof chunk !== 'number') {
        throw new SyntaxError(`Invalid chunk: ${JSON.stringify(chunk)}}. Use only a positive number greater than or equal to zero!`);
    }

    if (!Array.isArray(arr)) {
        throw new SyntaxError(`Invalid array: ${JSON.stringify(arr)}. The passed value is not an array!`);
    }
    // В случае если переданное для chunk значение равно 0, так же возвращаю ошибку
    if (chunk === 0) {
        throw new RangeError(`The chunk size is zero. Passed array: ${JSON.stringify(arr)}`);
    }

    // Использую цикл для перебора всех значений массива.
    // Количество итераций цикла равно длине массива.
    for (let i = 0; i < arr.length; i += chunk) {
        // Вычислим размер подмассива и запишем его в переменную currentChunkSize.
        // Метод Math.min(chunk, arr.length - i) определит наименьшее число и присвоит его для переменной currentChunkSize.
        // Таким образом созданный подмассив не превысит длину chunk, и не создаст массив с пустыми значениями,
        // в случае если элементов будет меньше трёх.
        const currentChunkSize = Math.min(chunk, arr.length - i);

        // С помощью метода slice возвращаем подмассив, который определен от i (текущее положение)
        // до currentChunkSize + i (текущее положение + необходимый шаг - это currentChunkSize).
        // Возвращаем значение из ф-н при помощи yield
        // После каждой итерации цикла i сдвинется на длину chunk (i += chunk, в условии цикла).
        yield arr.slice(i, currentChunkSize + i);
    }


}

// Создаем итератор, который будет возвращать части массива с помощью ф-н chunkArray
const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());




