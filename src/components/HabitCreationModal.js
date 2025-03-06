import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';

const HabitCreationModal = ({ visible, onClose }) => {
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [reminderTime, setReminderTime] = useState(new Date());
  const [timezone, setTimezone] = useState('Asia/Karachi');
  const [openFrequency, setOpenFrequency] = useState(false);
  const [openTimezone, setOpenTimezone] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setReminderTime(selectedTime);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Create a New Habit</Text>
            <Text style={styles.description}>Start your journey by creating your first habit</Text>

            <Text style={styles.label}>Habit Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Daily Exercise"
              value={habitName}
              onChangeText={setHabitName}
              placeholderTextColor={'grey'}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your habit goal..."
              value={description}
              onChangeText={setDescription}
              multiline
              placeholderTextColor={'grey'}
            />

            <Text style={styles.label}>Frequency</Text>
            <DropDownPicker
              open={openFrequency}
              value={frequency}
              items={[{ label: 'Daily', value: 'Daily' }, { label: 'Semi-Daily', value: 'Semi-Daily' }, { label: 'Weekly', value: 'Weekly' }]}
              setOpen={setOpenFrequency}
              setValue={setFrequency}
              style={styles.dropdown}
              onChangeValue={(value) => {
                if (value === 'Semi-Daily' || value === 'Weekly') {
                  setShowCalendar(true);
                }
              }}
              dropDownContainerStyle={{
                borderColor: '#ccc',
                borderRadius: 12,
              }}
              selectedItemContainerStyle={{
                backgroundColor: 'rgb(245,245,245)',
                borderRadius: 12,
                paddingHorizontal: 20
              }}
            />
            {/* {showCalendar && (
              <Calendar
                onDayPress={(day) => {
                  console.log('Selected date:', day.dateString);
                  setShowCalendar(false);
                }}
              />
            )} */}
            <Text style={styles.label}>Reminder Time</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input1}>
              <Text>{reminderTime ? new Date(reminderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}</Text>
            </TouchableOpacity>

            {showTimePicker && Platform.OS === 'ios' && (
              <View style={styles.tooltipContainer}>
                <View style={styles.tooltip}>
                  <View style={styles.tooltipHeader}>
                    <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                      <Text style={styles.resetButton}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                      <Text style={styles.doneButton}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={reminderTime}
                    mode="time"
                    display="spinner"
                    onChange={(event, selectedTime) => {
                      if (selectedTime) setReminderTime(selectedTime);
                    }}
                  />
                </View>
              </View>
            )}

            {showTimePicker && Platform.OS === 'android' && (
              <DateTimePicker
                value={reminderTime}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    setReminderTime(selectedTime);
                  }
                }}
              />
            )}
            <Text style={styles.label}>Timezone</Text>
            <DropDownPicker
              open={openTimezone}
              value={timezone}
              items={[{ label: 'Asia/Karachi', value: 'Asia/Karachi' }, { label: 'America/New_York', value: 'America/New_York' }, { label: 'Europe/London', value: 'Europe/London' }]}
              setOpen={setOpenTimezone}
              setValue={setTimezone}
              style={styles.dropdown}
              dropDownContainerStyle={{
                borderColor: '#ccc',
                borderRadius: 12,
              }}
              selectedItemContainerStyle={{
                backgroundColor: 'rgb(245,245,245)',
                borderRadius: 12,
                paddingHorizontal: 20
              }}
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Create Habit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white", // Keeping existing background color
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#777',
  },
  label: {
    fontSize: 14,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 12,
    fontSize: 14,
    backgroundColor: 'white',
    marginBottom: 5,
    marginTop: 10,
  },
  input1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 12,
    fontSize: 14,
    backgroundColor: 'white',
    marginBottom: 5,
    marginTop: 10,
    width: '25%'
  },
  textArea: {
    height: 60,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 5,
    marginTop: 10
  },
  button: {
    backgroundColor: 'rgb(83,121,166)',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 200
  },
  timePickerContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: '50%',
    borderWidth: 1,
    borderColor: 'grey'
  },
  tooltipContainer: {
    position: 'absolute',
    left: 20,
    top: 140, // Adjust based on the input field position
    zIndex: 10000,
  },
  tooltip: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'lightgrey'
  },
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  resetButton: {
    color: '#007AFF',
    fontSize: 16,
  },
  doneButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HabitCreationModal;
