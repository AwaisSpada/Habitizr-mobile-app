import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from 'react-native-vector-icons/Feather'
import HabitCreationModal from "../../components/HabitCreationModal"; // Import the habit creation modal
import styles from "./styles";

const Dashboard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onClose = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>habitizr</Text>
        <TouchableOpacity style={styles.upgradeButton}>
          <Icon name="crown" size={16} color="white" />
          <Text style={styles.upgradeText}> Upgrade to Trailblazer</Text>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
            <Icon name="account-circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Icon name="logout" size={24} color="black" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Stats Cards */}
        <View style={styles.statCard}>
          <Text style={styles.cardTitle}>Total Habits</Text>
          <Text style={styles.cardValue}>0</Text>
          <Text style={styles.cardSubtitle}>Active habit tracking</Text>
          <Icon name="chart-line" style={styles.cardIcon} />
        </View>

        <View style={styles.statCard}>
          <Text style={styles.cardTitle}>Current Streak</Text>
          <Text style={styles.cardValue}>0 days</Text>
          <Text style={styles.cardSubtitle}>Consecutive days completed</Text>
          <Icon name="medal" style={styles.cardIcon} />
        </View>

        <View style={styles.statCard}>
          <Text style={styles.cardTitle}>Completion Rate</Text>
          <Text style={styles.cardValue}>0%</Text>
          <Text style={styles.cardSubtitle}>Success rate for AI check-ins</Text>
          <Icon name="target" style={styles.cardIcon} />
        </View>

        <View style={styles.statCard}>
          <Text style={styles.cardTitle}>Progress to 66</Text>
          <Text style={styles.cardValue}>0%</Text>
          <Text style={styles.cardSubtitle}>Average progress to 66 days</Text>
          <Icon name="chart-bar" style={styles.cardIcon} />
        </View>

        {/* Your Habits Section */}
        <View style={styles.habitsContainer}>
          <Text style={styles.habitsTitle}>Your Habits</Text>
          <Text style={styles.habitsSubtitle}>
            Track and manage your daily habits to build a better routine.
          </Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingTop: 10 }} />
          <Text style={styles.phoneStatus}>
            Phone Status: <Text style={styles.notVerified}>Not Verified</Text>
          </Text>

          {/* No Habits Card */}
          <View style={styles.noHabitsCard}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Icon name="plus" size={24} color="rgb(53,101,208)" />
            </TouchableOpacity>
            <Text style={styles.noHabitsTitle}>No habits yet</Text>
            <Text style={styles.noHabitsDescription}>
              Start building better habits today. Click the "+" button above to create your first habit.
            </Text>
          </View>
        </View>

        <Text style={styles.title}>Achievement Badges</Text>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Milestones</Text>
          <Text style={styles.description}>Major accomplishments in your journey</Text>

          <View style={styles.badge}>
            <Feather name="lock" size={30} style={styles.icon} />
            <View>
              <Text style={styles.badgeTitle}>Habit Pioneer</Text>
              <Text style={styles.badgeDescription}>Create your first habit</Text>
            </View>
          </View>

          <View style={styles.badge}>
            <Feather name="lock" size={30} style={styles.icon} />
            <View>
              <Text style={styles.badgeTitle}>Perfect Week</Text>
              <Text style={[styles.badgeDescription, { width: '90%' }]} numberOfLines={2}>Complete all habits for 7 consecutive days</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>Analytics & Insights</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Habit Insights</Text>
          <Text style={styles.cardSubtitle}>Select a habit to view AI-powered insights</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', width: '100%' }} />
          <View style={styles.noHabitContainer}>
            <Text style={styles.noHabitText}>No habit selected</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.reportButton}>
          <Icon name="alert-circle-outline" size={16} color="#6C7C9B" />
          <Text style={styles.reportText}> Report a Problem</Text>
        </TouchableOpacity>
      </ScrollView>
      {
        modalVisible ? <HabitCreationModal visible={modalVisible} onClose={() => onClose()} /> : null
      }

    </SafeAreaView>
  );
};

export default Dashboard;
