document.getElementById('processButton').addEventListener('click', processFiles);

function processFiles() {
    const input = document.getElementById('fileInput');
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!input.files.length) {
        alert('Por favor, selecione ao menos um arquivo.');
        return;
    }

    const filePromises = [];
    for (let i = 0; i < input.files.length; i++) {
        filePromises.push(readFileContent(input.files[i]));
    }

    Promise.all(filePromises).then(contents => {
        contents.forEach((content, index) => {
            const nameCount = {};
            const cpfCount = {};
            const fileName = input.files[index].name;

            console.log(`Processando arquivo: ${fileName}`);

            // Dividir por linhas primeiro, depois por palavras para lidar corretamente com nomes completos e CPFs
            const lines = content.split(/\r?\n/);
            lines.forEach(line => {
                console.log(`Processando linha: ${line}`);
                const columns = line.trim().split(/,\s*/); // Assumindo que as colunas CSV são separadas por vírgula e espaços opcionais
                if (columns.length >= 2) { // Assumindo pelo menos duas colunas: nome e CPF
                    const fullName = columns[0]; // Assumindo que o nome está na primeira coluna
                    const cpf = columns[1]; // Assumindo que o CPF está na segunda coluna
                    
                    console.log(`Nome encontrado: ${fullName}, CPF: ${cpf}`);

                    if (fullName) {
                        if (!nameCount[fullName]) {
                            nameCount[fullName] = 0;
                        }
                        nameCount[fullName]++;
                    }

                    if (cpf) {
                        if (!cpfCount[cpf]) {
                            cpfCount[cpf] = 0;
                        }
                        cpfCount[cpf]++;
                    }
                }
            });

            displayRepeatedNamesAndCPFs(nameCount, cpfCount, fileName);
        });
    }).catch(error => {
        console.error('Erro ao ler os arquivos: ', error);
    });
}

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

function displayRepeatedNamesAndCPFs(nameCount, cpfCount, fileName) {
    const resultsDiv = document.getElementById('results');
    const repeatedNames = Object.keys(nameCount).filter(name => nameCount[name] > 1);
    const repeatedCPFs = Object.keys(cpfCount).filter(cpf => cpfCount[cpf] > 1);

    const fileTitle = document.createElement('h2');
    fileTitle.textContent = `Arquivo: ${fileName}`;
    resultsDiv.appendChild(fileTitle);

    if (repeatedNames.length > 0) {
        const nameList = document.createElement('ul');
        repeatedNames.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = `${name}: ${nameCount[name]} vezes`;
            nameList.appendChild(listItem);
        });
        resultsDiv.appendChild(nameList);
    } else {
        const noRepeatsMessage = document.createElement('p');
        noRepeatsMessage.textContent = 'Não foram encontrados nomes repetidos.';
        resultsDiv.appendChild(noRepeatsMessage);
    }

    if (repeatedCPFs.length > 0) {
        const cpfList = document.createElement('ul');
        repeatedCPFs.forEach(cpf => {
            const listItem = document.createElement('li');
            listItem.textContent = `${cpf}: ${cpfCount[cpf]} vezes`;
            cpfList.appendChild(listItem);
        });
        resultsDiv.appendChild(cpfList);
    } else {
        const noRepeatsMessage = document.createElement('p');
        noRepeatsMessage.textContent = 'Não foram encontrados CPFs repetidos.';
        resultsDiv.appendChild(noRepeatsMessage);
    }
}