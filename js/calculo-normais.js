// Função para processar o arquivo ZIP e extrair os arquivos XML
async function processarZip() {
  const zipInput = document.getElementById('zipInput');
  const file = zipInput.files[0];

  if (!file) {
    alert("Por favor, selecione um arquivo ZIP.");
    return;
  }

  try {
    const zip = await JSZip.loadAsync(file);
    const files = Object.keys(zip.files);
    const xmlFiles = files.filter(f => f.endsWith('.xml'));

    if (xmlFiles.length === 0) {
      alert("Nenhum arquivo XML encontrado no ZIP.");
      return;
    }

    console.log('Arquivos XML encontrados:', xmlFiles);

    let totalNotas = 0;
    let totalISS = 0;
    let totalPIS_Retido = 0;
    let totalCOFINS_Retido = 0;
    let totalCSLL_Retido = 0;
    let totalIRPJ_Retido = 0;

    // Função para acessar elementos XML com namespaces
    function getValueFromXML(xmlDoc, tagName) {
      const ns = "http://www.ctaconsult.com/nfse";
      return xmlDoc.getElementsByTagNameNS(ns, tagName);
    }

    // Processa cada XML dentro do ZIP
    for (let xmlFile of xmlFiles) {
      const xmlContent = await zip.files[xmlFile].async("text");
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "application/xml");

      // Verificar se os dados existem antes de processar
      const valorNota = getValueFromXML(xmlDoc, 'valotTotalNota')[0]?.textContent;
      const valorISSNota = getValueFromXML(xmlDoc, 'valorTotalISS')[0]?.textContent;
      const pis_retido = getValueFromXML(xmlDoc, 'valorImposto')[0]?.textContent;
      const cofins_retido = getValueFromXML(xmlDoc, 'valorImposto')[1]?.textContent;
      const csll_retido = getValueFromXML(xmlDoc, 'valorImposto')[4]?.textContent;
      const irpj_retido = getValueFromXML(xmlDoc, 'valorImposto')[3]?.textContent;

      if (valorNota && valorISSNota && pis_retido && cofins_retido && csll_retido && irpj_retido) {
        // Acumula os valores
        // Acumula os valores
        totalNotas += parseFloat(valorNota) || 0;
        totalISS += parseFloat(valorISSNota) || 0;
        totalPIS_Retido += parseFloat(pis_retido) || 0;
        totalCOFINS_Retido += parseFloat(cofins_retido) || 0;
        totalCSLL_Retido += parseFloat(csll_retido) || 0;
        totalIRPJ_Retido += parseFloat(irpj_retido) || 0;
      } else {
        console.warn('Faltando dados em algum XML:', xmlFile);
      }
    }

    // Exibe os resultados  

    const pis_Apurado = totalNotas*0.65/100
    const cofins_Apurado = totalNotas*3/100
    const csll_Apurado = totalNotas*(32/100)*(9/100)
    const irpj_Apurado = totalNotas*(32/100)*(15/100)

    const pis_recolher = pis_Apurado - totalPIS_Retido
    const cofins_recolher = cofins_Apurado - totalCOFINS_Retido
    const csll_recolher = csll_Apurado - totalCSLL_Retido
    const irpj_recolher = irpj_Apurado - totalIRPJ_Retido

    document.getElementById('totalNotas').textContent = totalNotas.toFixed(2);
    document.getElementById('totalISS').textContent = totalISS.toFixed(2);
    document.getElementById('totalPIS_Retido').textContent = totalPIS_Retido.toFixed(2);
    document.getElementById('totalCOFINS_Retido').textContent = totalCOFINS_Retido.toFixed(2);
    document.getElementById('totalCSLL_Retido').textContent = totalCSLL_Retido.toFixed(2);
    document.getElementById('totalIRPJ_Retido').textContent = totalIRPJ_Retido.toFixed(2);


    document.getElementById('totalPIS_Recolher').textContent = pis_recolher.toFixed(2);
    document.getElementById('totalCOFINS_Recolher').textContent = cofins_recolher.toFixed(2);
    document.getElementById('totalCSLL_Recolher').textContent = csll_recolher.toFixed(2);
    document.getElementById('totalIRPJ_Recolher').textContent = irpj_recolher.toFixed(2);


    // Exibe o painel de resultados
    document.getElementById('resultadoImpostos').style.display = 'block';

  } catch (error) {
    console.error('Erro ao processar o arquivo ZIP:', error);
    alert('Ocorreu um erro ao processar o arquivo ZIP. Por favor, tente novamente.');
  }
}
