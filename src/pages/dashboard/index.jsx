import React, { useEffect } from 'react';
import './index.scss';
import { Typography, message } from 'antd';
import { ethers } from 'ethers';
import TransactionForm from './components/transactionForm';
import etherJsImg from '../../assets/images/etherJs.webp';

const { Text, Title } = Typography;
function Dashboard() {
  const [messageApi, contextHolder] = message.useMessage();
  const throwWarning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Please connect to the wallet',
    });
  };

  useEffect(() => {
    // const provider = new ethers.providers.EtherscanProvider(api);
    // const provider = new ethers.providers.JsonRpcProvider(
    //   'https://goerli.infura.io/v3/cc75fe1364f24987a12955bf51c49a73'
    // );
    // provider
    //   .getTransactionCount('address')
    //   .then((res) => console.log('COUNT', res));
  }, []);
  return (
    <div className='dashboardContainer'>
      <div className='details'>
        {/* <div>
          <Title level={4}>Write Heading here</Title>
          <Text>Write description here</Text>
        </div> */}
        <img className='etherImg' src={etherJsImg} alt='' />
        <TransactionForm />
      </div>
    </div>
  );
}

export default Dashboard;
