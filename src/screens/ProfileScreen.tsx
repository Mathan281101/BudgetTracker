import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Switch } from 'react-native';

const ProfileScreen: React.FC = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const handleEditProfile = () => {
        Alert.alert('Edit Profile', 'Profile editing functionality to be implemented.');
    };

    const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
    const toggleDarkMode = () => setDarkModeEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                    {/* Placeholder for Profile Picture */}
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }} // You might want to use a local asset or a better placeholder
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.editIconBadge} onPress={handleEditProfile}>
                        <Text style={styles.editIconText}>✏️</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.userEmail}>john.doe@example.com</Text>
            </View>

            <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Settings</Text>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Notifications</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={toggleNotifications}
                        value={notificationsEnabled}
                    />
                </View>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Dark Mode</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={toggleDarkMode}
                        value={darkModeEnabled}
                    />
                </View>

                <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('About', 'Budget Tracker App v1.0.0')}>
                    <Text style={styles.settingLabel}>About App</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Logout', 'Are you sure?', [{ text: 'Cancel' }, { text: 'Logout' }])}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
    header: { alignItems: 'center', marginBottom: 30 },
    profileImageContainer: { position: 'relative', marginBottom: 12 },
    profileImage: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#cbd5e1' },
    editIconBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3b82f6',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    editIconText: { fontSize: 14, color: 'white' },
    userName: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
    userEmail: { fontSize: 16, color: '#64748b' },
    settingsSection: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#334155' },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    settingLabel: { fontSize: 16, color: '#1e293b' },
    chevron: { fontSize: 20, color: '#94a3b8' },
    logoutButton: { backgroundColor: '#fee2e2', padding: 15, borderRadius: 12, alignItems: 'center' },
    logoutText: { color: '#ef4444', fontWeight: 'bold', fontSize: 16 },
});
