import React, { useState, useEffect } from 'react';
import Logo from '../../icons/Logo';
import { Button, message, Tag, Typography } from 'antd';
import { ethers } from 'ethers';
import './index.scss';
const { Title } = Typography;

function Header() {
  const [connectStatus, setConnectStatus] = useState('disconnected');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({
    userBalance: '',
    userAddress: '',
  });

  // sessionStorage.setItem('userAddress', '');
  // sessionStorage.setItem('userBalance', '');

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: `Connected to the wallet`,
    });
  };
  const throwError = () => {
    messageApi.open({
      type: 'error',
      content: `${errorMessage || 'Failed to connect wallet'}`,
    });
  };

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      setConnectStatus('connecting');
      try {
        const account = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [account[0], 'latest'],
        });
        // sessionStorage.clear();
        sessionStorage.setItem('userAddress', account[0]);
        sessionStorage.setItem(
          'userBalance',
          ethers.utils.formatEther(balance)
        );
        setUserData({
          userAddress: account[0],
          userBalance: ethers.utils.formatEther(balance),
        });
        success();
        setConnectStatus('connected');
        sessionStorage.setItem('isConnected', 'connected');
      } catch (error) {
        throwError();
        setConnectStatus('disconnected');
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage('Meta Mask not detected');
    }
  };

  const getShortAddress = (address) => {
    if (address !== '') {
      return (
        address.substr(0, 4) +
        '...' +
        address.substr(address.length - 4, address.length - 1)
      );
    }
  };

  const getSessionData = (data) => {
    return sessionStorage.getItem(data);
  };

  // if user switches the wallet then it will update accordingly
  // window.ethereum.on('accountsChanged', connectWalletHandler);

  useEffect(() => {
    setUserData({
      userAddress: getSessionData('userAddress'),
      userBalance: getSessionData('userBalance'),
    });
    setConnectStatus(getSessionData('isConnected') || 'disconnected');
  }, []);
  return (
    <div className='header-container'>
      <div className='header'>
        {contextHolder}
        <div className='logoIcon'>
          <Logo />
          <Title className='title' level={3}>
            Ether JS
          </Title>
        </div>
        {connectStatus === 'connected' ? (
          <div className='balanceCard'>
            <Tag className='tag' color='blue'>
              {Number(userData?.userBalance).toFixed(4)} ETH
            </Tag>
            <Tag className='tag' color='blue'>
              {getShortAddress(userData?.userAddress)}
            </Tag>
          </div>
        ) : (
          <Button
            onClick={connectWalletHandler}
            loading={connectStatus === 'connecting'}
          >
            {connectStatus === 'connecting' ? 'connecting...' : 'connect'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
