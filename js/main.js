$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getBalance(searchText);
    e.preventDefault();
  });
});

function getBalance(searchText){
  axios.get('https://api.blockcypher.com/v1/btc/main/addrs/'+searchText)
    .then((response) => {
      console.log(response);
      let objects = response.data;
      let output = `
                    <div class="col-md-12">
                      <div class="well text-center">
                        <h4>The Balance for Address ${objects.address} is ${objects.final_balance}</h4>
                      </div>
                    </div>
                  `;

      $('#balance').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
