// Задание №8.
// Напишите функцию combos,
// которая принимает положительное целое число num и возвращает массив массивов положительных целых чисел,
// где сумма каждого массива равна num. Массивы не должны повторяться.
//
// Пример:
//
// combos(3);
// // Output:
// [
//     [ 3 ],
//     [ 1, 1, 1 ],
//     [ 1, 2 ]
// ]
//
// combos(10);
// // Output:
// [
//     [ 10 ],
//     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
//     [ 1, 1, 1, 1, 1, 1, 1, 1, 2 ],
//     [ 1, 1, 1, 1, 1, 1, 1, 3 ],
//     ...
//     [ 4, 6 ],
//     [ 5, 5 ]
// ]


// Данную задачу можно решить двумя способами: рекурсивно и итеративно
// Лучшим вариантом будет итеративное решение, так-как на больших объемах данных (если переданное число достаточно большое)
// Функция выполниться быстрее и потребует меньших затрат памяти и времени.


// Рекурсивный вариант решения задачи
function combos(a) {
    // Создаю массив, который будет содержать результаты вычислений
    let result = [];
    // Создаю рекурсивную функцию которая будет отвечать за вычисления
    // Функция будет принимать число и массив как аргументы
    function recursion(number, currentCombo) {
        // Проверяем на базовый случай, который приведет к завершению рекурсии
        // если текущее число это "0", значит мы собрали все слагаемые
        if (number === 0) {
            // Заносим текущий подмассив в массив результатов
            result.push([...currentCombo]);
            // Завершаем функцию с помощью оператора return
            return;
        }

        // В случае когда текущее число больше 0, значит мы не до конца разбили число на слагаемые.

        // Создаём переменную start, она будет отвечать за начало текущей итерации.
        // Переменная start нужна для того, чтобы избавиться от повторяющихся комбинаций чисел
        // При первом вызове функции recursion, мы передаем пустой массив, который в результате проверки вернет false.
        // Переменная start будет равна "1".

        // При втором вызове recursion, массив уже будет содержать число, это будет "1",
        // значит мы начнем с последнего (наибольшего) элемента текущего подмассива.
        let start = currentCombo.length > 0 ? currentCombo[currentCombo.length - 1] : 1;
        // Начинаем перебор всех значений для текущего числа
        for (let i = start; i <= number; i++) {
            // Добавляем в текущую последовательность слагаемых i (которая будет увеличиваться после каждого вызова recursion)
            currentCombo.push(i);
            // После чего снова вызываем функцию recursion, однако теперь изменяем изначальные значения
            // "number - i" - текущее число уменьшается на последнее (наибольшее значение) из текущего подмассива
            // currentCombo - текущий подмассив результатов
            recursion(number - i, currentCombo);
            // Удаляем последний элемент текущего подмассива, чтобы продвинуться по итерации
            // (иначе мы будем получать некорректный подмассив, например для числа "2" результат будет [1, 1], а должен быть [1, 2])
            currentCombo.pop();
        }
    }
    // Вызываем рекурсивную функцию, начальные аргументы:
    // a - переданное число
    // [] - массив (подмассив), который будет хранить текущую комбинацию слагаемых
    recursion(a, []);
    // Возвращаем готовый массив результатов
    return result;
}
// Записываем результат выполнения функции combos в отдельную переменную для дальнейшего использования
const result = combos(10);
console.log(result);

