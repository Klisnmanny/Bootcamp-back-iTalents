
// função principal onde tudo está acontecendo, será chamada depois do carregamento da DOM, uma boa pratica tbm é coloca o carregamento do script antes do fechamento da Body, no html.
document.addEventListener('DOMContentLoaded', function() {
    
    //constantes para o button e para div onde será colocado o resultado
    const button = document.querySelector('button')
    const resultadoDiv = document.getElementById('resultado')

    //funcao verificar se o valor é um número
    function isNumeric(value) {
        return /^\d+(\.\d+)?$/.test(value)
    }
    
    //funcao para o evento click do button
    button.addEventListener('click', function() {
        
        // pega os valores dos campos de entrada, substituindo vírgulas por pontos decimais
        let valorAltura = document.getElementById('altura').value.replace(',', '.')
        let valorPeso = document.getElementById('peso').value.replace(',', '.')
        let unidadeAltura = document.getElementById('altura-unidade').value

        //Caso nao seja valor numerico, retorna msg para colocar valores validos
        if (!isNumeric(valorAltura) || !isNumeric(valorPeso)) {
            resultadoDiv.innerHTML = 'Por favor, insira valores válidos para altura e peso.';
            return;
        }

        //transforma os valores em float para realizar os calculos
        let altura = parseFloat(valorAltura)
        let peso = parseFloat(valorPeso)

        //trasnforma valores em centimetros em metros caso o usuario escolha valores em centimetros
        if (unidadeAltura === 'centimetros') {
            altura = altura / 100;
        }
        
        //Como nao existe peso e altura negativo ou zero, caso usuario coloque retorna msg para colocar valor valido
        if (altura <= 0 || peso <= 0) {
            resultadoDiv.innerHTML = 'Por favor, insira valores válidos para altura e peso.'
            return;
        }

        //Como tambem não existe peso maior que altura em metros, caso usuario coloque aparecerá msg para corrigir
        if (peso <= altura) {
            resultadoDiv.innerHTML = 'O peso deve ser maior que a altura.'
            return;
        }

        //Realiza o calculo do IMC, re trona com 2 casas deciamais.
        let imc = (peso / (altura * altura)).toFixed(2)


        //inciei uma variavel em branco para colocar o texto do resultado
        let classificacao = '';

        //Verifica em que quadro se encaixa de acordo com a tabela passada na atividade
        if (imc < 18.5) {
            classificacao = 'Abaixo do peso'
        } else if (imc >= 18.5 && imc <= 24.9) {
            classificacao = 'Peso normal'
        } else if (imc >= 25 && imc <= 29.9) {
            classificacao = 'Sobrepeso'
        } else{
            classificacao = 'Obesidade'
        }

        //Em uma div mostra é colocado o resultado, mostrando Altura, peso e o resultado, com o quadro.
        resultadoDiv.innerHTML = `Altura: ${altura} <br><br> Peso: ${peso} kg <br><br> Seu IMC é ${imc} (${classificacao}).`
        
        //Depois de inseridos os valores os inputs de entradas são limpos para uma proxima verificação
        document.getElementById('altura').value = ''
        document.getElementById('peso').value = ''
   
    });




    // Função para gerar valores aleatórios para testes
    function gerarValoresAleatorios() {
        const altura = (Math.random() * (2.20 - 1.20) + 1.20).toFixed(2) // Altura entre 1.20 e 2.20 metros
        const peso = (Math.random() * (150 - 35) + 35).toFixed(2) // Peso entre 35 e 150 kg
        return { peso: parseFloat(peso), altura: parseFloat(altura) } // trasnforma os valores em floats(numeros com casas decimais)
    }

    // Fiz uma função com for para passar todos os numeros aleatorios, realizar os calculo e verificar o resultados, e imprimir no console
    function testarCalculoIMC() {

        //for com 30 testes 
        for (let i = 0; i < 30; i++) {

            //inicia a função para gerar os numeros aleatorios, e pega o peso e altura
            const { peso, altura } = gerarValoresAleatorios(); 
            // realiza o calculo
            const imc = (peso / (altura * altura)).toFixed(2); 

            let classificacao = '';
            if (imc < 18.5) {
                classificacao = 'Abaixo do peso';
            } else if (imc >= 18.5 && imc <= 24.9) {
                classificacao = 'Peso normal';
            } else if (imc >= 25 && imc <= 29.9) {
                classificacao = 'Sobrepeso';
            } else {
                classificacao = 'Obesidade';
            }

            //Coloca no console os valores e resultados, começando do teste 1 ao 30
            console.log(`Teste ${i + 1}: Peso ${peso} kg, Altura ${altura} m, IMC ${imc} (${classificacao})`);
        }
    }

    // Inicia sozinho os testes de exemplos 
    testarCalculoIMC();


});