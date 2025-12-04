// components/InfoCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoCard = ({ icon, title, value, color }) => {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.value, { color: color }]}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 6,
  },
  icon: {
    fontSize: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default InfoCard;