// === ZIP PARA IMPOSTOS ===
document.getElementById('calcularImpostosBtn').addEventListener('click', function() {
  const file = document.getElementById('zipInputImpostos').files[0];
  const resultadoDiv = document.getElementById('resultadoZipImpostos');

  if (!file) {
    resultadoDiv.textContent = "Nenhum arquivo selecionado.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    JSZip.loadAsync(e.target.result).then(async function(zip) {
      let count = 0;
      let totalNotas = 0;  // Variável para somar o valor total das notas

      const promessas = [];

      zip.forEach(function (_, zipEntry) {
        if (zipEntry.name.toLowerCase().endsWith(".xml")) {
          count++;  // Contando o número de arquivos XML
          promessas.push(
            zipEntry.async("text").then(function(xmlContent) {
              const valorNota = somarNotas(xmlContent);  // Chama a função para somar as notas fiscais
              totalNotas += valorNota;  // Somando os valores das notas
            })
          );
        }
      });

      // Aguardando todas as promessas (arquivos XML) serem processadas
      await Promise.all(promessas);
      // Obter a base de presunção escolhida pelo usuário
      const basePresuncao = parseFloat(document.getElementById('basePresuncao').value);
      

      // Calcular os impostos com base no total das notas fiscais
      const PIS = totalNotas * 0.0065;  // 0,65% de PIS
      const COFINS = totalNotas * 0.03;  // 3% de COFINS
      const CSLL = (totalNotas * basePresuncao) * 0.09;  // 9% de CSLL com base de presunção (escolhida pelo usuário)
      const IRPJ = (totalNotas * basePresuncao) * 0.15;  // 15% de IRPJ com base de presunção (escolhida pelo usuário)

      // Exibindo o resultado final
      resultadoDiv.innerHTML = `
          <style>
            .resultado-tabela {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 1rem;
              border: 2px solid #ccc;
            }
            .resultado-tabela th, .resultado-tabela td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: center;
            }
            .resultado-tabela th {
              background-color: #3498db;
              color: white;
              font-weight: bold;
            }
            .resultado-tabela tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .resultado-tabela td {
              font-size: 1.1rem;
            }
          </style>
          <table class="resultado-tabela">
            <thead>
              <tr>
                <th>Imposto</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total de Arquivos XML</td>
                <td>${count}</td>
              </tr>
              <tr>
                <td>Total das Notas Fiscais</td>
                <td>R$ ${totalNotas.toFixed(2)}</td>
              </tr>
              <tr>
                <td>PIS (0,65%)</td>
                <td>R$ ${PIS.toFixed(2)}</td>
              </tr>
              <tr>
                <td>COFINS (3%)</td>
                <td>R$ ${COFINS.toFixed(2)}</td>
              </tr>
              <tr>
                <td>CSLL (9% com base de ${basePresuncao * 100}%)</td>
                <td>R$ ${CSLL.toFixed(2)}</td>
              </tr>
              <tr>
                <td>IRPJ (15% com base de ${basePresuncao * 100}%)</td>
                <td>R$ ${IRPJ.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        `;
    }).catch(function(err) {
      resultadoDiv.textContent = "Erro ao ler o ZIP: " + err;
    });
  };
  reader.readAsArrayBuffer(file);
});

// Função para somar o valor das notas fiscais (conforme o código anterior)
function somarNotas(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');

  let totalNotas = 0;

  // Função auxiliar para somar valores de uma tag de total da nota
  function somarTag(tagName) {
    const nodes = doc.getElementsByTagName(tagName);
    let soma = 0;
    for (let i = 0; i < nodes.length; i++) {
      const valor = parseFloat(nodes[i].textContent.trim()); // remove espaços
      if (!isNaN(valor)) {
        soma += valor;
      }
    }
    return soma;
  }

  // Somar o valor total da nota fiscal
  totalNotas = somarTag('vNF');  // Ou outra tag relevante que represente o valor total da nota

  return totalNotas;
}


// === ZIP ===
document.getElementById('zipInput')?.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const resultadoDiv = document.getElementById('resultadoZip');

  if (!file) {
    resultadoDiv.textContent = "Nenhum arquivo selecionado.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    JSZip.loadAsync(e.target.result).then(function(zip) {
      let count = 0;
      zip.forEach(function (_, zipEntry) {
        if (zipEntry.name.toLowerCase().endsWith(".xml")) {
          count++;
        }
      });
      resultadoDiv.innerHTML = `<p>Total de arquivos XML: <span class="highlight">${count}</span></p>`;
    }).catch(function(err) {
      resultadoDiv.textContent = "Erro ao ler o ZIP: " + err;
    });
  };
  reader.readAsArrayBuffer(file);
});

