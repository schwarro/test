$(document).ready(() => {
  //Balance Var
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getBalance(searchText);
    e.preventDefault();
  });

  //Payment Var
  $('#paymentForm').on('submit', (e) => {
    let newtx = {
      inputs: [{addresses: [$('#address').val()]}],
      outputs: [{addresses: [$('#destination').val()], value: $('#value').val()}]
    };
    sendPayment(newtx);
    e.preventDefault();
  });
});

//Retrieve Account Balance
function getBalance(searchText){
  axios.get('https://api.blockcypher.com/v1/btc/main/addrs/'+searchText)
    .then((response) => {
      console.log(response);
      let objects = response.data;
      let output = `
                    <div class="col-md-12"><!-- End of Form -->
                      <div class="well text-center">
                        <h4>The Balance for Address "${objects.address}" is:</h4>
                        <h4>${objects.final_balance} Satoshi.</h4>
                      </div>
                    </div>
                  `;

      $('#balance').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Making Payment
function sendPayment(newtx){
  axios.post('https://api.blockcypher.com/v1/bcy/test/txs/new', JSON.stringify(newtx))
    .then(function(d) {console.log(d)})
    .catch((err) => {
      console.log(err);
    });
}
