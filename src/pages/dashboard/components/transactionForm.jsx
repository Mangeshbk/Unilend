import { Button, Form, Input, Typography } from 'antd';
import { ethers, providers } from 'ethers';
import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';

const { Title } = Typography;

const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
// const MyFormItemGroup = ({ prefix, children }) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatPath = React.useMemo(
//     () => [...prefixPath, ...toArr(prefix)],
//     [prefixPath, prefix]
//   );
//   return (
//     <MyFormItemContext.Provider value={concatPath}>
//       {children}
//     </MyFormItemContext.Provider>
//   );
// };
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

function TransactionForm() {
  // const { address } = useSelector((state) => state?.wallet);

  const makePayment = async (data) => {
    const params = [
      {
        from: 'address',
        to: data['receiver wallet'],
        gasLimit: Number(210000).toString(16),
        value: Number(Number(data.amount) * 10 ** 18).toString(16),
      },
    ];

    try {
      // set load true;
      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params,
      });
      console.log('TX', tx);
      const provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/cc75fe1364f24987a12955bf51c49a73'
      );
      const minedTx = await provider.getTransaction(tx);
      // const minedTx = await tx.wait(); // show waiting till transaction completes;
      console.log('MIN_TX', minedTx);
      // setLoading false;
      // close modal
      //
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const onFromSubmit = (value) => {
    console.log(value);
    makePayment(value);
    // do the transactions
    // close the modal
  };
  return (
    <div className='transactionForm'>
      <Title level={4}>Send your Ethereum</Title>
      <Form name='form_item_path' layout='vertical' onFinish={onFromSubmit}>
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

        <Button className='submit' type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default TransactionForm;
