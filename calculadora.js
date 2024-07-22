function fetchCalculate(url, value1, value2) {
    fetch(`https://calculadora-fxpc.onrender.com${url.replace("/param1/param2", "")}/${value1}/${value2}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        response.json().then(data => {
            const result = data.result;
            console.log(data)
            document.getElementById('resultado').value = result
        });
    }).catch(error => {
        console.log(error)
    });
}

const fetchOperations = (operation, value1, value2) => {
    fetch("https://calculadora-fxpc.onrender.com/operations").then(response => {
        response.json().then(data => {
            console.log(data)
            const operations = data.operations;
            fetchCalculate(operations[operation].path, value1, value2)
        });
    });
}

let operator;
const calcular = (tipo, valor) => {
    const operators = {
        "+": 0,
        "-": 1,
        "*": 2,
        "/": 3
    };

    if (tipo === 'acao') {
        if (valor === 'c') {
            // Limpar o visor
            document.getElementById('resultado').value = '';
            operator = undefined;
        } else if (operators.hasOwnProperty(valor)) {
            if (!operator) {
                document.getElementById('resultado').value += valor;
                operator = operators[valor];
            }
        } else if (valor === '=') {
            let resultado = document.getElementById('resultado');
            const expression = resultado.value;
            const regex = /(\d+)([+\-*\/])(\d+)/;
            const match = expression.match(regex);
            if (match) {
                const value1 = match[1];
                const value2 = match[3];
                fetchOperations(operator, value1, value2);
                operator = undefined;
            }
        }
    } else if (tipo === 'valor') {
        let resultado = document.getElementById('resultado');
        resultado.value += valor;
    }
}
