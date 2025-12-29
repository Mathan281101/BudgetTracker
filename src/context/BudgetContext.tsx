import React, { createContext, useReducer, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Types ---

export type AccountName = 'IOB' | 'SBI' | 'IndianBank' | 'PostOffice';

export type TransactionType = 'income' | 'expense';

export type Transaction = {
    id: string;
    account: AccountName;
    type: TransactionType;
    amount: number;
    date: string;
    note: string;
    category: string; // Added Category
};

export type FinancialData = {
    balances: Record<AccountName, number>;
    transactions: Transaction[];
};

type Action =
    | { type: 'LOAD_DATA'; payload: FinancialData }
    | { type: 'ADD_TRANSACTION'; payload: Transaction }
    | { type: 'DELETE_TRANSACTION'; payload: string };

type BudgetContextType = {
    financialData: FinancialData;
    addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    isLoading: boolean;
};

// --- Initial State ---

const initialState: FinancialData = {
    balances: { IOB: 0, SBI: 0, IndianBank: 0, PostOffice: 0 },
    transactions: [],
};

// --- Reducer ---

const budgetReducer = (state: FinancialData, action: Action): FinancialData => {
    switch (action.type) {
        case 'LOAD_DATA':
            return action.payload;

        case 'ADD_TRANSACTION': {
            const { account, amount, type } = action.payload;
            const currentBalance = state.balances[account] || 0;
            const newBalance = type === 'income' ? currentBalance + amount : currentBalance - amount;

            return {
                ...state,
                balances: {
                    ...state.balances,
                    [account]: newBalance,
                },
                transactions: [action.payload, ...state.transactions],
            };
        }

        case 'DELETE_TRANSACTION': {
            const transactionToDelete = state.transactions.find((t) => t.id === action.payload);
            if (!transactionToDelete) return state;

            const { account, amount, type } = transactionToDelete;
            const currentBalance = state.balances[account] || 0;
            // Reverse logic to restore balance
            const newBalance = type === 'income' ? currentBalance - amount : currentBalance + amount;

            return {
                ...state,
                balances: {
                    ...state.balances,
                    [account]: newBalance,
                },
                transactions: state.transactions.filter((t) => t.id !== action.payload),
            };
        }

        default:
            return state;
    }
};

// --- Context ---

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};

// --- Provider ---

const STORAGE_KEY = '@budget_tracker_data_v1';

export const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [financialData, dispatch] = useReducer(budgetReducer, initialState);
    const [isLoading, setIsLoading] = React.useState(true);

    // Load data on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
                if (jsonValue != null) {
                    dispatch({ type: 'LOAD_DATA', payload: JSON.parse(jsonValue) });
                } else {
                    // Initialize with some default dummy data if needed, or keep empty
                    // For now, let's keep the initial state (all 0s) or maybe the user's hardcoded ones?
                    // Let's use the user's hardcoded ones as default if nothing exists
                    dispatch({
                        type: 'LOAD_DATA', payload: {
                            balances: { IOB: 1000, SBI: 1300, IndianBank: 5000, PostOffice: 20000 },
                            transactions: []
                        }
                    });
                }
            } catch (e) {
                console.error("Failed to load data", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // Save data on change
    useEffect(() => {
        if (!isLoading) {
            const saveData = async () => {
                try {
                    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(financialData));
                } catch (e) {
                    console.error("Failed to save data", e);
                }
            };
            saveData();
        }
    }, [financialData, isLoading]);

    const addTransaction = (transaction: Transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    };

    const deleteTransaction = (id: string) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    };

    return (
        <BudgetContext.Provider value={{ financialData, addTransaction, deleteTransaction, isLoading }}>
            {children}
        </BudgetContext.Provider>
    );
};
