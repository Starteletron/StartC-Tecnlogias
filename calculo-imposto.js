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
  