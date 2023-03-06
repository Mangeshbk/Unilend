import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Tag, Spin } from 'antd';
import { useSelector } from 'react-redux';
const { Title, Text } = Typography;

function TransactionHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [isLoader, seIsLoader] = useState(false);

  const getAmount = (value) => {
    return Number(value) / 10 ** 18;
  };

  const { address } = useSelector((state) => state?.wallet);

  const getShortAddress = (address) => {
    if (address) {
      return (
        address?.substr(0, 4) +
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

  const getHistory = async () => {
    seIsLoader(true);
    const url = `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${process.env.API_KEY}`;
    const res = await axios.get(url);
    seIsLoader(false);
    console.log(res?.data?.result);
    setHistoryData(res?.data?.result);
  };
  useEffect(() => {
    if (address) getHistory();
    // eslint-disable-next-line
  }, [address]);

  return (
    <div className='transactionContainer'>
      <Title level={4}>Transaction History</Title>

      {isLoader ? (
        <Spin tip='Loading' size='large'>
          <div className='content' />
        </Spin>
      ) : (
        <div>
          <Card className='tableList'>
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
              dataSource={historyData}
              renderItem={(item, index) => (
                <List.Item>
                  <Text className='historyAmount'>
                    {getShortAddress(item.to) || ''}
                  </Text>
                  <Text className='historyAmount'>
                    {getTimeFromDate(item.timeStamp)}
                  </Text>
                  {address === item.from ? (
                    <Tag color='green'>
                      {getAmount(item.value).toFixed(4)} ETH
                    </Tag>
                  ) : (
                    <Tag color='red'>
                      {getAmount(item.value).toFixed(4)} ETH
                    </Tag>
                  )}
                </List.Item>
              )}
            />
          </Card>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
