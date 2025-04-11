import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Modal, ActivityIndicator, FlatList, Alert, AppState } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from 'react-native-vector-icons/Feather'
import HabitCreationModal from "../../components/HabitCreationModal";
import HabitCard from "../../components/HabitCard";
import PhoneVerificationModal from "../../components/PhoneVerificationModal";
import { logoutUser, getHabits, newCreateHabit, deleteHabit, editHabit, habitInsights, startHabit, stopHabit } from '../../config/authService';
import { showMessage } from "react-native-flash-message";
import { AuthContext } from '../../context/AuthContext';
import * as Progress from "react-native-progress";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SubscriptionComparison from '../../components/SubscriptionComparison'
import { paymentStripe } from '../../config/authService';
import { useStripe } from '@stripe/stripe-react-native';
import styles from "./styles";

const Dashboard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState()
  const [visible, setVisible] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [selectPlan, setSelectPlan] = useState(null);

  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    fetchHabits();
  }, []);

  const activeHabits = habits.length;
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + (habit.completions?.length || 0),
    0
  );
  const totalYesResponses = habits.reduce(
    (sum, habit) => sum + (habit.completions?.filter((c) => c.completed)?.length || 0),
    0
  );
  const currentStreak = Math.max(0, ...habits.map((h) => h.currentStreak || 0));
  const completionRate = totalCompletions > 0 ? Math.round((totalYesResponses / totalCompletions) * 100) : 0;
  const overallProgress = activeHabits > 0 ? Math.round(habits.reduce((sum, h) => sum + h.progressToTarget, 0) / activeHabits) : 0;

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const response = await getHabits(); // Fetch habits from API
      console.log('get habhits', response)
      if (response) {
        setHabits(response); // Assuming response.data.habits is an array
      } else {
        showMessage({
          message: 'Error',
          description: "Failed to fetch habits",
          type: "danger"
        });
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setModalVisible(false)
  }

  const handleCreateHabit = async (newHabit) => {
    if (selectedHabit) {
      updateHabit(newHabit)
      // Edit existing habit
      // setHabits(habits.map(h => (h === selectedHabit ? newHabit : h)));
    } else {
      // Create new habit
      // setHabits([...habits, newHabit])
      setTimeout(() => {
        CreateNewHabit(newHabit)
      }, 1000);
    }
    setModalVisible(false);
    setSelectedHabit(null);
  };

  const CreateNewHabit = async (habitData) => {

    let habitObject = {
      name: habitData.habitName,
      description: habitData.description,
      frequency: habitData.frequency,
      reminderTime: habitData.reminderTime,
      timezone: habitData.timezone
    }

    const selectedDatesArray = habitData.selectedDates
    console.log('selectedDatesArray', selectedDatesArray)

    const datesArray = Object.keys(selectedDatesArray);

    const formattedData = {
      ...habitObject,
      // selectedDays: datesArray.map(date => new Date(date).getDay()), // Convert to weekday numbers
      selectedDays: datesArray
    };

    console.log('formattedData', formattedData)

    try {
      const result = await newCreateHabit(formattedData);
      if (result && result.status === 200) {
        showMessage({ message: "Success", description: 'Habit created successfully', type: "success" });
        await fetchHabits()
      }
    } catch (error) {
      console.error("Error creating habit:", error.message);
      showMessage({ message: "Error", description: 'Failed to create habit', type: "danger" });
    }
  };

  const updateHabit = async (updatedHabit) => {

    let habitObject = {
      name: updatedHabit.habitName,
      description: updatedHabit.description,
      frequency: updatedHabit.frequency,
      reminderTime: updatedHabit.reminderTime,
      timezone: updatedHabit.timezone
    }

    const selectedDatesArray = updatedHabit.selectedDates

    const datesArray = Object.keys(selectedDatesArray);

    const formattedData = {
      ...habitObject,
      selectedDays: datesArray,
    };

    // let formattedData = {
    //   name: "Muscles",
    //   description: "",
    //   frequency: "daily",
    //   selectedDays: [],
    //   reminderTime: "09:00",
    //   timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Added default timezone
    // }

    try {
      const result = await editHabit(habits[0].id, formattedData);
      console.log('result', result)
      if (result) {
        showMessage({ message: "Success", description: 'Habit Updated successfully', type: "success" });
        setSelectedHabit(null)
        await fetchHabits()
      }
    } catch (error) {
      console.error("Error creating habit:", error.message);
      showMessage({ message: "Error", description: "Failed to Update habit", type: "danger" });
    }
  };

  const handleEditHabit = (habit) => {
    setSelectedHabit(habit);
    setModalVisible(true);
  };

  const handleDeleteHabit = async (habitToDelete) => {
    // setHabits((prevHabits) => prevHabits.filter(habit => habit.id !== habitToDelete.id));
    try {
      const result = await deleteHabit(habitToDelete.id);
      if (result.success) {
        showMessage({ message: "Success", description: 'Habit Deleted successfully', type: "success" });
        setSelectedHabit(null)
        await fetchHabits()
      }
    } catch (error) {
      showMessage({ message: "Error", description: 'Failed to delete habit', type: "danger" });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log('response', response.status)
      if (response.status === 200 && response.data.message === "Logout successful") {
        setTimeout(() => props.navigation.navigate("Login"), 100);  // Delay navigation slightly
        await logout();
      } else {
        showMessage({
          message: "Error",
          description: 'Logout failed',
          type: "danger",
          icon: "danger",
        });
      }
    } catch (error) {
      showMessage({
        message: "Error",
        description: 'Logout failed. Please try again.',
        type: "danger",
        icon: "danger",
      });
    }
  };

  const handleHabitInsights = async (habhits) => {
    console.log('habhits', habhits)
    try {
      const response = await habitInsights(habhits.id);
      console.log('response', response)
      setInsights(response)
    } catch (error) {
      console.log('error', error)
    }
  };

  const handleOnStart = async (habit) => {
    setLoading(true)
    try {
      const response = await startHabit(habit?.id);
      console.log('response', response)
      if (response) {
        fetchHabits()
        setLoading(false)
        setPhoneModalVisible(false)
      }
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }

  const openStart = (habit) => {
    if (user?.phoneVerified) {
      handleOnStart(habit)
    } else {
      setPhoneModalVisible(true)
    }
  }

  const handleStopRunning = async (habit) => {
    setLoading(true)
    try {
      const response = await stopHabit(habit.id);
      console.log('handleStopRunning', response)
      if (response) {
        fetchHabits()
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }

  const handlePayment = async () => {
    setVisible(true)
  };

  const fetchPaymentIntent = async () => {
    setLoading(true)
    setIsLoading(true)
    try {
      let plan = {
        packageType: selectPlan,
      }

      const response = await paymentStripe(plan)
      console.log('get payment client scret', response)

      setClientSecret(response);
      initializePaymentSheet(response);
    } catch (error) {
      showMessage({
        message: "Error",
        description: error?.message || 'Something went wrong!',
        type: "danger",
      });
    } finally {
      setLoading(false)
      setIsLoading(false);
    }
  };

  const initializePaymentSheet = async (clientSecret) => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Your Business Name",
    });

    if (!error) {
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) {
        showMessage({
          message: "Error",
          description: paymentError.message || 'Payment Failed',
          type: "danger",
        });
      } else {
        showMessage({
          message: "Success",
          description: 'Payment completed!',
          type: "success",
        });
      }
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectPlan(plan)
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>habitizr</Text>
        {
          !(user?.packageType === "trailblazer" && user?.stripeSubscriptionStatus === "active") && (
            <TouchableOpacity style={styles.upgradeButton} onPress={handlePayment}>
              <Icon name="crown" size={16} color="white" />
              <Text style={styles.upgradeText}>Upgrade to Trailblazer</Text>
            </TouchableOpacity>
          )
        }
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
            <Icon name="account-circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="logout" size={24} color="black" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Stats Cards */}
        <View style={styles.statCard}>
          <Text style={styles.cardTitle}>Total Habits</Text>
          <Text style={styles.cardValue}>{activeHabits}</Text>
          <Text style={styles.cardSubtitle}>Active habit tracking</Text>
          <Icon name="chart-line" style={styles.cardIcon} />
        </View>

        <View style={styles.statCard}>
          <Text style={styles.cardTitle}>Current Streak</Text>
          <Text style={styles.cardValue}>{currentStreak} days</Text>
          <Text style={styles.cardSubtitle}>Consecutive days completed</Text>
          <Icon name="medal" style={styles.cardIcon} />
        </View>

        <View style={styles.statCard}>
          <Text style={styles.cardTitle}>Completion Rate</Text>
          <Text style={styles.cardValue}>{completionRate}%</Text>
          <Text style={styles.cardSubtitle}>Success rate for AI check-ins</Text>
          <Icon name="target" style={styles.cardIcon} />
        </View>

        <View style={styles.statCard}>
          <Text style={styles.cardTitle}>Progress to 66</Text>
          <Text style={styles.cardValue}>{overallProgress}%</Text>
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
            Phone Status: <Text style={[styles.notVerified, { color: user?.phoneVerified ? 'green' : '#E69A00' }]}>{user?.phoneVerified ? "Verified" : "Not Verified"}</Text>
          </Text>

          {
            habits.map((habit, index) => (
              <HabitCard
                key={index}
                habit={habit}
                onDelete={handleDeleteHabit}
                onEdit={() => handleEditHabit(habit)} // Pass the habit object
                onStart={() => openStart(habit)}
                onHabitInsights={handleHabitInsights}
                stopRunning={(habit) => handleStopRunning(habit)}
              />
            ))
          }
          {(
            (user?.packageType === "trailblazer" && habits?.length < 3) ||
            (user?.packageType === "pathfinder" && habits?.length < 1)
          ) && (
              <View style={styles.noHabitsCard}>
                <TouchableOpacity style={styles.addButton} onPress={() => {setModalVisible(true), setSelectedHabit('')}}>
                  <Icon name="plus" size={24} color="rgb(53,101,208)" />
                </TouchableOpacity>
                <Text style={styles.noHabitsTitle}>
                  {habits?.length > 0 ? 'Create new Habit' : 'No Habits yet'}
                </Text>
                <Text style={styles.noHabitsDescription}>
                  {habits?.length > 0
                    ? `You can create ${3 - habits?.length} more habits`
                    : 'Start building better habits today. Click the "+" button above to create your first habit.'}
                </Text>
              </View>
            )}
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

        {
          insights ?
            <View style={styles.card}>
              <Text style={styles.headerText}>AI-Powered Habit Insights</Text>
              <Text style={styles.subHeaderText}>Analysis and suggestions for "{habits[0]?.name}"</Text>

              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Summary</Text>
                <Text style={styles.sectionText}>{insights?.summary}</Text>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.column}>
                  <Text style={[styles.sectionHeading, styles.positiveText]}>Strengths</Text>
                  <FlatList
                    data={insights?.strengths || []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.listItem}>
                        <FontAwesomeIcon name="check-circle" size={20} color="green" />
                        <Text style={styles.listText}>{item}</Text>
                      </View>
                    )}
                  />
                </View>

                <View style={styles.column}>
                  <Text style={[styles.sectionHeading, styles.negativeText]}>Areas for Improvement</Text>
                  <FlatList
                    data={insights?.improvements || []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.listItem}>
                        <FontAwesomeIcon name="bullseye" size={20} color="orange" />
                        <Text style={styles.listText}>{item}</Text>
                      </View>
                    )}
                  />
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Suggestions</Text>
                <FlatList
                  data={insights?.suggestions || []}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.listItem}>
                      <FontAwesomeIcon name="star" size={20} color="blue" />
                      <Text style={styles.listText}>{item}</Text>
                    </View>
                  )}
                />
              </View>

              <View style={styles.divider} />
              <View style={styles.scoreContainer}>
                <Text style={styles.consistencyLabel}>Consistency Score</Text>
                <Text style={styles.scoreText}>{insights?.consistency_score}%</Text>
              </View>

              <Progress.Bar
                progress={insights?.consistency_score / 100}
                width={300}
                color="blue"
                unfilledColor="lightgrey"
                borderColor="lightgrey"
                style={styles.progressBar}
              />
            </View>
            :
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Habit Insights</Text>
              <Text style={styles.cardSubtitle}>Select a habit to view AI-powered insights</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', width: '100%' }} />
              <View style={styles.noHabitContainer}>
                <Text style={styles.noHabitText}>No habit selected</Text>
              </View>
            </View>
        }

        {/* <TouchableOpacity style={styles.reportButton}>
          <Icon name="alert-circle-outline" size={16} color="#6C7C9B" />
          <Text style={styles.reportText}> Report a Problem</Text>
        </TouchableOpacity> */}
      </ScrollView>
      {modalVisible ?
        <HabitCreationModal
          visible={modalVisible}
          onClose={onClose}
          onCreate={handleCreateHabit}
          habit={habits}
          selectedHabit={selectedHabit}
        /> :
        null}
      {phoneModalVisible && (
        <PhoneVerificationModal
          isVisible={phoneModalVisible}
          onClose={() => setPhoneModalVisible(false)}
          handleOnStart={handleOnStart}
          isLoading={loading}
        // user={user}
        />
      )}
      <SubscriptionComparison visible={visible} onClose={() => setVisible(false)} stripePayment={fetchPaymentIntent} selectPlan={handleSelectPlan} loading={isLoading} user={user} />
    </SafeAreaView>
  );
};

export default Dashboard;
