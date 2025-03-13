import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';

const CancelSubscriptionDialog = ({ visible, onClose, onCancel, loading }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.dialogBox}>
                    <Text style={styles.title}>Cancel Your Subscription?</Text>
                    <Text style={styles.description}>
                        Are you sure you want to cancel your subscription? You'll continue to have access until the end of your current billing period.
                    </Text>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>Keep Subscription</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={onCancel}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.confirmText}>Yes, Cancel Subscription</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cancelSubscriptionButton: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogBox: {
        // width: 300,
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    footer: {
        width: '100%',
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 50,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#ccc',
        marginTop: 10
    },
    cancelText: {
        color: '#333',
        fontWeight: 'bold',
    },
    confirmButton: {
        paddingVertical: 10,
        paddingHorizontal: 50,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'red',
        marginTop: 10
    },
    confirmText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CancelSubscriptionDialog;