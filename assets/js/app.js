// Função chamada quando um código é escaneado com sucesso
function onScanSuccess(decodedText, decodedResult) {
  console.log(`Código escaneado = ${decodedText}`, decodedResult);
  // Preenche o campo de código de barras com o valor escaneado
  document.getElementById('barcodeResult').value = decodedText;
}

// Inicializa o scanner
var html5QrcodeScanner = new Html5QrcodeScanner(
  "qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);

// Função para adicionar um novo item
function addItemToList(itemName, barcodeResult) {
  // Cria um objeto representando o novo item
  var newItem = { name: itemName, barcode: barcodeResult };

  // Obtém a lista de itens do armazenamento local ou inicializa se não existir
  var itemList = JSON.parse(localStorage.getItem('itemList')) || [];

  // Adiciona o novo item à lista
  itemList.push(newItem);

  // Salva a lista atualizada no armazenamento local
  localStorage.setItem('itemList', JSON.stringify(itemList));

  // Atualiza a exibição da lista de itens
  displayItemList();
}

// Função para exibir a lista de itens
function displayItemList() {
  var itemList = JSON.parse(localStorage.getItem('itemList')) || [];
  var itemListHTML = '';

  // Constrói o HTML para cada item na lista
  itemList.forEach(function(item, index) {
      itemListHTML += '<li>';
      itemListHTML += 'Nome: ' + item.name + ' - Código de Barras: ' + item.barcode;
      itemListHTML += '</li>';
  });

  // Exibe a lista na página
  document.getElementById('itemList').innerHTML = itemListHTML;
}

// Exibe a lista de itens ao carregar a página
displayItemList();

// Adiciona evento de envio do formulário
document.getElementById('addItemForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém valores do formulário
  var itemName = document.getElementById('itemName').value;
  var barcodeResult = document.getElementById('barcodeResult').value;

  // Adiciona o novo item à lista
  addItemToList(itemName, barcodeResult);

  // Limpa o formulário após o envio
  document.getElementById('itemName').value = '';
  document.getElementById('barcodeResult').value = '';
});