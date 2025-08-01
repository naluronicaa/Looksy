import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    color: '#e8afb7',
    marginTop: 4,
    fontWeight: 'bold',
  },
  activeNavText: {
    color: '#966D46',
  },
});