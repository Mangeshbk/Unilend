import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Tag } from 'antd';
import { useSelector } from 'react-redux';
const { Title, Text } = Typography;

function TransactionHistory() {
  const dummyData = [
    {
      blockNumber: '8595052',
      timeStamp: '1677925224',
      hash: '0xde6ea56d75face0003091887ca5245e9ecbfdce264e7df66f21fbb9e191e86e3',
      nonce: '110372',
      blockHash:
        '0x3332f988c0ac3533be9db07f1dc681422976907b0237d5861886063b2104c4ba',
      transactionIndex: '30',
      from: '0xf157e5b28245977e462daf222479a0502bf759f0',
      to: '0xd5b26ac46d2f43f4d82889f4c7bbc975564859e3',
      value: '200000000000000000',
      gas: '63000',
      gasPrice: '67756395114',
      isError: '0',
      txreceipt_status: '1',
      input: '0x',
      contractAddress: '',
      cumulativeGasUsed: '651000',
      gasUsed: '21000',
      confirmations: '6378',
      methodId: '0x',
      functionName: '',
    },
    {
      blockNumber: '8600847',
      timeStamp: '1678011456',
      hash: '0x12563322b9c13178a9eb681c47ce3cd02eddfe4c07f5374b93602531b952583f',
      nonce: '0',
      blockHash:
        '0x471d6d1866dd902f9b8a7014be66b076ec9259d07854307a292b8a19f87aad19',
      transactionIndex: '46',
      from: '0xd5b26ac46d2f43f4d82889f4c7bbc975564859e3',
      to: '0xd5b26ac46d2f43f4d82889f4c7bbc975564859e3',
      value: '0',
      gas: '21000',
      gasPrice: '15710171827',
      isError: '0',
      txreceipt_status: '1',
      input: '0x',
      contractAddress: '',
      cumulativeGasUsed: '5001576',
      gasUsed: '21000',
      confirmations: '583',
      methodId: '0x',
      functionName: '',
    },
    {
      blockNumber: '8600851',
      timeStamp: '1678011528',
      hash: '0x6c6f5e0963906c2a9c851a86ab66f2f467e6fe77a31e10e053c9aed7b87041cc',
      nonce: '1',
      blockHash:
        '0x34e736e9e184cd912ccffb1485491b9a8f1995a7a795785f0f1c6ea5af99cb4b',
      transactionIndex: '55',
      from: '0xd5b26ac46d2f43f4d82889f4c7bbc975564859e3',
      to: '0xe13248e6d3f20a92698645225a611ed96966a62e',
      value: '2000000000000000',
      gas: '21000',
      gasPrice: '16147796681',
      isError: '0',
      txreceipt_status: '1',
      input: '0x',
      contractAddress: '',
      cumulativeGasUsed: '7621264',
      gasUsed: '21000',
      confirmations: '579',
      methodId: '0x',
      functionName: '',
    },
    {
      blockNumber: '8600989',
      timeStamp: '1678013448',
      hash: '0xc4a1aa19f8d1681c9ef2a68fcef89b4324d1f56957053cfe0bbbff052ad4b4c5',
      nonce: '2',
      blockHash:
        '0xd6ce966a7382031b852b16b7d3ae53adf709edddfcf4819cc0c38b080ddf2abd',
      transactionIndex: '97',
      from: '0xd5b26ac46d2f43f4d82889f4c7bbc975564859e3',
      to: '0xe13248e6d3f20a92698645225a611ed96966a62e',
      value: '1000000000000000',
      gas: '21000',
      gasPrice: '22434266183',
      isError: '0',
      txreceipt_status: '1',
      input: '0x',
      contractAddress: '',
      cumulativeGasUsed: '19656957',
      gasUsed: '21000',
      confirmations: '441',
      methodId: '0x',
      functionName: '',
    },
    {
      blockNumber: '8601025',
      timeStamp: '1678013976',
      hash: '0x4bb500fa978e852031148dd56203967125955fbd5109be555980de9a139d4c63',
      nonce: '3',
      blockHash:
        '0xb275918046a809f77e566213f0f318035bfd6fa347b6f693d32e79bc2c588ad7',
      transactionIndex: '65',
      from: '0xd5b26ac46d2f43f4d82889f4c7bbc975564859e3',
      to: '0xe13248e6d3f20a92698645225a611ed96966a62e',
      value: '300000000000000',
      gas: '21000',
      gasPrice: '26741361262',
      isError: '0',
      txreceipt_status: '1',
      input: '0x',
      contractAddress: '',
      cumulativeGasUsed: '15034000',
      gasUsed: '21000',
      confirmations: '405',
      methodId: '0x',
      functionName: '',
    },
    {
      blockNumber: '8601031',
      timeStamp: '1678014060',
      hash: '0x53eefc678a1753efe8518c374cdf97dead634663fc5c73e94600a688a936df72',
      nonce: '4',
      blockHash:
        '0x6e5b9f565a4897d68544e64ed5ce364e94f56c633ab743017e07cbc43f90c061',
      transactionIndex: '59',
      from: '0xd5b26ac46d2f43f4d82889f4c7bbc975564859e3',
      to: '0xe13248e6d3f20a92698645225a611ed96966a62e',
      value: '400000000000000',
      gas: '21000',
      gasPrice: '25694825787',
      isError: '0',
      txreceipt_status: '1',
      input: '0x',
      contractAddress: '',
      cumulativeGasUsed: '13480916',
      gasUsed: '21000',
      confirmations: '399',
      methodId: '0x',
      functionName: '',
    },
    {
      blockNumber: '8601353',
      timeStamp: '1678018812',
      hash: '0xf56c207e9e595e66d81ad679eed56e7c6eb59fdcb00d6ab8e2d638e521276736',
      nonce: '263047',
      blockHash:
        '0x5801d2a06c15736b0f9af23955d5a46676b0bf3fd4f468edd4d9dd1a10864598',
      transactionIndex: '2',
      from: '0x631e9b031b16b18172a2b9d66c3668a68a668d20',
      to: '0xd5b26ac46d2f43f4d82889f4c7bbc975564859e3',
      value: '200000000000000000',
      gas: '63000',
      gasPrice: '57453768267',
      isError: '0',
      txreceipt_status: '1',
      input: '0x',
      contractAddress: '',
      cumulativeGasUsed: '79861',
      gasUsed: '21000',
      confirmations: '77',
      methodId: '0x',
      functionName: '',
    },
  ];
  /*
  const [historyData, setHistoryData] = useState(dummyData);

  const getHistory = async () => {
    // const res = await axios.get('https://api-goerli.etherscan.io/api', {
    //   module: 'account',
    //   action: 'txlist',
    //   address: sessionStorage.getItem('userAddress'),
    //   startblock: 0,
    //   endblock: 99999999,
    //   page: 1,
    //   offset: 10,
    //   sort: 'asc',
    //   apikey: 'CS46J2QGS74K34RPFSFKMMP74W5QIU3HGV',
    // });

    // axios({
    //   url: 'https://api-goerli.etherscan.io/api',
    //   method: 'get',
    //   headers: {
    //     module: 'account',
    //     action: 'txlist',
    //     address: sessionStorage.getItem('userAddress'),
    //     startblock: 0,
    //     endblock: 99999999,
    //     page: 1,
    //     offset: 10,
    //     sort: 'asc',
    //     apikey: 'CS46J2QGS74K34RPFSFKMMP74W5QIU3HGV',
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // console.log(res);

    fetch(
      'https://api-goerli.etherscan.io/api?module=account&action=txlist&address=0xD5b26AC46d2F43F4d82889f4C7BBc975564859e3&startblock=0&endblock=99999999&apikey=CS46J2QGS74K34RPFSFKMMP74W5QIU3HGV'
    )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHistory();
    // const provider = new ethers.providers.EtherscanProvider(api);
    // const provider = new ethers.providers.JsonRpcProvider(
    //   'https://goerli.infura.io/v3/cc75fe1364f24987a12955bf51c49a73'
    // );
    // provider
    //   .getTransactionCount('address')
    //   .then((res) => console.log('COUNT', res));
  }, []);
*/
  const getAmount = (value) => {
    return Number(value) / 10 ** 18;
  };

  const { address } = useSelector((state) => state?.wallet);
  const getShortAddress = (address) => {
    if (address !== '') {
      return (
        address.substr(0, 4) +
        '...' +
        address.substr(address.length - 4, address.length - 1)
      );
    }
  };

  const getTimeFromDate = (time) => {
    const date = new Date(Number(time));
    return (
      date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString()
    );
  };

  const heading = [{ address: 'Address', time: 'Time', amount: 'Amount' }];

  return (
    <div className='transactionContainer'>
      <Title level={4}>Transaction History</Title>
      <div>
        <Card>
          <List
            className='listHeading'
            itemLayout='horizontal'
            dataSource={heading}
            renderItem={(item, index) => (
              <List.Item>
                <Text>{item.address}</Text>
                <Text>{item.time} </Text>

                <Text style={{ padding: '0 10px' }}>{item.amount} </Text>
              </List.Item>
            )}
          />
          <List
            itemLayout='horizontal'
            dataSource={dummyData}
            renderItem={(item, index) => (
              <List.Item>
                <Text className='historyAmount'>
                  {getShortAddress(item.to)}
                </Text>
                <Text className='historyAmount'>
                  {getTimeFromDate(item.timeStamp)}
                </Text>
                {address === item.from ? (
                  <Tag color='green'>
                    {getAmount(item.value).toFixed(4)} ETH
                  </Tag>
                ) : (
                  <Tag color='red'>{getAmount(item.value).toFixed(4)} ETH</Tag>
                )}
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
}

export default TransactionHistory;
