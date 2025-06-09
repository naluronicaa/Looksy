import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 0 : 5,
  },
  text: {
    fontSize: 14,
    color: '#7A3B46',
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  icon: {
    marginRight: 6,
  },  
});
