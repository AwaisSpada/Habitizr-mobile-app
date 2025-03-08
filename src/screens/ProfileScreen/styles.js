import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white", // Keeping existing background color
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  headerProfile: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A5BA0',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A5BA0',
    marginBottom: 10,
    paddingTop: 30
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
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: "#aaa", // Change from black to gray for a softer shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15, // Reduce opacity for a lighter shadow
    shadowRadius: 4, // Increase radius for a softer look
    elevation: 4, // Keep elevation for Android shadow
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#777',
    marginBottom: 15,
  },
  planContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trialBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  trialText: {
    color: '#3A5BA0',
    fontSize: 12,
  },
  planPrice: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  memberSinceContainer: {
    marginBottom: 15
  },
  memberSince: {
    fontSize: 16,
    color: '#555',
  },
  memberSince1: {
    fontSize: 14,
    color: '#555',
  },
  featuresList: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  upgradeButton: {
    backgroundColor: 'rgb(83,121,166)',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  upgradeButton1: {
    backgroundColor: 'rgb(221,81,76)',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20
  },
  upgradeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  upgradeText1: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 10
  },
  scrollContainer: {
    paddingBottom: 20,  // Prevent content from getting cut off at the bottom
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    color: '#777',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#aaa", // Change from black to gray for a softer shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15, // Reduce opacity for a lighter shadow
    shadowRadius: 4, // Increase radius for a softer look
    elevation: 4, // Keep elevation for Android shadow
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  highlightText: {
    fontWeight: 'bold',
  },
  warningText: {
    fontWeight: 'bold',
  },
  inputLabel: {
    fontSize: 14,
    // fontWeight: 'bold',
    marginTop: 15,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 10,
    marginTop: 5,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    marginTop: 15
  },
  hintText: {
    fontSize: 12,
    color: '#777',
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 10,
  },
  accountContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 30,
    shadowColor: "#aaa", // Change from black to gray for a softer shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15, // Reduce opacity for a lighter shadow
    shadowRadius: 4, // Increase radius for a softer look
    elevation: 4, // Keep elevation for Android shadow
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 8,
  },
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

export default styles;