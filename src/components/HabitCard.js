import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

const HabitCard = ({ habit, onEdit, onDelete, onStart, onHabitInsights, stopRunning }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  const confirmDelete = () => {
    onDelete(habit); // Call delete function
    setModalVisible(false); // Close modal after deleting
  };

  const callHabitInsights = () => {
    onHabitInsights(habit)
  }

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
          {habit.selectedDays && habit.selectedDays.length > 0 && (
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
      </View>

      {/* Delete Confirmation Modal */}
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
              "{habit.habitName}" and all associated data including your progress. check-ins and insights.
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
    width: "100%",
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
});

export default HabitCard;
