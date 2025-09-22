import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { Calendar } from 'react-native-calendars';

const HabitCard = ({ habit, onEdit, onDelete, onStart, onHabitInsights, stopRunning }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const [showCalandar, setShowCalendar] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    completed: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const confirmDelete = () => {
    onDelete(habit); // Call delete function
    setModalVisible(false); // Close modal after deleting
  };

  const handleDayPress = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDay = new Date(day.dateString);
    selectedDay.setHours(0, 0, 0, 0);

    if (selectedDay > today) {
      alert("Please select the current date or a past date.");
      return;
    }

    setSelectedDate(day.dateString);
    setFormData({ completed: false });
    setIsModalVisible(true);
  };

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : '';

  const handleFormSubmit = async () => {
    if (!selectedDate) return;
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`https://habitizr.com/api/habits/${habit.id}/completions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          habitId: habit.id,
          completedAt: selectedDate,
          completed: formData.completed,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update completion');
      }

      const updated = await response.json();

      // ✅ Update local habit completions
      const updatedCompletions = [...habit.completions];

      const index = updatedCompletions.findIndex(c => c.completedAt.startsWith(selectedDate));

      if (index !== -1) {
        // update existing
        updatedCompletions[index].completed = formData.completed;
      } else {
        // add new
        updatedCompletions.push({
          habitId: habit.id,
          completedAt: selectedDate,
          completed: formData.completed,
        });
      }

      habit.completions = updatedCompletions; // ⚠️ only works if habit is mutable

      // ✅ Trigger calendar refresh
      setSelectedDate(null);
      setIsModalVisible(false);
      setFormData({ completed: false });

      // Force re-render (optional, if calendar doesn't update)
      setShowCalendar(false);
      setTimeout(() => setShowCalendar(true), 10);

      alert('✅ Habit updated!');
    } catch (error) {
      console.error('Update error:', error);
      alert(`❌ Error: ${error.message}`);
    }
    finally {
      setIsLoading(false); // Stop loading
    }
  };


  const callHabitInsights = () => {
    onHabitInsights(habit)
  }

  const getMarkedDates = (habit) => {
    const completions = habit.completions || [];
    const marked = {};
    const today = new Date();
    const start = new Date(habit.startedAt);

    // Convert completions into a map for quick lookup
    const completionMap = {};
    completions.forEach(({ completedAt, completed }) => {
      const date = new Date(completedAt).toISOString().split('T')[0];
      completionMap[date] = completed;
    });

    // Loop through each date from start to today
    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const isToday = dateStr === today.toISOString().split('T')[0];
      const completed = completionMap[dateStr];

      // Mark today as gray regardless, past dates must be green/red
      marked[dateStr] = {
        customStyles: {
          container: {
            backgroundColor: isToday
              ? '#ddd'
              : completed === true
                ? 'green'
                : 'red',
            borderRadius: 5,
          },
          text: {
            color: 'white',
          },
        },
      };
    }

    return marked;
  };

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: selected ? "blue" : "lightgrey" }]}
      onPress={() => {
        setSelected(!selected);

        callHabitInsights(); // Call the function correctly
      }}
      activeOpacity={0.8}
    >
      {/* Header: Habit Name & Actions */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Text style={styles.habitName}>{habit.name}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit(habit)}>
              <Feather name="edit" size={18} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Feather name="trash-2" size={18} color="red" />
            </TouchableOpacity>
          </View>
          {/* Start Button */}
          {
            habit.isRunning ?
              <TouchableOpacity style={styles.stopButton} onPress={() => stopRunning(habit)}>
                <Feather name="pause" size={18} color="orange" />
                <Text style={styles.stopButtonText}>Running</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.startButton} onPress={() => onStart(habit)}>
                <Feather name="play" size={18} color="green" />
                <Text style={styles.startButtonText}>Start Now</Text>
              </TouchableOpacity>
          }

        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{habit.description}</Text>

      {/* Details: Frequency & Reminder */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="calendar" size={20} color="gray" />
            <Text style={styles.detailText}>Frequency:</Text>
          </View>
          <Text style={styles.valueText}>{habit.frequency}</Text>

        </View>
        <View>
          {habit.frequency !== 'daily' && habit.selectedDays && habit.selectedDays.length > 0 && (
            <View style={styles.detailRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather name="check-square" size={20} color="gray" />
                <Text style={styles.detailText}>Days:</Text>
              </View>
              <Text style={styles.valueText}>
                {habit.selectedDays
                  .map((day) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day])
                  .join(", ")}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.detailRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="clock-outline" size={20} color="gray" />
            <Text style={styles.detailText}>Reminder:</Text>
          </View>
          <Text style={styles.valueText}>{new Date(`2000-01-01T${habit.reminderTime}`).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }) || "Not Set"}</Text>
        </View>

        {habit.startedAt && (
          <View style={styles.detailRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="flag" size={20} color="gray" />
              <Text style={styles.detailText}>Started:</Text>
            </View>
            <Text style={styles.valueText}>
              {new Date(habit.startedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </View>
        )}

        {/* Last Check-in */}
        {habit.lastCheckin && (
          <View style={styles.detailRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="check-circle" size={20} color="gray" />
              <Text style={styles.detailText}>Last check-in:</Text>
            </View>
            <Text style={styles.valueText}>
              {new Date(habit.lastCheckin).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.startButton, { alignItems: 'center', marginTop: 20 }]}
          onPress={() => setShowCalendar(!showCalandar)}
        >
          <Text style={[styles.startButtonText, { textAlign: 'center' }]}>Update Habit Response</Text>
        </TouchableOpacity>

        {showCalandar && (
          <>
            <Calendar
              markingType="custom"
              minDate={new Date(habit.startedAt)}
              maxDate={new Date()}
              // onDayPress={(day) => {
              //   setSelectedDate(day.dateString);     // set date string
              //   setFormData({ completed: false });   // reset form
              //   setIsModalVisible(true);             // open modal
              // }}
              onDayPress={handleDayPress}
              monthFormat={'MMMM yyyy'} // e.g. "April 2025"
              markedDates={getMarkedDates(habit)} />
            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => {
                setIsModalVisible(false);
                setSelectedDate(null);
              }}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>Edit Habit Response</Text>
                  <Text style={styles.modalDescription}>
                    You are updating <Text style={styles.boldText}>{habit.name}</Text> for{' '}
                    <Text style={styles.boldText}>
                      {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Text>
                  </Text>

                  {/* Completion Checkbox */}
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setFormData({ ...formData, completed: !formData.completed })}
                  >
                    <Text style={styles.checkboxText}>
                      {formData.completed ? '✔️ Completed' : '❌ Not Completed'}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
                    <Button
                      title="Cancel"
                      onPress={() => {
                        setIsModalVisible(false);
                        setSelectedDate(null);
                        setFormData({ completed: false });
                      }}
                      color="#888"
                    />

                    <Button
                      title={isLoading ? 'Saving...' : 'Save'}
                      onPress={handleFormSubmit}
                      disabled={isLoading}
                    />
                  </View>
                </View>
              </View>
            </Modal>

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
                    This action cannot be undone. This will permanently delete the habit
                    "{habit.name}" and all associated data including your progress. check-ins and insights.
                  </Text>

                  <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
                    <Text style={styles.deleteText}>Delete Habit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 15,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  habitName: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    width: 100
  },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
  description: {
    color: "gray",
    fontSize: 14,
    marginVertical: 6,
  },
  details: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    justifyContent: 'space-between'
  },
  detailText: {
    marginLeft: 6,
    color: "gray",
    fontSize: 16,
  },
  valueText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "green",
    borderWidth: 1,
    justifyContent: 'center',

    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  stopButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "orange",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  startButtonText: {
    color: "green",
    fontSize: 16,
    marginLeft: 6,
    textAlign: "center",
  },
  stopButtonText: {
    color: "orange",
    fontSize: 16,
    marginLeft: 6,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: "rgb(246, 49, 42)",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    width: "100%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    color: "#333",
  },

  modal: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#222',
  },

  modalDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },

  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },

  checkbox: {
    marginVertical: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },

  checkboxText: {
    fontSize: 16,
    color: '#333',
  },


});

export default HabitCard;
