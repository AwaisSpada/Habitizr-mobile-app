import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from "react-native";
import { showMessage } from "react-native-flash-message"; // You can use this for error or success messages
import { handleForgotPassword } from '../config/authService';

const ForgotPasswordModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email.trim())) {
      showMessage({
        message: "Error",
        description: "Please enter a valid email address.",
        type: "danger",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await handleForgotPassword(email)
      console.log("Password reset for:", response);

    if (response.status === 200) {
        onClose();
        setEmail('')
  
        showMessage({
          message: "Success",
          description: "Password reset link has been sent to your email.",
          type: "success",
        });
  
      } else {
        // Handle non-success status codes
        throw new Error(`Error: ${res.status}`);
      }
    } catch (error) {
      showMessage({
        message: "Error",
        description: "Something went wrong. Please try again.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Forgot Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handlePasswordReset}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitText}>Reset Password</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={{paddingTop:10}}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    minHeight: 250,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    width: "95%",
    backgroundColor: "#1c5c84",
    padding: 10,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 25
  },
  submitText: {
    color: "white",
    fontSize: 16,
  },
  closeText: {
    color: "#888",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default ForgotPasswordModal;
