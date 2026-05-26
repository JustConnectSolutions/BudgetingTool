import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { COLORS } from '../data/initialData';

export default function EditableField({
  value,
  onSave,
  numeric = false,
  style,
  textStyle,
  prefix = '',
  placeholder = '',
  align = 'left',
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const display = numeric
    ? (parseFloat(value) || 0).toFixed(2)
    : (value || '');

  const handlePress = () => {
    setDraft(numeric ? String(parseFloat(value) || 0) : (value || ''));
    setEditing(true);
  };

  const handleSubmit = () => {
    const final = numeric ? (parseFloat(draft) || 0) : draft;
    onSave(final);
    setEditing(false);
  };

  if (editing) {
    return (
      <TextInput
        value={draft}
        onChangeText={setDraft}
        onBlur={handleSubmit}
        onSubmitEditing={handleSubmit}
        keyboardType={numeric ? 'decimal-pad' : 'default'}
        autoFocus
        style={[styles.input, { textAlign: align }, style, textStyle]}
        returnKeyType="done"
      />
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={style}>
      <Text style={[styles.text, { textAlign: align }, textStyle]}>
        {prefix}{display}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: COLORS.textDark,
    paddingVertical: 2,
  },
  input: {
    fontSize: 14,
    color: COLORS.textDark,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.primary,
    paddingVertical: 1,
    minWidth: 60,
  },
});
