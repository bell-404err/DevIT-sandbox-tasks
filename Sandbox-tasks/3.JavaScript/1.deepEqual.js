// Задание #1.
// Напишите функцию deepEqual для проверки двух объектов на идентичность. Пример:
// deepEqual({name: 'test'}, {name: 'test'}) // output true
// deepEqual({name: 'test'}, {name: 'test1'}) // output false
// deepEqual({name: 'test', data: {value: 1}}, {name: 'test', data: {value: 2}}) // output false
// deepEqual({name: 'test'}, {name: 'test', age: 10}) // false



//Объявление тестовых данных
const testObj1 = {
    name: 'test'
}

const testObj2 = {
    name: 'test'
}

const testObj3 = {
    name: 'test'
}

const testObj4 = {
    name: 'test1'
}

const testObj5 = {
    name: 'test',
    data: {
        value: 1
    }
}

const testObj6 = {
    name: 'test',
    data: {
        value: 2
    }
}

const testObj7 = {
    name: 'test'
}

const testObj8 = {
    name: 'test', age: 10
}

function deepEqual(obj1, obj2) {
    // Шаг №1.
    // База рекурсии: проверка значений на тип "объект",
    // если значения не являются объектами (в данном случае это должна быть строка), - сравниваем значения.

    // Как работает оператор логического или: если оба значения являются ложными,
    // то-есть являются объектами, переходим на шаг №2

    // В случае если одно из значений является строкой, а второе объектом:
    // оператор "или" вернет первую правду - "тип строка не равен типу объект".
    // При сравнении "obj1 === obj2" завершиться false - объекты не идентичны.
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return obj1 === obj2;
    }

    // Шаг №2.
    //Если значения оказались объектами: получаем все ключи объекта в массиве для дальнейшего сравнения.
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Шаг №3.
    //Проверяем длину массивов полученных ключей, если длина разная: объекты не идентичны, возвращаем "false".
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Шаг №4.
    //Используем метод перебора for...of, метод перебирает значения из массива ключей полученного на шаге №2.
    for (const key of keys1) {
        // Используя рекурсию повторно вызываем данную ф-н, возвращаясь на шаг №1.
        // Используем оператор логического отрицания, так-как в случае успешной проверки на шаге №1,
        // будет возвращено значение "true".
        // В случае если проверка не пройдена, то-есть строки не идентичны, из шага №1 вернется "false".
        if (!deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    // Шаг №5.
    // Если все проверки прошли успешно, - объекты идентичны, возвращаем "true".
    return true;

}

//Получение результатов вычислений с разными данными.
const comparison1 = deepEqual(testObj1, testObj2);
const comparison2 = deepEqual(testObj3, testObj4);
const comparison3 = deepEqual(testObj5, testObj6);
const comparison4 = deepEqual(testObj7, testObj8);

//Вывод в консоль, для удобного вывода объектов в консоль использовал метод JSON.stringify().
console.log(`\nIncoming data: ${JSON.stringify(testObj1)}, ${JSON.stringify(testObj2)}\nComparison result: ${comparison1}\n`);
console.log(`\nIncoming data: ${JSON.stringify(testObj3)}, ${JSON.stringify(testObj4)}\nComparison result: ${comparison2}\n`);
console.log(`\nIncoming data: ${JSON.stringify(testObj5)}, ${JSON.stringify(testObj6)}\nComparison result: ${comparison3}\n`);
console.log(`\nIncoming data: ${JSON.stringify(testObj7)}, ${JSON.stringify(testObj8)}\nComparison result: ${comparison4}\n`);