// === EXCEL ===
document.getElementById('excelInput')?.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const resultadoDiv = document.getElementById('resultadoExcel');

  if (!file) {
    resultadoDiv.textContent = "Nenhum arquivo selecionado.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    let row = 3;
    let totalNotas = 0;
    let somaValores = 0;
    let canceladas = [];

    while (true) {
      const notaCell = sheet[`I${row}`];
      const valorCell = sheet[`N${row}`];
      const statusCell = sheet[`S${row}`];

      if (!notaCell || !notaCell.v) break;

      totalNotas++;
      const valor = parseFloat(valorCell?.v || 0);
      somaValores += isNaN(valor) ? 0 : valor;

      const status = statusCell?.v || "";
      if (status.includes("Cancelamento de NF-e homologado")) {
        canceladas.push(notaCell.v);
      }

      row++;
    }

    const homologadas = totalNotas - canceladas.length;
    const diferenca = homologadas - canceladas.length;

    let html = ` 
      <p>📄 Total de notas: <span class="highlight">${totalNotas}</span></p>
      <p>💰 Valor total: <span class="highlight">R$ ${somaValores.toFixed(2).replace('.', ',')}</span></p>
      <p class="canceladas">❌ Canceladas: ${canceladas.length}</p>
      <p class="homologadas">✅ Homologadas: ${homologadas}</p>
      <p>📉 Diferença: <strong>${diferenca}</strong></p>
    `;

    if (canceladas.length > 0) {
      html += `<ul>` + canceladas.map(n => `<li>Nota cancelada: ${n}</li>`).join('') + `</ul>`;
    }

    resultadoDiv.innerHTML = html;
  };

  reader.readAsArrayBuffer(file);
});

let zipBusca;

document.getElementById('zipBuscaInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const mensagemDiv = document.getElementById('mensagemBusca');

  if (!file) {
    mensagemDiv.textContent = "Nenhum arquivo selecionado.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    JSZip.loadAsync(e.target.result).then(function(zip) {
      zipBusca = zip;
      mensagemDiv.innerHTML = "<p style='color: green;'>Arquivo ZIP carregado com sucesso! Agora digite o número da nota.</p>";
    }).catch(function(err) {
      mensagemDiv.innerHTML = `<p style='color: red;'>Erro ao ler o ZIP: ${err}</p>`;
    });
  };

  reader.readAsArrayBuffer(file);
});

