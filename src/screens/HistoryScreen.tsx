import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useBudget } from '../context/BudgetContext';
import TransactionTable from '../components/TransactionTable';

const HistoryScreen: React.FC = () => {
    const { financialData } = useBudget();
    const [sortField, setSortField] = useState<'date' | 'amount' | 'type' | 'account' | 'category'>('date');
    const [sortAsc, setSortAsc] = useState(false);

    const transactions = [...financialData.transactions].sort((a, b) => {
        if (sortField === 'date') return sortAsc ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortField === 'amount') return sortAsc ? a.amount - b.amount : b.amount - a.amount;
        if (sortField === 'type') return sortAsc ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
        if (sortField === 'account') return sortAsc ? a.account.localeCompare(b.account) : b.account.localeCompare(a.account);
        if (sortField === 'category') return sortAsc ? (a.category || '').localeCompare(b.category || '') : (b.category || '').localeCompare(a.category || '');
        return 0;
    });

    const toggleSort = (field: 'date' | 'amount' | 'type' | 'account' | 'category') => {
        if (sortField === field) setSortAsc(!sortAsc);
        else { setSortField(field); setSortAsc(true); }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transaction History</Text>
            <TransactionTable
                transactions={transactions}
                sortField={sortField}
                sortAsc={sortAsc}
                toggleSort={toggleSort}
            />
        </View>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});
