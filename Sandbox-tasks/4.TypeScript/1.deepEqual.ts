// Задание #1.
// Напишите функцию deepEqual для проверки двух объектов на идентичность. Пример:
// deepEqual({name: 'test'}, {name: 'test'}) // output true
// deepEqual({name: 'test'}, {name: 'test1'}) // output false
// deepEqual({name: 'test', data: {value: 1}}, {name: 'test', data: {value: 2}}) // output false
// deepEqual({name: 'test'}, {name: 'test', age: 10}) // false
// _______________________________________________________________________________



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

// Определяем пользовательский тип, которому задаем структуру объекта вида:
// ключи - это строки, а свойством ключа - может быть любое значение
type AnyObject = Record<string, any>;

// Определяем что функция должна принять две переменные пользовательского типа и вернут булевое значение
function deepEqual(obj1: AnyObject, obj2: AnyObject): boolean {

    // На данном этапе TS уже знает что obj1 и obj2 - это пользовательские типы, проверка пройдет без ошибок
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return obj1 === obj2;
    }

    // Сделал явную типизацию для переменных keys1 и keys2.
    // Хотя это было необязательно так-как TS уже знает что ключи в объектах это строки, тем не менее
    // это сделает код нагляднее и понятнее.
    const keys1: string[] = Object.keys(obj1);
    const keys2: string[] = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

const comparison1: boolean = deepEqual(testObj1, testObj2);
const comparison2: boolean = deepEqual(testObj3, testObj4);
const comparison3: boolean = deepEqual(testObj5, testObj6);
const comparison4: boolean = deepEqual(testObj7, testObj8);

//Вывод в консоль, для удобного вывода объектов в консоль использовал метод JSON.stringify().
console.log(`\nIncoming data: ${JSON.stringify(testObj1)}, ${JSON.stringify(testObj2)}\nComparison result: ${comparison1}\n`);
console.log(`\nIncoming data: ${JSON.stringify(testObj3)}, ${JSON.stringify(testObj4)}\nComparison result: ${comparison2}\n`);
console.log(`\nIncoming data: ${JSON.stringify(testObj5)}, ${JSON.stringify(testObj6)}\nComparison result: ${comparison3}\n`);
console.log(`\nIncoming data: ${JSON.stringify(testObj7)}, ${JSON.stringify(testObj8)}\nComparison result: ${comparison4}\n`);

