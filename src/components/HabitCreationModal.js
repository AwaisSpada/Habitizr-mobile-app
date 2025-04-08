import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker'
import DatePicker from 'react-native-date-picker';
import { Calendar } from 'react-native-calendars';
import { Checkbox, RadioButton } from 'react-native-paper';  // Use Checkbox instead of RadioButton

const numbersToDays = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

const HabitCreationModal = ({ visible, onClose, onCreate, habit, selectedHabit }) => {
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [reminderTime, setReminderTime] = useState();
  const [timezone, setTimezone] = useState('Asia/Karachi');
  const [openFrequency, setOpenFrequency] = useState(false);
  const [openTimezone, setOpenTimezone] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [timezoneItems, setTimezoneItems] = useState([]);
  const [time, setTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState({});  // Store selected days in an object

  const moment = require('moment-timezone');

  useEffect(() => {
    const formattedTimezones = moment.tz.names().map((tz) => ({ label: tz, value: tz }));
    setTimezoneItems(formattedTimezones);
  }, []);

  useEffect(() => {
    if (selectedHabit) {
      setHabitName(selectedHabit.name || '');
      setDescription(selectedHabit.description || '');
      setFrequency(habit.selectedHabit || 'Daily');
      // setReminderTime(selectedHabit.reminderTime ? new Date(selectedHabit.reminderTime) : new Date());
      setTimezone(selectedHabit.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
  }, [selectedHabit]);

  const handleSubmit = () => {
    if (!habitName.trim()) {
      Alert.alert("Error", "Habit name is required");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Error", "Description is required");
      return;
    }
    if (!frequency) {
      Alert.alert("Error", "Please select a frequency");
      return;
    }
    if (!reminderTime) {
      Alert.alert("Error", "Please set a reminder time");
      return;
    }
    if (!timezone) {
      Alert.alert("Error", "Please select a timezone");
      return;
    }
    if (!selectedDates || selectedDates.length === 0) {
      Alert.alert("Error", "Please select at least one date");
      return;
    }

    const updatedHabit = { habitName, description, frequency, reminderTime, timezone, selectedDates };
    onCreate(updatedHabit);

    // Reset form fields after submission
    setHabitName('');
    setDescription('');
  };

  // const toggleDateSelection = (day) => {

  //   const dateString = day.dateString;
  //   setSelectedDates((prevDates) => {
  //     console.log('checek day', prevDates)
  //     const updatedDates = { ...prevDates };

  //     if (updatedDates[dateString]) {
  //       delete updatedDates[dateString]; // Deselect date
  //     } else {
  //       updatedDates[dateString] = { selected: true, selectedColor: 'blue' }; // Select date
  //     }

  //     return updatedDates;
  //   });
  // };

  const toggleDateSelection = (dayName) => {
    setSelectedDays((prevSelectedDays) => {
      const updatedDays = { ...prevSelectedDays };

      if (updatedDays[dayName]) {
        delete updatedDays[dayName];  // Deselect day
      } else {
        updatedDays[dayName] = true;  // Select day
      }

      return updatedDays;
    });

    const dayNumber = Object.keys(numbersToDays).find(key => numbersToDays[key] === dayName);
    console.log('dayNumber', dayNumber)

    if (dayNumber !== undefined) {
      setSelectedDates((prevDates) => {
        const updatedDates = { ...prevDates };

        if (updatedDates[dayNumber]) {
          delete updatedDates[dayNumber];
        } else {
          updatedDates[dayNumber] = { selected: true, selectedColor: 'blue' };
        }

        return updatedDates;
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.heading}>{selectedHabit ? "Edit Habit" : "Create a New Habit"}</Text>
              <Text style={styles.description}>Start your journey by creating your first habit</Text>

              <Text style={styles.label}>Habit Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Daily Exercise"
                value={habitName}
                onChangeText={setHabitName}
                placeholderTextColor={'grey'}
                textAlignVertical="top"
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your habit goal..."
                value={description}
                onChangeText={setDescription}
                multiline
                placeholderTextColor={'grey'}
                textAlignVertical="top"
              />

              <Text style={styles.label}>Frequency</Text>
              <DropDownPicker
                open={openFrequency}
                value={frequency}
                items={[
                  { label: 'Daily', value: 'Daily' },
                  { label: 'Semi-Daily', value: 'Semi-Daily' },
                  { label: 'Weekly', value: 'Weekly' }
                ]}
                setOpen={setOpenFrequency}
                setValue={setFrequency}
                style={styles.dropdown}
                onChangeValue={(value) => {
                  if (value === 'Semi-Daily' || value === 'Weekly') {
                    setShowCalendar(true);
                  } else {
                    setShowCalendar(false);
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
                <View style={{ borderWidth: 1, borderRadius: 10, borderColor: "lightgrey" }}>
                  <Calendar
                    onDayPress={toggleDateSelection}
                    markedDates={selectedDates}
                  />
                </View>

              )} */}

              {showCalendar && (
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.label}>Select Days</Text>
                  <View style={styles.radioButtonContainer}>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (

                      <View style={styles.radioButtonItem} key={day}>
                        <RadioButton.Android
                          value={day}
                          status={selectedDays[day] ? 'checked' : 'unchecked'}
                          onPress={() => toggleDateSelection(day)}
                          uncheckedColor="rgb(113,147,179)"
                          color="rgb(113,147,179)"
                        />
                        <Text style={styles.radioButtonText}>{day}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <Text style={styles.label}>Reminder Time</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input1}>
                <Text>
                  {/* {reminderTime ? new Date(reminderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'} */}
                  {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
                </Text>
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
                      value={time}
                      mode="time"
                      display="spinner"
                      onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        if (selectedTime) {
                          setTime(selectedTime);
                          setReminderTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
                        }

                      }}
                    />
                  </View>
                </View>
              )}

              {showTimePicker && Platform.OS === 'android' && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="spinner"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) {
                      setTime(selectedTime);
                      setReminderTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
                    }
                  }}
                />
              )}
              <Text style={styles.label}>Timezone</Text>
              <DropDownPicker
                open={openTimezone}
                value={timezone}
                items={timezoneItems}
                dropDownDirection='TOP'
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

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>{selectedHabit ? "Update Habit" : "Create Habit"}</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    maxHeight: '95%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
    marginBottom: 10,
    marginTop: 5,
  },
  textArea: {
    height: 80,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 5
  },
  button: {
    backgroundColor: 'rgb(83,121,166)',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
  tooltipContainer: {
    position: 'absolute',
    left: 20,
    top: 120, // Adjust based on the input field position
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
  radioButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  radioButtonText: {
    // marginLeft: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // Adjust for 2 items per row
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
  },
  radioButton: {
    borderRadius: 50,  // Make it rounded like a radio button
    width: 20,  // Adjust size
    height: 20,  // Adjust size
  },
});

export default HabitCreationModal;
