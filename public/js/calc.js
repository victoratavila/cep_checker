function cleanDiv(){
  location.reload();
}

      async function redirect(){

      var rua = $("#adressTable #street").text();

      var cidade = $('#adressTable #city').text();

      var bairro = $('#adressTable #neighbourhood').text();

      var estado = $('#adressTable #state').text();

      const baseURL = `${rua} ${bairro} ${cidade} ${estado}`;

      navigator.clipboard.writeText(baseURL);
 
    }



async function getAdress(){

    const cep = $('#inputCEP').val();

    if(cep == ""){
      cleanDiv();
    } else { 
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
              <div class="modal-header" style = "border: 0; text-align: center">
                <h5 class="modal-title" id="staticBackdropLabel" style = "text-align: center">Endereço encontrado! <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="green" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg></h5> 
              </div>
              <div class="modal-body">
              <table class="table table-striped" style = "text-align: center" id = "adressTable">
              <thead>
                <tr>
                  <th scope="col">Rua</th>
                  <th scope="col">Bairro</th>
                  <th scope="col">Cidade</th>
                  <th scope="col">Estado</th>
                  <th scope="col">DDD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id="street">${adress.data.logradouro}</td>
                  <td id = "neighbourhood">${adress.data.bairro}</td>
                  <td id = "city">${adress.data.localidade}</td>
                  <td id = "state">${adress.data.uf}</td>
                  <td id = "ddd">${adress.data.ddd}</td>
                </tr>
              </tbody>
            </table>
    
          <button style = "width: 50%" class = "btn btn-outline-primary float-right" onclick = "redirect()"> Copiar endereço <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-front" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2H5z"/>
        </svg></button>
    
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="cleanDiv()" data-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      
        `
    )
        
        $('#cepFoundModal').modal('show');
        
    }
    
    });
    }
    
    

}


function stopSubmit(event){
  event.preventDefault();
  getAdress();
}

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

setInputFilter(document.getElementById("inputCEP"), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});