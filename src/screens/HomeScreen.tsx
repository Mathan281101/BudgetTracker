import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AccountBalances from '../components/AccountBalances';
import TransactionTable from '../components/TransactionTable';
import { useBudget } from '../context/BudgetContext';

const HomeScreen: React.FC = () => {
  const { financialData, isLoading } = useBudget();
  const [sortField, setSortField] = useState<'date' | 'amount' | 'type' | 'account' | 'category'>('date');
  const [sortAsc, setSortAsc] = useState(false);

  // Show only recent 5 transactions for dashboard
  const recentTransactions = [...financialData.transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Dashboard doesn't really need duplicate sorting logic if it's just "Recent", 
  // but if user wants to sort the preview, we can keep it. 
  // Let's just keep it simple: "Recent Transactions" (fixed sort by date desc).

  const totalBalance = Object.values(financialData.balances).reduce((sum, val) => sum + val, 0);

  if (isLoading) {
    return <View style={styles.center}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.netWorth}>Net Worth: ₹{totalBalance.toLocaleString()}</Text>

      <AccountBalances balances={financialData.balances} />

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      {/* 
          We use TransactionTable here but we might want to disable sorting for the dashboard 
          or just pass a dummy toggleSort since it's just a preview. 
          Actually, we can just let it be static or pass a no-op 
      */}
      <TransactionTable
        transactions={recentTransactions}
        sortField="date"
        sortAsc={false}
        toggleSort={() => { }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  netWorth: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 16, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, marginTop: 16, color: '#334155' },
});
