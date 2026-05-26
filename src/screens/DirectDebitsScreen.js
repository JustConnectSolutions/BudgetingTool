import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/initialData';
import { useBudget } from '../context/BudgetContext';
import MonthSelector from '../components/MonthSelector';
import EditableField from '../components/EditableField';

const fmt = (n) => `$${(parseFloat(n) || 0).toFixed(2)}`;

export default function DirectDebitsScreen() {
  const { activeMonth, dispatch, computedValues } = useBudget();
  const [filter, setFilter] = useState('all'); // 'all' | 'paid' | 'unpaid'

  if (!activeMonth) return null;

  const { totalDebits, paidDebits } = computedValues;
  const unpaidDebits = totalDebits - paidDebits;

  const sorted = [...activeMonth.directDebits]
    .sort((a, b) => (parseInt(a.day) || 0) - (parseInt(b.day) || 0));

  const filtered = sorted.filter(d => {
    if (filter === 'paid') return d.paid;
    if (filter === 'unpaid') return !d.paid;
    return true;
  });

  const paidCount = activeMonth.directDebits.filter(d => d.paid).length;
  const paidPct = activeMonth.directDebits.length > 0
    ? Math.round((paidCount / activeMonth.directDebits.length) * 100)
    : 0;

  return (
    <View style={styles.screen}>
      <MonthSelector />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <SummaryBox label="Total Bills" value={fmt(totalDebits)} color={COLORS.primary} />
            <SummaryBox label="Paid" value={fmt(paidDebits)} color={COLORS.green} />
            <SummaryBox label="Remaining" value={fmt(unpaidDebits)} color={unpaidDebits > 0 ? '#E53935' : COLORS.textLight} />
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${paidPct}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{paidCount} of {activeMonth.directDebits.length} bills paid ({paidPct}%)</Text>
        </View>

        {/* Filter tabs */}
        <View style={styles.filterRow}>
          {['all', 'unpaid', 'paid'].map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterTab, filter === f && styles.filterTabActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterTabText, filter === f && styles.filterTabTextActive]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'all' ? ` (${activeMonth.directDebits.length})` : ''}
                {f === 'paid' ? ` (${activeMonth.directDebits.filter(d => d.paid).length})` : ''}
                {f === 'unpaid' ? ` (${activeMonth.directDebits.filter(d => !d.paid).length})` : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Debits list */}
        <View style={styles.listCard}>
          {filtered.length === 0 ? (
            <Text style={styles.emptyText}>No {filter} bills</Text>
          ) : filtered.map((debit, idx) => (
            <View key={debit.id} style={[styles.debitRow, idx % 2 === 1 && styles.debitRowAlt]}>
              {/* Checkbox */}
              <TouchableOpacity
                onPress={() => dispatch({ type: 'TOGGLE_DIRECT_DEBIT', payload: { monthId: activeMonth.id, debitId: debit.id } })}
                style={styles.checkbox}
                activeOpacity={0.7}
              >
                <View style={[styles.checkboxInner, debit.paid && styles.checkboxChecked]}>
                  {debit.paid && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>

              {/* Day badge */}
              <View style={[styles.dayBadge, debit.paid && styles.dayBadgePaid]}>
                <Text style={[styles.dayText, debit.paid && styles.dayTextPaid]}>
                  <EditableField
                    value={String(debit.day)}
                    onSave={v => dispatch({ type: 'UPDATE_DIRECT_DEBIT', payload: { monthId: activeMonth.id, debitId: debit.id, field: 'day', value: parseInt(v) || 1 } })}
                    textStyle={[styles.dayText, debit.paid && styles.dayTextPaid]}
                    align="center"
                  />
                </Text>
              </View>

              {/* Bill name */}
              <View style={{ flex: 1 }}>
                <EditableField
                  value={debit.bill}
                  onSave={v => dispatch({ type: 'UPDATE_DIRECT_DEBIT', payload: { monthId: activeMonth.id, debitId: debit.id, field: 'bill', value: v } })}
                  textStyle={[styles.billName, debit.paid && styles.billNamePaid]}
                />
              </View>

              {/* Amount */}
              <EditableField
                value={debit.amount}
                onSave={v => dispatch({ type: 'UPDATE_DIRECT_DEBIT', payload: { monthId: activeMonth.id, debitId: debit.id, field: 'amount', value: v } })}
                numeric
                prefix="$"
                textStyle={[styles.billAmount, debit.paid && styles.billAmountPaid]}
                align="right"
              />

              {/* Delete */}
              <TouchableOpacity
                onPress={() => Alert.alert('Delete Bill', `Remove "${debit.bill}"?`, [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: () => dispatch({ type: 'DELETE_DIRECT_DEBIT', payload: { monthId: activeMonth.id, debitId: debit.id } }) },
                ])}
                style={{ paddingLeft: 8 }}
              >
                <Ionicons name="trash-outline" size={15} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Add new direct debit */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => dispatch({ type: 'ADD_DIRECT_DEBIT', payload: { monthId: activeMonth.id } })}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={22} color={COLORS.green} />
          <Text style={styles.addBtnText}>Add Direct Debit</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>Tap any field to edit • Tap checkbox to mark as paid</Text>

      </ScrollView>
    </View>
  );
}

function SummaryBox({ label, value, color }) {
  return (
    <View style={styles.summaryBox}>
      <Text style={[styles.summaryBoxValue, { color }]}>{value}</Text>
      <Text style={styles.summaryBoxLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16, paddingBottom: 32, gap: 12 },

  summaryCard: {
    backgroundColor: COLORS.white, borderRadius: 14, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 3,
  },
  summaryRow: { flexDirection: 'row', marginBottom: 12 },
  summaryBox: { flex: 1, alignItems: 'center' },
  summaryBoxValue: { fontSize: 18, fontWeight: '800' },
  summaryBoxLabel: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  progressBg: { height: 8, backgroundColor: COLORS.border, borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressFill: { height: 8, backgroundColor: COLORS.green, borderRadius: 4 },
  progressLabel: { fontSize: 12, color: COLORS.textMid, textAlign: 'center' },

  filterRow: { flexDirection: 'row', gap: 8 },
  filterTab: {
    flex: 1, paddingVertical: 8, borderRadius: 10,
    backgroundColor: COLORS.white, alignItems: 'center',
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  filterTabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterTabText: { fontSize: 12, fontWeight: '600', color: COLORS.textMid },
  filterTabTextActive: { color: '#fff' },

  listCard: {
    backgroundColor: COLORS.white, borderRadius: 14, overflow: 'hidden',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 3,
  },
  debitRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  debitRowAlt: { backgroundColor: '#F8F9FF' },

  checkbox: { marginRight: 10 },
  checkboxInner: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: COLORS.green, borderColor: COLORS.green },

  dayBadge: {
    width: 32, height: 32, borderRadius: 8, marginRight: 10,
    backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center',
  },
  dayBadgePaid: { backgroundColor: COLORS.lightGreen },
  dayText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  dayTextPaid: { color: COLORS.green },

  billName: { fontSize: 13, fontWeight: '500', color: COLORS.textDark },
  billNamePaid: { color: COLORS.textLight, textDecorationLine: 'line-through' },
  billAmount: { fontSize: 13, fontWeight: '700', color: COLORS.textDark, minWidth: 70, textAlign: 'right' },
  billAmountPaid: { color: COLORS.green },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 12, borderWidth: 1.5, borderColor: COLORS.green, borderStyle: 'dashed',
  },
  addBtnText: { color: COLORS.green, fontSize: 14, fontWeight: '600' },
  hint: { fontSize: 11, color: COLORS.textLight, textAlign: 'center' },
  emptyText: { padding: 24, textAlign: 'center', color: COLORS.textLight },
});
