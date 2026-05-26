import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Modal, TextInput, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/initialData';
import { useBudget, duplicateMonth, computeMonthValues } from '../context/BudgetContext';

const fmt = (n) => `$${Math.abs(parseFloat(n) || 0).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const YEARS = ['2026', '2027', '2028'];

export default function MonthsScreen() {
  const { state, dispatch, activeMonth } = useBudget();
  const [showAdd, setShowAdd] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null); // month id to duplicate
  const [newLabel, setNewLabel] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(MONTH_NAMES[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState('2026');

  const handleAddMonth = () => {
    const label = newLabel.trim() || `${selectedMonth} ${selectedYear}`;
    let baseMonth = selectedSource
      ? state.months.find(m => m.id === selectedSource)
      : state.months[state.months.length - 1];

    const newMonth = duplicateMonth(baseMonth, label);
    dispatch({ type: 'ADD_MONTH', payload: { newMonth } });
    setShowAdd(false);
    setNewLabel('');
    setSelectedSource(null);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Budget Months</Text>
          <Text style={styles.headerSub}>{state.months.length} month{state.months.length !== 1 ? 's' : ''} tracked</Text>
        </View>

        {state.months.map((month) => {
          const computed = computeMonthValues(month);
          const isActive = month.id === activeMonth?.id;
          const surplus = computed.totalDifference >= 0;

          return (
            <View key={month.id} style={[styles.monthCard, isActive && styles.monthCardActive]}>
              {/* Month header */}
              <TouchableOpacity
                style={styles.monthTop}
                onPress={() => dispatch({ type: 'SET_ACTIVE_MONTH', payload: month.id })}
                activeOpacity={0.8}
              >
                <View style={styles.monthLeft}>
                  {isActive && <View style={styles.activeDot} />}
                  <View>
                    <Text style={[styles.monthLabel, isActive && styles.monthLabelActive]}>
                      {month.label}
                    </Text>
                    <Text style={styles.monthSub}>
                      {month.incomeSources.length} sources • {month.directDebits.length} bills
                    </Text>
                  </View>
                </View>
                <View style={[styles.diffBadge, { backgroundColor: surplus ? COLORS.green : '#E53935' }]}>
                  <Text style={styles.diffBadgeText}>
                    {surplus ? '+' : '-'}{fmt(computed.totalDifference)}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Month stats */}
              <View style={styles.monthStats}>
                <StatRow icon="trending-up" label="Income" value={fmt(computed.totalIncome)} color={COLORS.green} />
                <StatRow icon="trending-down" label="Expense" value={fmt(computed.totalExpense)} color="#E53935" />
                <StatRow
                  icon="checkmark-done"
                  label="Bills Paid"
                  value={`${month.directDebits.filter(d => d.paid).length}/${month.directDebits.length}`}
                  color={COLORS.primary}
                />
              </View>

              {/* Per-source summary */}
              <View style={styles.sourceGrid}>
                {month.incomeSources.map((s, i) => {
                  const inc = computed.incomePerSource[i] || 0;
                  const exp = computed.expensePerSource[i] || 0;
                  const diff = inc - exp;
                  return (
                    <View key={s.id} style={styles.sourceChip}>
                      <Text style={styles.sourceChipName} numberOfLines={1}>{s.name}</Text>
                      <Text style={[styles.sourceChipDiff, { color: diff >= 0 ? COLORS.green : '#E53935' }]}>
                        {diff >= 0 ? '+' : '-'}{fmt(diff)}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* Actions */}
              <View style={styles.monthActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {
                    setSelectedSource(month.id);
                    setNewLabel(`${month.label} (Copy)`);
                    setShowAdd(true);
                  }}
                >
                  <Ionicons name="copy-outline" size={15} color={COLORS.primary} />
                  <Text style={styles.actionBtnText}>Duplicate</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {
                    Alert.prompt('Rename Month', 'New label:', label => {
                      if (label) dispatch({ type: 'UPDATE_MONTH_LABEL', payload: { monthId: month.id, label } });
                    }, 'plain-text', month.label);
                  }}
                >
                  <Ionicons name="pencil-outline" size={15} color={COLORS.gold} />
                  <Text style={[styles.actionBtnText, { color: COLORS.gold }]}>Rename</Text>
                </TouchableOpacity>

                {state.months.length > 1 && (
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.deleteBtn]}
                    onPress={() => Alert.alert('Delete Month', `Delete "${month.label}"? This cannot be undone.`, [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', style: 'destructive', onPress: () => dispatch({ type: 'DELETE_MONTH', payload: { monthId: month.id } }) },
                    ])}
                  >
                    <Ionicons name="trash-outline" size={15} color="#E53935" />
                    <Text style={[styles.actionBtnText, { color: '#E53935' }]}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

        {/* Add new month */}
        <TouchableOpacity style={styles.addBtn} onPress={() => { setSelectedSource(null); setNewLabel(''); setShowAdd(true); }} activeOpacity={0.8}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
          <Text style={styles.addBtnText}>Add New Month</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Add Month Modal */}
      <Modal visible={showAdd} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {selectedSource ? '📋 Duplicate Month' : '➕ Add New Month'}
            </Text>

            {selectedSource && (
              <View style={styles.sourceInfo}>
                <Ionicons name="information-circle" size={16} color={COLORS.primary} />
                <Text style={styles.sourceInfoText}>
                  Copying from: {state.months.find(m => m.id === selectedSource)?.label}
                </Text>
              </View>
            )}

            <Text style={styles.modalLabel}>Month Name</Text>
            <View style={styles.monthPickerRow}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {MONTH_NAMES.map(m => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.pickChip, selectedMonth === m && styles.pickChipActive]}
                    onPress={() => { setSelectedMonth(m); setNewLabel(`${m} ${selectedYear}`); }}
                  >
                    <Text style={[styles.pickChipText, selectedMonth === m && styles.pickChipTextActive]}>{m.slice(0, 3)}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.yearRow}>
              {YEARS.map(y => (
                <TouchableOpacity
                  key={y}
                  style={[styles.yearChip, selectedYear === y && styles.yearChipActive]}
                  onPress={() => { setSelectedYear(y); setNewLabel(`${selectedMonth} ${y}`); }}
                >
                  <Text style={[styles.yearChipText, selectedYear === y && styles.yearChipTextActive]}>{y}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Custom Label (optional)</Text>
            <TextInput
              style={styles.modalInput}
              value={newLabel}
              onChangeText={setNewLabel}
              placeholder={`${selectedMonth} ${selectedYear}`}
              placeholderTextColor={COLORS.textLight}
            />

            <Text style={styles.finalLabel}>Label: <Text style={{ fontWeight: '700', color: COLORS.primary }}>{newLabel || `${selectedMonth} ${selectedYear}`}</Text></Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAdd(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleAddMonth}>
                <Text style={styles.confirmBtnText}>{selectedSource ? 'Duplicate' : 'Create'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function StatRow({ icon, label, value, color }) {
  return (
    <View style={styles.statRow}>
      <Ionicons name={icon} size={14} color={color} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16, paddingBottom: 40, gap: 14 },

  headerCard: {
    backgroundColor: COLORS.primary, borderRadius: 14, padding: 18, alignItems: 'center',
    elevation: 4,
  },
  headerTitle: { color: COLORS.gold, fontSize: 20, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 2 },

  monthCard: {
    backgroundColor: COLORS.white, borderRadius: 14,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 3, overflow: 'hidden',
  },
  monthCardActive: {
    borderWidth: 2, borderColor: COLORS.primary,
    elevation: 5,
  },
  monthTop: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  monthLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  activeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  monthLabel: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  monthLabelActive: { color: COLORS.primary },
  monthSub: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  diffBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  diffBadgeText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  monthStats: { padding: 14, paddingBottom: 8, gap: 6 },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statLabel: { flex: 1, fontSize: 13, color: COLORS.textMid },
  statValue: { fontSize: 13, fontWeight: '700' },

  sourceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 14, paddingBottom: 10 },
  sourceChip: { backgroundColor: COLORS.background, borderRadius: 8, padding: 8, minWidth: 80 },
  sourceChipName: { fontSize: 10, color: COLORS.textLight, marginBottom: 2 },
  sourceChipDiff: { fontSize: 12, fontWeight: '700' },

  monthActions: {
    flexDirection: 'row', gap: 8, padding: 12, borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8,
    backgroundColor: COLORS.lightBlue,
  },
  deleteBtn: { backgroundColor: '#FFEBEE', marginLeft: 'auto' },
  actionBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.primary },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 16, backgroundColor: COLORS.lightBlue,
    borderRadius: 14, borderWidth: 2, borderColor: COLORS.primary, borderStyle: 'dashed',
  },
  addBtnText: { color: COLORS.primary, fontSize: 15, fontWeight: '700' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40, gap: 14,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: COLORS.primary, textAlign: 'center', marginBottom: 4 },
  sourceInfo: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.lightBlue, borderRadius: 10, padding: 10,
  },
  sourceInfoText: { fontSize: 13, color: COLORS.primary, flex: 1 },
  modalLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textMid },
  monthPickerRow: { height: 44 },
  pickChip: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8,
    backgroundColor: COLORS.background, marginRight: 6,
  },
  pickChipActive: { backgroundColor: COLORS.primary },
  pickChipText: { fontSize: 13, color: COLORS.textMid, fontWeight: '500' },
  pickChipTextActive: { color: '#fff', fontWeight: '700' },
  yearRow: { flexDirection: 'row', gap: 8 },
  yearChip: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: COLORS.background, alignItems: 'center' },
  yearChipActive: { backgroundColor: COLORS.gold },
  yearChipText: { fontSize: 14, color: COLORS.textMid, fontWeight: '600' },
  yearChipTextActive: { color: COLORS.primary, fontWeight: '800' },
  modalInput: {
    borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10,
    padding: 12, fontSize: 15, color: COLORS.textDark,
  },
  finalLabel: { fontSize: 13, color: COLORS.textMid, textAlign: 'center' },
  modalActions: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: COLORS.background, alignItems: 'center' },
  cancelBtnText: { color: COLORS.textMid, fontWeight: '700', fontSize: 15 },
  confirmBtn: { flex: 2, padding: 14, borderRadius: 12, backgroundColor: COLORS.primary, alignItems: 'center' },
  confirmBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
