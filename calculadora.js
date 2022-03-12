const calcular = (tipo, valor) => {
    if (tipo === 'acao') {
        if (valor === 'c') {
            //Limpar o visor
            document.getElementById('resultado').value = ''
        }
        if (valor === '+' || valor === '-' || valor === '*' || valor === '/' || valor === '.') {
            document.getElementById('resultado').value += valor
        }
        if (valor === '=') {
            let resultado = document.getElementById('resultado')
            resultado.value = eval(resultado.value)
        }
    } else if (tipo === 'valor') {
        let resultado = document.getElementById('resultado')
        resultado.value += valor
    }
}