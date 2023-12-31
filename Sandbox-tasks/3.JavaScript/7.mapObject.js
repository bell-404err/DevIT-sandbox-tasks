// Задание №7.
// Напишите функцию, которая берет объект любой вложенности и
// преобразует ее в единую плоскую карту с разными уровнями,
// разделенными косой чертой ( '/').
//
// Пример:
//
// const obj = {
//     a: {
//         b: {
//             c: 12,
//             d: 'Hello World'
//         },
//         e: [1,2,3]
//     }
// };
//
// mapObject(demoData);
// // Outputs: {
// 'a/b/c': 12,
//     'a/b/d': 'Hello World',
//     'a/e': [1,2,3]
// }

// Тестовые данный для выполнения задания
const obj = {
    a: {
        b: {
            c: 12,
            d: 'Hello World'
        },
        e: [1, 2, 3]
    }
};

// Создаю ф-н которая будет преобразовывать объект в плоскую карту
function mapObject(globalData) {
    // Создаю объект, который будет содержать преобразованные данные
    let result = {};

    // Создаю функцию, которая будет совершать рекурсивные вызовы самой себя.
    // Использую отдельную функцию так-как при рекурсии, ф-н вызывает сама себя,
    // если так не делать, тогда объект result будет пересоздаваться при каждом вызове,
    // что в теории может привести к ошибкам
    function recursion(localData, currentPath) {
        // С помощью метода for...in начинаю перебирать все ключи переданного объекта
        for (const key in localData) {
            // На каждой итерации цикла создаю переменную value, которая будет содержать значение текущего ключа
            // Например на первой итерации переменной value будет присвоен объект,
            // присвоенный объект же содержит ключи b и e (b: {}, e: []).
            const value = localData[key];
            // Создаю новый путь, при первой итерации currentPath === '', что является false.
            // Значит переменной currentPath буден присвоен текущий ключ, этот ключ будет записан в строку
            // В случае если это вторая итерация, currentPath уже не будет пустой строкой и вернет true.
            // В результате тернарного оператора в currentPath запишется прошлое значение и новое через "/".
            // На второй итерации путь уже будет выглядеть так: "a/b", таким образом будет собран полный путь.
            const newPath = currentPath ? `${currentPath}/${key}` : key;
            // Чтобы выполнить правильную запись пути к значению, нам нужно проверять значение ключа
            // В случае когда значение текущего ключа это объект и при этом это не массив,
            // мы рекурсивно вызываем функцию, продолжая дополнять строку с путем
            if (typeof value === 'object' && !Array.isArray(value)) {
                // Как новые аргументы для функции recursion будут переданы:
                // value - значение текущего ключа (для первой итерации: b: {} и e: [], для второй c: 12 и d: 'Hello World') и т.д
                // newPath - значение, которое формируется исходя их текущего значения (текущий путь):
                // Если это первая итерация, переданный путь будет выглядеть так: "a",
                // если это вторая итерация, переданный путь будет выглядеть так: "a/b", и т.д пока условие в блоке if будет правдивым
                recursion(value, newPath);
            } else {
                // В случае если мы добрались до самого глубокого значения ключа и оно не является объектом,
                // мы просто присваиваем в результирующий объект (result) заполненный путь (newPath)
                // и значение текущего ключа по этому пути (value)
                result[newPath] = value;
            }
        }
    }
    // Запускаем рекурсивную функцию.
    // Начальными значениями будут переданный объект и пустая строка.
    // В пустой строке мы будем записывать путь к значению
    recursion(globalData, '');
    // Возвращаем полученный объект с результатами выполнения рекурсивной функции
    return result;
}
// Записываем объект из функции mapObject для дальнейшего использования
const result = mapObject(obj);
console.log(result);


