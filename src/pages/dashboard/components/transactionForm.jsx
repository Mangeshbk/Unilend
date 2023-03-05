import { Button, Form, Input, Typography, message } from 'antd';
import { ethers } from 'ethers';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

const { Title } = Typography;

const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

function TransactionForm() {
  // const { address } = useSelector((state) => state?.wallet);
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const throwWarning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Please connect to the wallet',
    });
  };
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Transaction is successful',
    });
  };

  const emptyFormError = () => {
    messageApi.open({
      type: 'warning',
      content: 'Please fill the required field',
    });
  };

  const makePayment = async (data) => {
    const params = [
      {
        from: sessionStorage.getItem('userAddress'),
        to: data['receiver wallet'],
        gasLimit: Number(210000).toString(16),
        value: Number(Number(data.amount) * 10 ** 18).toString(16),
      },
    ];

    try {
      setLoader(true);
      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params,
      });
      const provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/cc75fe1364f24987a12955bf51c49a73'
      );
      const minedTx = await provider.getTransaction(tx);

      setLoader(false);
      success();
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const onFromSubmit = (value) => {
    if (sessionStorage.getItem('userAddress') === '') {
      throwWarning();
    }
    if (value['receiver wallet'] !== '' && value.amount !== '') {
      makePayment(value);
      form.resetFields();
    } else {
      emptyFormError();
    }
  };
  return (
    <div className='transactionForm'>
      {contextHolder}
      <Title level={4}>Send your Ethereum</Title>
      <Form
        name='form_item_path'
        layout='vertical'
        onFinish={onFromSubmit}
        form={form}
      >
        <MyFormItem
          name='receiver wallet'
          label='Receiver Wallet'
          // validateStatus='error'
          // help='Should be combination of numbers & alphabets'
        >
          <Input />
        </MyFormItem>
        <MyFormItem name='amount' label='Amount'>
          <Input />
        </MyFormItem>

        <Button
          loading={loader}
          className='submit'
          type='primary'
          htmlType='submit'
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default TransactionForm;
