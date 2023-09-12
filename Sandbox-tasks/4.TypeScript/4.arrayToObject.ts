// Задание №4.
// Напишите метод arrayToObject, который превращает массив в объект (использовать рекурсию).
// Пример:
//
// var arr = [['name', 'developer'], ['age', 5], ['skills', [['html',4], ['css', 5], ['js',5]]]];
//
// arrayToObject(arr)
// // Outputs: {
// name: 'developer',
//     age: 5,
//     skills: {
//     html: 4,
//     css: 5,
//     js: 5
// }
// _______________________________________________________________________________



// Исходный массив с данными
// Явно указываем что тип элементов для данного массива либо строка, либо кортеж который будет содержать строку и любой другой тип
const arr: (string | [string, any])[] = [['name', 'developer'], ['age', 5], ['skills', [['html', 4], ['css', 5], ['js', 5]]]];

// Функция, которая будет рекурсивно проходиться по массиву и записывает его значения в объект.
// Функция принимает массив с типом определенным ранее, а возвращает объект, где ключи - должны иметь тип "строка" и любое значение
function arrayToObject(arr: (string | [string, any])[]): Record<string, any> {
    // Создаю пустой объект для записи результатов.
    const obj: Record<string, any> = {};

    // При рекурсивном подходе ф-н будет вызывать сама себя, она будет создавать переменную obj каждый раз заново.
    // Чтобы избежать этого, внутри функции arrayToObject я создаю новую ф-н recursive которой передаю нужные аргументы
    function recursive(arr: (string | [string, any])[], obj: Record<string, any>): Record<string, any> {

        // Перебираем массив. Можно не указывать тип для item. TS автоматически присвоит либо строку, либо кортеж
        for (const item of arr) {
            // Определяемся с базовым случаем: в случае если второй элемент массива - это не массив, а строка
            // то мы записываем нулевой элемент данного подмассива как ключ, а первый элемент подмассива как значение
            if (!Array.isArray(item[1])) {
                const key: string = item[0];
                const value: any = item[1];
                obj[key] = value;
            } else {
                // В случае если первый элемент этого подмассива - это массив, мы записываем 0 элемент как ключ, а его значение
                // - пустой объект.
                // После этого мы снова вызываем ф-н recursive и передаем item[1] как массив для перебора,
                // а obj[item[0]], - как объект
                const key: string = item[0];
                const nestedArray: [string, any][] = item[1];
                obj[key] = {};

                recursive(nestedArray, obj[key]);
            }
        }
        // Возвращаем объект с записанными в него значениями
        return obj;
    }

    // Получаем заполненный объект из функции recursive, и возвращаем результат вычислений
    return recursive(arr, obj);
}
// Записываем готовый объект в новую переменную, которую мы можем использовать
const result: Record<string, any> = arrayToObject(arr);
console.log(result);