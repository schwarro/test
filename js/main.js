$(document).ready(() => {
  //Balance Var
  //Creates searchText to be used as an argument
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getBalance(searchText);
    e.preventDefault();
  });

  //Payment Var
  //Creates tge newtx using the user address, destination address and value
  $('#paymentForm').on('submit', (e) => {
    let newtx = {
      inputs: [{addresses: [$('#address').val()]}],
      outputs: [{addresses: [$('#destination').val()], value: parseInt($('#value').val())}],
    };
    sendPayment(newtx);
    e.preventDefault();
  });
});

//Retrieve Account Balance
//Runs Searchtext through api function
//Gets object back
//Displays in main body the address and final balance of the address for user
function getBalance(searchText){
  axios.get('https://api.blockcypher.com/v1/btc/main/addrs/'+searchText)
    .then((response) => {
      console.log(response);
      let objects = response.data;
      let output = `
                    <div class="col-md-12">
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
//Runs newtx as argument through function to send payment 
function sendPayment(newtx){
  axios.post('https://api.blockcypher.com/v1/bcy/test/txs/new?token=6fd809b23c214e4cb7e8e116867c285d', JSON.stringify(newtx))
    .then(function(d) {console.log(d)})
    .catch((err) => {
      console.log(err);
    });
}
