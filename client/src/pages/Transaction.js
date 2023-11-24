import TransactionList from '../components/Transaction/TransactionList';

// ==================================================

const TransactionPage = () => {
  return (
    <section className='container section-transaction'>
      <h2>Your Transactions</h2>

      <TransactionList />
    </section>
  );
};

export default TransactionPage;
