import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white", // Keeping existing background color
  },
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "white", // Light blue background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(53,101,208)", // Blue color
  },
  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(41,121,255)", // Blue button
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    right: 10
  },
  upgradeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  statCard: {
    // width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 15,
    padding: 30,
    margin: 10,
    marginBottom: 12,
    position: "relative",
    shadowColor: "#aaa", // Change from black to gray for a softer shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15, // Reduce opacity for a lighter shadow
    shadowRadius: 4, // Increase radius for a softer look
    elevation: 4, // Keep elevation for Android shadow
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop:10
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#555",
  },
  cardIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 22,
    color: "#777",
  },
  scrollContainer: {
    paddingBottom: 20,  // Prevent content from getting cut off at the bottom
  },
  habitsContainer: {
    padding: 20,
  },

  habitsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "rgb(53,101,208)",
  },

  habitsSubtitle: {
    fontSize: 14,
    color: "#6C7C9B",
    marginVertical: 5,
  },

  phoneStatus: {
    fontSize: 18,
    color: "#444",
    marginVertical: 5,
    paddingTop: 10
  },

  notVerified: {
    color: "#D89224",
    fontWeight: "bold",
  },

  noHabitsCard: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,           // Border width
    borderColor: "#E3E3E3",   // Border color
    borderStyle: "dashed",
    marginTop: 15,
  },

  addButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "rgb(238,242,247)",
    alignItems: "center",
    justifyContent: "center",
  },

  noHabitsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  noHabitsDescription: {
    fontSize: 14,
    color: "#6C7C9B",
    textAlign: "center",
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3565D0",
    marginBottom: 10,
    paddingLeft:20
  },
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 15,
    padding: 30,
    margin: 10,
    marginBottom: 12,
    position: "relative",
    shadowColor: "#aaa", // Change from black to gray for a softer shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15, // Reduce opacity for a lighter shadow
    shadowRadius: 4, // Increase radius for a softer look
    elevation: 4, // Keep elevation for Android shadow
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginBottom: 15,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    paddingRight: 10,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  badgeDescription: {
    fontSize: 14,
    color: "gray",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "rgb(53,101,208)",
    marginBottom: 10,
    paddingLeft:20
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6C7C9B",
    marginBottom: 15,
  },
  noHabitContainer: {
    // backgroundColor: "#F5F5F5",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  noHabitText: {
    fontSize: 16,
    color: "#6C7C9B",
  },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  reportText: {
    color: "#6C7C9B",
    fontSize: 14,
  },
});

export default styles;