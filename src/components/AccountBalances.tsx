import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  balances: Record<string, number>;
};

const AccountBalances: React.FC<Props> = ({ balances }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Account Balances</Text>
      {Object.entries(balances).map(([acc, bal]) => (
        <View key={acc} style={styles.balanceRow}>
          <Text style={styles.accountName}>{acc}</Text>
          <Text
            style={[
              styles.balanceAmount,
              { color: bal > 0 ? '#22c55e' : bal < 0 ? '#ef4444' : '#94a3b8' },
            ]}
          >
            ₹{bal.toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default AccountBalances;

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  accountName: { fontWeight: '500', color: '#334155' },
  balanceAmount: { fontWeight: 'bold' },
});
