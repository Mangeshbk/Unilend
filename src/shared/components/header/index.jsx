import React, { useState } from 'react';
import Logo from '../../icons/Logo';
import { Button, message, Tag, Typography } from 'antd';
import { ethers } from 'ethers';
import './index.scss';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../rootStore/store';
import { walletActions } from '../store/reducer';
const { Title } = Typography;

function Header() {
  const [connectStatus, setConnectStatus] = useState('disconnected');
  const [errorMessage, setErrorMessage] = useState('');

  const { balance } = useSelector((state) => state?.wallet);
  const { address } = useSelector((state) => state?.wallet);

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

        dispatch(walletActions.setAddress(account[0]));
        dispatch(walletActions.setBalance(ethers.utils.formatEther(balance)));
        dispatch(walletActions.setIsConnected('connected'));

        success();
        setConnectStatus('connected');
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
              {Number(balance).toFixed(4)} ETH
            </Tag>
            <Tag className='tag' color='blue'>
              {getShortAddress(address)}
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
