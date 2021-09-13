import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
const TextInput = ({ placeholder, value, onChange,keyboardType}) => (
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
  );