document.getElementById('buscarNota').addEventListener('click', function() {
  const numero = document.getElementById('numeroNota').value.trim();
  const mensagemDiv = document.getElementById('mensagemBusca');

  if (!zipBusca) {
    mensagemDiv.innerHTML = "<p style='color: red;'>Por favor, selecione um arquivo ZIP primeiro.</p>";
    return;
  }

  if (!numero) {
    mensagemDiv.innerHTML = "<p style='color: red;'>Digite o número da nota fiscal.</p>";
    return;
  }

  let encontrado = false;

  zipBusca.forEach(async function (relativePath, zipEntry) {
    const content = await zipEntry.async("string");
    
    if (content.includes(`<nNF>${numero}</nNF>`)) {
      encontrado = true;
  
      // Processando o XML da nota fiscal para exibir de forma organizada
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(content, "application/xml");
  
      // Extraindo as informações de forma segura
      const chaveAcesso = xmlDoc.querySelector('chaveAcesso') ? xmlDoc.querySelector('chaveAcesso').textContent : 'Não disponível';
      const razaoSocial = xmlDoc.querySelector('emit > xNome') ? xmlDoc.querySelector('emit > xNome').textContent : 'Não disponível';
      const cnpj = xmlDoc.querySelector('emit > CNPJ') ? xmlDoc.querySelector('emit > CNPJ').textContent : 'Não disponível';
      const endereco = xmlDoc.querySelector('emit > enderEmit > xLgr') && xmlDoc.querySelector('emit > enderEmit > nro') && xmlDoc.querySelector('emit > enderEmit > xBairro') ?
        `${xmlDoc.querySelector('emit > enderEmit > xLgr').textContent}, ${xmlDoc.querySelector('emit > enderEmit > nro').textContent}, ${xmlDoc.querySelector('emit > enderEmit > xBairro').textContent}` : 'Não disponível';
      const inscricaoEstadual = xmlDoc.querySelector('emit > IE') ? xmlDoc.querySelector('emit > IE').textContent : 'Não disponível';
  
      const destinatario = xmlDoc.querySelector('dest > xNome') ? xmlDoc.querySelector('dest > xNome').textContent : 'Não disponível';
      const cnpjDest = xmlDoc.querySelector('dest > CNPJ') ? xmlDoc.querySelector('dest > CNPJ').textContent : 'CPF não disponível';
  
      const itens = xmlDoc.querySelectorAll('det');
      const itensTabela = [];
      let totalItens = 0;
  
      itens.forEach((item) => {
        const descricao = item.querySelector('prod > xProd') ? item.querySelector('prod > xProd').textContent : 'Não disponível';
        const quantidade = item.querySelector('prod > qCom') ? item.querySelector('prod > qCom').textContent : 'Não disponível';
        const valorUnitario = item.querySelector('prod > vUnCom') ? item.querySelector('prod > vUnCom').textContent : 'Não disponível';
        const total = item.querySelector('prod > vProd') ? item.querySelector('prod > vProd').textContent : 'Não disponível';
        itensTabela.push({ descricao, quantidade, valorUnitario, total });
        totalItens += parseFloat(total) || 0;  // Evitar NaN
      });
  
      // Gerando o conteúdo HTML organizado
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nota Fiscal</title>
          <style>
             {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            }

            /* Corpo da página */
            body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
            }

            /* Container principal da nota fiscal */
            .nota-fiscal {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-width: 1000px;
            margin: 30px auto;
            }

            /* Cabeçalho da nota */
            .header {
            text-align: center;
            margin-bottom: 30px;
            }

            .header h1 {
            font-size: 2.5rem;
            color: #2C3E50;
            margin-bottom: 10px;
            }

            .header p {
            font-size: 1rem;
            color: #7f8c8d;
            }

            /* Seção de Informações */
            .info {
            margin-bottom: 30px;
            }

            .info h2 {
            font-size: 1.8rem;
            color: #3498db;
            margin-bottom: 15px;
            }

            .info p {
            font-size: 1rem;
            line-height: 1.6;
            }

            .info span {
            font-weight: bold;
            color: #2C3E50;
            }

            /* Tabela de Itens */
            .itens {
            margin-bottom: 30px;
            }

            .itens h2 {
            font-size: 1.8rem;
            color: #3498db;
            margin-bottom: 15px;
            }

            .itens table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background-color: #ecf0f1;
            }

            .itens th, .itens td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
            }

            .itens th {
            background-color: #3498db;
            color: white;
            }

            .itens td {
            background-color: white;
            }

            .itens tr:nth-child(even) {
            background-color: #f9f9f9;
            }

            .itens tr:hover {
            background-color: #f1f1f1;
            }

            /* Totais */
            .totais {
            margin-top: 20px;
            }

            .totais p {
            font-size: 1.2rem;
            font-weight: bold;
            color: #2C3E50;
            }

            /* Rodapé */
            .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 0.9rem;
            color: #7f8c8d;
            }

            /* Responsividade */
            @media (max-width: 768px) {
            .nota-fiscal {
                padding: 20px;
            }

            .header h1 {
                font-size: 2rem;
            }

            .info h2, .itens h2 {
                font-size: 1.5rem;
            }

            .info p, .itens td {
                font-size: 0.9rem;
            }

            .totais p {
                font-size: 1rem;
            }
            }

          </style>
        </head>
        <body>
          <div class="nota-fiscal">
            <h1>Nota Fiscal Eletrônica</h1>
            <p><strong>Chave de Acesso:</strong> ${chaveAcesso}</p>
            <p><strong>Razão Social:</strong> ${razaoSocial}</p>
            <p><strong>CNPJ:</strong> ${cnpj}</p>
            <p><strong>Endereço:</strong> ${endereco}</p>
            <p><strong>Inscrição Estadual:</strong> ${inscricaoEstadual}</p>
            <p><strong>Destinatário:</strong> ${destinatario}</p>
            <p><strong>CNPJ/CPF do Destinatário:</strong> ${cnpjDest}</p>
  
            <h2>Itens da Nota</h2>
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${itensTabela.map(item => `
                  <tr>
                    <td>${item.descricao}</td>
                    <td>${item.quantidade}</td>
                    <td>R$ ${parseFloat(item.valorUnitario).toFixed(2).replace('.', ',')}</td>
                    <td>R$ ${parseFloat(item.total).toFixed(2).replace('.', ',')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <h3>Total de Itens: R$ ${totalItens.toFixed(2).replace('.', ',')}</h3>
          </div>
        </body>
        </html>
      `);
    }
  });
  
  
  reader.onload = function(e) {
    JSZip.loadAsync(e.target.result).then(function(zip) {
      console.log('Arquivo ZIP carregado:', zip);  // Adicione esta linha para depuração
      zipBusca = zip;
      mensagemDiv.innerHTML = "<p style='color: green;'>Arquivo ZIP carregado com sucesso! Agora digite o número da nota.</p>";
    }).catch(function(err) {
      console.log('Erro ao ler o ZIP:', err);  // Verifique o erro se ocorrer
      mensagemDiv.innerHTML = `<p style='color: red;'>Erro ao ler o ZIP: ${err}</p>`;
    });
  };

  setTimeout(() => {
    if (!encontrado) {
      mensagemDiv.innerHTML = `<p style="color: red;">Nota ${numero} não encontrada no arquivo ZIP.</p>`;
    }
  }, 2000);
});
