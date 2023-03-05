import React from 'react';
import './index.scss';
import TransactionForm from './components/transactionForm';
import etherJsImg from '../../assets/images/etherJs.webp';
import TransactionHistory from './components/transactionHistory';

function Dashboard() {
  return (
    <div className='dashboardContainer'>
      <div className='details'>
        <img className='etherImg' src={etherJsImg} alt='' />
        <TransactionForm />
      </div>

      <TransactionHistory />
    </div>
  );
}

export default Dashboard;
