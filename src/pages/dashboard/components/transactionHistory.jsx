import React, { useEffect } from 'react';

function TransactionHistory() {
  useEffect(() => {
    // const provider = new ethers.providers.EtherscanProvider(api);
    // const provider = new ethers.providers.JsonRpcProvider(
    //   'https://goerli.infura.io/v3/cc75fe1364f24987a12955bf51c49a73'
    // );
    // provider
    //   .getTransactionCount('address')
    //   .then((res) => console.log('COUNT', res));
  }, []);
  return <div>transactionHistory</div>;
}

export default TransactionHistory;
