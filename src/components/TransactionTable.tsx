import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type Transaction = {
  id: string;
  account: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  note: string;
};

type Props = {
  transactions: Transaction[];
  sortField: string;
  sortAsc: boolean;
  toggleSort: (field: 'date' | 'amount' | 'type' | 'account') => void;
};

const TransactionTable: React.FC<Props> = ({ transactions, sortField, sortAsc, toggleSort }) => {
  return (
    <View>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <TouchableOpacity style={styles.cell} onPress={() => toggleSort('date')}>
          <Text style={styles.headerText}>Date {sortField === 'date' ? (sortAsc ? '↑' : '↓') : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cell} onPress={() => toggleSort('account')}>
          <Text style={styles.headerText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cell} onPress={() => toggleSort('type')}>
          <Text style={styles.headerText}>Type {sortField === 'type' ? (sortAsc ? '↑' : '↓') : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cell} onPress={() => toggleSort('amount')}>
          <Text style={styles.headerText}>Amount {sortField === 'amount' ? (sortAsc ? '↑' : '↓') : ''}</Text>
        </TouchableOpacity>
        <View style={styles.cell}>
          <Text style={styles.headerText}>Note</Text>
        </View>
      </View>

      {/* Table Rows */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.account}</Text>
            <Text style={styles.cell}>{item.type}</Text>
            <Text style={[styles.cell, item.type === 'income' ? styles.incomeText : styles.expenseText]}>
              ₹{item.amount.toLocaleString()}
            </Text>
            <Text style={styles.cell}>{item.note}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TransactionTable;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cbd5e1',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  headerText: { fontWeight: 'bold', color: '#1e293b' },
  incomeText: { color: '#16a34a', fontWeight: 'bold', textAlign: 'center' },
  expenseText: { color: '#dc2626', fontWeight: 'bold', textAlign: 'center' },
});
