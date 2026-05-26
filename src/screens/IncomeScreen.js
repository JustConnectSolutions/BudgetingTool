import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/initialData';
import { useBudget, computeMonthValues } from '../context/BudgetContext';
import MonthSelector from '../components/MonthSelector';
import EditableField from '../components/EditableField';

const fmt = (n) => `$${(parseFloat(n) || 0).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const SOURCE_COLORS = ['#0D47A1', '#22B573', '#D4AF37', '#7B1FA2', '#F57C00'];

export default function IncomeScreen() {
  const { activeMonth, dispatch, computedValues } = useBudget();
  if (!activeMonth) return null;

  const { totalIncome, expensePerSource, differencePerSource } = computedValues;

  return (
    <View style={styles.screen}>
      <MonthSelector />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Summary header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerLabel}>Total Projected Monthly Income</Text>
          <Text style={styles.headerValue}>{fmt(totalIncome)}</Text>
        </View>

        {/* Income source cards */}
        {activeMonth.incomeSources.map((src, i) => {
          const inc = parseFloat(src.amount) || 0;
          const exp = expensePerSource[i] || 0;
          const diff = differencePerSource[i] || 0;
          const isPos = diff >= 0;
          const color = SOURCE_COLORS[i % SOURCE_COLORS.length];

          return (
            <View key={src.id} style={[styles.sourceCard, { borderLeftColor: color }]}>
              <View style={styles.sourceTopRow}>
                <View style={styles.sourceTitleRow}>
                  <View style={[styles.dot, { backgroundColor: color }]} />
                  <EditableField
                    value={src.name}
                    onSave={v => dispatch({ type: 'UPDATE_INCOME_SOURCE', payload: { monthId: activeMonth.id, sourceId: src.id, field: 'name', value: v } })}
                    textStyle={styles.sourceName}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => Alert.alert('Delete Source', `Remove "${src.name}"?`, [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => dispatch({ type: 'DELETE_INCOME_SOURCE', payload: { monthId: activeMonth.id, sourceIndex: i } }) },
                  ])}
                >
                  <Ionicons name="trash-outline" size={18} color={COLORS.textLight} />
                </TouchableOpacity>
              </View>

              <View style={styles.amountRow}>
                <Text style={styles.amountLabel}>Projected Amount</Text>
                <EditableField
                  value={src.amount}
                  onSave={v => dispatch({ type: 'UPDATE_INCOME_SOURCE', payload: { monthId: activeMonth.id, sourceId: src.id, field: 'amount', value: v } })}
                  numeric
                  prefix="$"
                  textStyle={[styles.amountValue, { color }]}
                  align="right"
                />
              </View>

              <View style={styles.statRow}>
                <StatPill label="Income" value={fmt(inc)} color={COLORS.green} />
                <StatPill label="Expense" value={fmt(exp)} color="#E53935" />
                <StatPill label="Net" value={(isPos ? '+' : '') + fmt(diff)} color={isPos ? COLORS.green : '#E53935'} />
              </View>

              <View style={styles.progressBg}>
                <View style={[styles.progressFill, {
                  width: `${Math.min(100, inc > 0 ? (exp / inc) * 100 : 0)}%`,
                  backgroundColor: isPos ? COLORS.green : '#E53935',
                }]} />
              </View>
              <Text style={styles.progressLabel}>
                {inc > 0 ? Math.round((exp / inc) * 100) : 0}% of this source allocated
              </Text>
            </View>
          );
        })}

        {/* Add source button */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => dispatch({ type: 'ADD_INCOME_SOURCE', payload: { monthId: activeMonth.id } })}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={22} color={COLORS.primary} />
          <Text style={styles.addBtnText}>Add Income Source</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

function StatPill({ label, value, color }) {
  return (
    <View style={styles.pill}>
      <Text style={[styles.pillValue, { color }]}>{value}</Text>
      <Text style={styles.pillLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16, paddingBottom: 32, gap: 12 },

  headerCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 14, padding: 18, alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 6,
  },
  headerLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 4 },
  headerValue: { color: COLORS.gold, fontSize: 28, fontWeight: '800' },

  sourceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12, padding: 14,
    borderLeftWidth: 4,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 3,
  },
  sourceTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sourceTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  sourceName: { fontSize: 15, fontWeight: '700', color: COLORS.textDark },

  amountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  amountLabel: { fontSize: 13, color: COLORS.textMid },
  amountValue: { fontSize: 22, fontWeight: '700' },

  statRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  pill: {
    flex: 1, backgroundColor: COLORS.background,
    borderRadius: 8, padding: 8, alignItems: 'center',
  },
  pillValue: { fontSize: 12, fontWeight: '700' },
  pillLabel: { fontSize: 10, color: COLORS.textLight, marginTop: 2 },

  progressBg: { height: 6, backgroundColor: COLORS.border, borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: 6, borderRadius: 3 },
  progressLabel: { fontSize: 10, color: COLORS.textLight, textAlign: 'right' },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 12,
    borderWidth: 1.5, borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  addBtnText: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
});
