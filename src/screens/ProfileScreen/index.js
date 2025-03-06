import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles'

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Profile Settings</Text>
          <View style={styles.card}>
            <Text style={styles.subHeader}>Subscription Details</Text>
            <Text style={styles.description}>Your current plan and subscription status</Text>
            <View style={{ backgroundColor: 'rgb(250,250,250)', padding: 20, borderRadius: 20 }}>
              <View style={styles.planContainer}>
                <Text style={styles.planName}>Pathfinder Plan</Text>
                <View style={styles.trialBadge}>
                  <Text style={styles.trialText}>Trial Period</Text>
                </View>
              </View>
              <Text style={styles.planPrice}>$6.99/month</Text>
              <View style={styles.memberSinceContainer}>
                <Text style={styles.memberSince}>📅 Member Since </Text>
                <Text style={[styles.memberSince1, { paddingLeft: 25 }]}>March 3, 2025</Text>
              </View>
              <View style={styles.featuresList}>
                <Text style={styles.feature}>Plan Feature : </Text>

                <Text style={styles.feature}>✔ 1 Active Habit</Text>
                <Text style={styles.feature}>✔ Basic AI Insights</Text>
                <Text style={styles.feature}>✔ Daily SMS Reminders</Text>
                <Text style={styles.feature}>✔ 7-Day Free Trial</Text>
              </View>
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeText}>Upgrade to Trailblazer</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 30, marginTop: 30 }}>
            <Text style={styles.title}>Account Settings</Text>
            <Text style={styles.subtitle}>Manage your account settings and preferences</Text>

            <View style={styles.infoCard}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              <Text style={styles.text}>Username: <Text style={styles.highlightText}>Abcd</Text></Text>
              <Text style={styles.text}>Phone Status: <Text style={styles.warningText}>Not Verified</Text></Text>
            </View>

            <View style={[styles.infoCard, { marginTop: 20 }]}>
              <Text style={styles.sectionTitle}>Change Password</Text>
              <Text style={styles.inputLabel}>Current Password</Text>
              <TextInput style={styles.textField} placeholder="Enter your current password" secureTextEntry />
              <Text style={styles.inputLabel}>New Password</Text>
              <TextInput style={styles.textField} placeholder="Enter new password" secureTextEntry />
              <Text style={styles.hintText}>
                Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.
              </Text>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <TextInput style={styles.textField} placeholder="Confirm New Password" secureTextEntry />
            </View>
            <View style={[styles.infoCard, { marginTop: 20 }]}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput style={styles.textField} placeholder="+123456789" secureTextEntry />
            </View>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeText}>Update Profile</Text>
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', width: '100%', paddingTop:30 }} />
            <Text style={styles.upgradeText1}>Danger Zone </Text>
            <TouchableOpacity style={styles.upgradeButton1}>
              <Text style={styles.upgradeText}>Delete Account</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;