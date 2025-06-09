import { StyleSheet } from "react-native";

export default StyleSheet.create({
  carouselWrapper: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  carouselContent: {
    paddingLeft: 20,
    paddingRight: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#F8E1E7',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: 110,
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7A3B46',
    textAlign: 'center',
  },
  emptyText: {
    color: '#7A3B46',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontStyle: 'italic',
  },
});
