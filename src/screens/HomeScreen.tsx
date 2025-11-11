import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TransactionForm from '../components/TransactionForm';
import AccountBalances from '../components/AccountBalances';
import TransactionTable from '../components/TransactionTable';

type AccountName = string;
type TransactionType = 'income' | 'expense';

type Transaction = {
  id: string;
  account: AccountName;
  type: TransactionType;
  amount: number;
  date: string;
  note: string;
};

type FinancialData = {
  balances: Record<AccountName, number>;
  transactions: Transaction[];
};

const HomeScreen: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    balances: { IOB: 1000, SBI: 1300, IndianBank: 5000, PostOffice: 20000 },
    transactions: [],
  });

  const [account, setAccount] = useState('');
  const [type, setType] = useState<TransactionType>('income');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const totalBalance = Object.values(financialData.balances).reduce((sum, val) => sum + val, 0);

  const addTransaction = () => {
    if (!account || !amount) return;

    const amt = parseFloat(amount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      account,
      type,
      amount: amt,
      date: new Date().toISOString().split('T')[0],
      note,
    };

    setFinancialData((prev) => {
      const updatedBalance = type === 'income' ? (prev.balances[account] || 0) + amt : (prev.balances[account] || 0) - amt;
      return { balances: { ...prev.balances, [account]: updatedBalance }, transactions: [newTransaction, ...prev.transactions] };
    });

    setAccount(''); setAmount(''); setNote('');
  };

  const [sortField, setSortField] = useState<'date' | 'amount' | 'type' | 'account'>('date');
  const [sortAsc, setSortAsc] = useState(false);

  const sortTransactions = [...financialData.transactions].sort((a, b) => {
    if (sortField === 'date') return sortAsc ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortField === 'amount') return sortAsc ? a.amount - b.amount : b.amount - a.amount;
    if (sortField === 'type') return sortAsc ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
    return 0;
  });

  const toggleSort = (field: 'date' | 'amount' | 'type' | 'account') => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💰 Money Tracker</Text>
      <Text style={styles.netWorth}>Net Worth: ₹{totalBalance}</Text>

      <TransactionForm
        account={account} setAccount={setAccount}
        type={type} setType={setType}
        amount={amount} setAmount={setAmount}
        note={note} setNote={setNote}
        addTransaction={addTransaction}
      />

      <AccountBalances balances={financialData.balances} />

      <TransactionTable transactions={sortTransactions} sortField={sortField} sortAsc={sortAsc} toggleSort={toggleSort} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  netWorth: { textAlign: 'center', fontSize: 16, color: '#334155', marginBottom: 16 },
});
