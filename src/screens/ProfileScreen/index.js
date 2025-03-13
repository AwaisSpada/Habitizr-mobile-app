import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, ActivityIndicator, Modal } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import { fetchUser, updateProfile, cancelSubscription, sendNotification } from '../../config/authService';
import tiers from "../../lib/tiers";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FlashMessage, { showMessage } from "react-native-flash-message";
import SubscriptionComparison from '../../components/SubscriptionComparison'
import CancelSubscriptionDialog from '../../components/CancelSubscription'
import styles from './styles';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const { TIERS, PRICING_TIERS, isWithinTrialPeriod } = tiers;

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (isTrialExpired) {
      setIsUpgrading(true); // Show modal if trial expired
    }
  }, [isTrialExpired]);

  const getUser = async () => {
    try {
      const response = await fetchUser();
      console.log('setUser', response)
      setUser(response);
      setPhoneNumber(response?.phoneNumber || '');
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  // Phone Number Validation
  const isValidPhoneNumber = (phone) => {
    return /^\+?\d{10,15}$/.test(phone);
  };

  const handleUpdateProfile = async () => {
    if (!currentPassword) {
      showMessage({ message: "Error", description: 'Current password is required.', type: "danger" });
      return;
    }

    if (!newPassword) {
      showMessage({
        message: "New password is required.",
        type: "danger"
      });
      return;
    } else if (!isValidPassword(newPassword)) {
      showMessage({
        message: "Error",
        description: 'New password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.',
        type: "danger"
      });
    }

    if (newPassword !== confirmPassword) {
      showMessage({ message: "Error", description: 'New password and confirm password must match.', type: "danger" });
      return;
    }

    if (phoneNumber === '') {
      showMessage({ message: "Error", description:'Enter a valid phone number', type: "danger" });
      return;
    }

    setIsLoading(true);

    try {
      const updatedUser = {
        phoneNumber,
        currentPassword,
        newPassword
      };

      const response = await updateProfile(updatedUser);
      console.log('profile response', response)
      if (response) {
        showMessage({ message: "Profile updated successfully!", type: "success" });
      } else {
        showMessage({ message: response?.message || "Failed to update profile.", type: "danger" });
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      showMessage({ message: "Error", description: 'An error occurred while updating profile.', type: "danger" });
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const handleDeleteAccount = async () => {
    showMessage({ message: "Success", description: 'Your account has been permanently deleted', type: "success" });
    setModalVisible(false)
  };

  // Compute subscription details
  const isPathfinderUser = user?.packageType === TIERS.PATHFINDER;
  const isInTrialPeriod = user?.createdAt ? isWithinTrialPeriod(new Date(user.createdAt)) : false;
  const currentPlan = PRICING_TIERS[user?.packageType || TIERS.PATHFINDER];
  const isTrialExpired = !isInTrialPeriod && user?.packageType === TIERS.PATHFINDER;

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    // Implement upgrade logic here
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true)
    try {
      const response = await cancelSubscription(); // Fix: Call correct API
      console.log('cancelSubscription response:', response); // Debugging log

      if (response.success) {
        showMessage({
          message: 'Success',
          description: 'Your subscription has been canceled. You will have access until the end of your billing period.',
          type: "success"
        });
      } else {
        showMessage({
          message: 'Error',
          description: response.message || 'Failed to cancel subscription.',
          type: "danger"
        });
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      showMessage({
        message: 'Error',
        description: error.message || 'An error occurred while canceling subscription.',
        type: "danger"
      });
    } finally {
      setIsLoading(false)
      setVisible(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.header}>Profile Settings</Text>

          <View style={styles.card}>
            <Text style={styles.subHeader}>Subscription Details</Text>
            <Text style={styles.description}>Your current plan and subscription status</Text>
            <View style={{ backgroundColor: 'rgb(250,250,250)', padding: 20, borderRadius: 20 }}>
              <View style={styles.planContainer}>
                <Text style={styles.planName}>{currentPlan.name} Plan</Text>
                <View style={styles.trialBadge}>
                  <Text style={styles.trialText}>Trial Period</Text>
                </View>
              </View>
              <Text style={styles.planPrice}>${currentPlan.price}/month</Text>
              <View style={styles.memberSinceContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="calendar" size={24} color="grey" style={{ top: 5, right: 5 }} />
                  <Text style={styles.memberSince}>Member Since </Text>
                </View>
                <Text style={[styles.memberSince1, { paddingLeft: 25 }]}>
                  {user?.createdAt ? new Date(user.createdAt).toDateString() : 'N/A'}
                </Text>
              </View>
              <View style={styles.featuresList}>
                <Text style={styles.feature}>Plan Features : </Text>
                {currentPlan?.features?.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color="#4A90E2" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              {isPathfinderUser ? (
                <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade} disabled={isUpgrading}>
                  <Text style={styles.upgradeText}>{isUpgrading ? 'Upgrading...' : 'Upgrade to Trailblazer'}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.cancelButton} onPress={() => setVisible(true)}>
                  <Text style={styles.cancelText}>Cancel Subscription</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.accountContainer}>
            <Text style={styles.title}>Account Settings</Text>
            <Text style={styles.subtitle}>Manage your account settings and preferences</Text>

            <View style={styles.infoCard}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              <Text style={styles.text}>Username: <Text style={styles.highlightText}>{user?.username}</Text></Text>
              <Text style={styles.text}>Phone Status: <Text style={[styles.warningText, { color: user?.phoneVerified ? 'green' : '#E69A00' }]}>{user?.phoneVerified ? "Verified" : "Not Verified"}</Text></Text>
            </View>

            <View style={[styles.infoCard, { marginTop: 20 }]}>
              <Text style={styles.sectionTitle}>Change Password</Text>
              <Text style={styles.inputLabel}>Current Password</Text>
              <TextInput
                style={styles.textField}
                placeholder="Enter your current password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <Text style={styles.inputLabel}>New Password</Text>
              <TextInput
                style={styles.textField}
                placeholder="Enter new password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <Text style={styles.hintText}>
                Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.
              </Text>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <TextInput
                style={styles.textField}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <View style={[styles.infoCard, { marginTop: 20 }]}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.textField}
                placeholder="+123456789"
                value={phoneNumber}
                keyboardType="phone-pad"
                onChangeText={setPhoneNumber}
              />
            </View>
            <TouchableOpacity style={styles.upgradeButton} onPress={handleUpdateProfile}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.upgradeText}>Update Profile</Text>
              )}
            </TouchableOpacity>

            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', width: '100%', paddingTop: 30 }} />
            <Text style={styles.upgradeText1}>Danger Zone </Text>
            <TouchableOpacity style={styles.upgradeButton1} onPress={() => setModalVisible(true)}>
              <Text style={styles.upgradeText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Are you absolutely sure?</Text>
                <Text style={styles.modalMessage}>
                  This action cannot be undone. This will permanently delete your
                  account and remove all of your data from our servers.
                </Text>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                  <Text style={styles.deleteText}>Delete Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <SubscriptionComparison visible={isUpgrading} onClose={() => setIsUpgrading(false)} />
      <CancelSubscriptionDialog
        visible={visible}
        onClose={() => setVisible(false)}
        onCancel={() => handleCancelSubscription()}
        loading={isLoading}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
