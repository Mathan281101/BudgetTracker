import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import TransactionForm from '../components/TransactionForm';
import { useBudget, TransactionType, AccountName } from '../context/BudgetContext';
import { useNavigation } from '@react-navigation/native';

const AddTransactionScreen: React.FC = () => {
    const { addTransaction } = useBudget();
    const navigation = useNavigation();

    const [account, setAccount] = useState<string>('');
    const [type, setType] = useState<TransactionType>('income');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');

    const handleAddTransaction = () => {
        if (!account || !amount) {
            Alert.alert('Error', 'Please select an account and enter an amount');
            return;
        }

        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0) {
            Alert.alert('Error', 'Please enter a valid amount');
            return;
        }

        addTransaction({
            id: Date.now().toString(),
            account: account as AccountName,
            type,
            amount: amt,
            date: new Date().toISOString().split('T')[0],
            note,
            category,
        });

        // Reset form
        setAccount('');
        setAmount('');
        setNote('');
        setCategory('');

        // Optional: Navigate back or show success
        Alert.alert('Success', 'Transaction added successfully', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <View style={styles.container}>
            <TransactionForm
                account={account}
                setAccount={setAccount}
                type={type}
                setType={setType}
                amount={amount}
                setAmount={setAmount}
                note={note}
                setNote={setNote}
                category={category}
                setCategory={setCategory}
                addTransaction={handleAddTransaction}
            />
        </View>
    );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
});
