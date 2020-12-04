function cleanDiv(){
  $('#cepFoundModal').remove();
  location.reload();
}



async function getAdress(){

    const cep = $('#inputCEP').val();

    if(cep == null || cep == "" || cep == undefined){
      cleanDiv();
    } 
    
    await axios({
    method: 'get',
    url: `https://viacep.com.br/ws/${cep}/json/`,
    responseType: 'json'
  })
    .then(function (adress) {

        if(adress.data.erro == true){
            $('#notFound').modal('show');
        } else {
    $('body').append(`
    <div class="modal fade" id="cepFoundModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Endereço encontrado!</h5>
            <button type="button" class="close" onclick="cleanDiv()" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onclick="cleanDiv()">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <input type="text" class = "form-control border-0" style = "background-color: white" disabled value="Rua: ${adress.data.logradouro}">
          <input type="text" class = "form-control border-0" style = "background-color: white" disabled value="Bairro: ${adress.data.bairro}">
          <input type="text" class = "form-control border-0" style = "background-color: white" disabled value="Cidade: ${adress.data.localidade}">
          <input type="text" class = "form-control border-0" style = "background-color: white" disabled value="Estado: ${adress.data.uf}">
          <input type="text" class = "form-control border-0" style = "background-color: white" disabled value="DDD: (${adress.data.ddd})">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="cleanDiv()" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>`
)
    
    $('#cepFoundModal').modal('show');
    
}

});

}


