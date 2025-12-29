import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Props = {
  account: string;
  setAccount: (value: string) => void;
  type: 'income' | 'expense';
  setType: (value: 'income' | 'expense') => void;
  amount: string;
  setAmount: (value: string) => void;
  note: string;
  setNote: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  addTransaction: () => void;
};

const TransactionForm: React.FC<Props> = ({
  account,
  setAccount,
  type,
  setType,
  amount,
  setAmount,
  note,
  setNote,
  category,
  setCategory,
  addTransaction,
}) => {
  return (
    <View style={styles.form}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={account}
          onValueChange={(value) => setAccount(value)}
          style={styles.pickerInput}
        >
          <Picker.Item label="Select Account" value="" />
          <Picker.Item label="IOB" value="IOB" />
          <Picker.Item label="SBI" value="SBI" />
          <Picker.Item label="Indian Bank" value="IndianBank" />
          <Picker.Item label="Post Office" value="PostOffice" />
        </Picker>
      </View>

      <TextInput
        placeholder="Category (e.g., Food, Rent, Salary)"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        placeholder="Amount"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="Note"
        style={styles.input}
        value={note}
        onChangeText={setNote}
      />

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'income' && styles.activeIncome]}
          onPress={() => setType('income')}
        >
          <Text style={styles.typeText}>Income</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeButton, type === 'expense' && styles.activeExpense]}
          onPress={() => setType('expense')}
        >
          <Text style={styles.typeText}>Expense</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addTransaction}>
        <Text style={styles.addButtonText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionForm;

const styles = StyleSheet.create({
  form: { backgroundColor: 'white', borderRadius: 8, padding: 12, marginBottom: 16 },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  typeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  typeButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
  },
  activeIncome: { backgroundColor: '#86efac' },
  activeExpense: { backgroundColor: '#fca5a5' },
  typeText: { fontWeight: 'bold', color: '#1e293b' },
  addButton: { backgroundColor: '#3b82f6', padding: 12, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  pickerContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  pickerInput: { fontSize: 14, paddingVertical: 10, color: '#1e293b' },
});
