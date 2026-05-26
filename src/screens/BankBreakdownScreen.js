import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/initialData';
import { useBudget } from '../context/BudgetContext';
import MonthSelector from '../components/MonthSelector';
import EditableField from '../components/EditableField';

const fmt = (n) => `$${(parseFloat(n) || 0).toFixed(2)}`;
const SOURCE_COLORS = ['#0D47A1', '#22B573', '#D4AF37', '#7B1FA2', '#F57C00'];

export default function BankBreakdownScreen() {
  const { activeMonth, dispatch } = useBudget();
  if (!activeMonth) return null;

  const sources = activeMonth.incomeSources;

  // Row totals
  const rowTotals = activeMonth.bankBreakdown.map(row =>
    row.values.reduce((sum, v) => sum + (parseFloat(v) || 0), 0)
  );

  // Column totals
  const colTotals = sources.map((_, si) =>
    activeMonth.bankBreakdown.reduce((sum, row) => sum + (parseFloat(row.values[si]) || 0), 0)
  );
  const grandTotal = colTotals.reduce((a, b) => a + b, 0);

  return (
    <View style={styles.screen}>
      <MonthSelector />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Bank Account Breakdown</Text>
          <Text style={styles.headerSub}>Amount per bank per income source</Text>
        </View>

        <View style={styles.tableCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View>
              {/* Header Row */}
              <View style={styles.tableHeaderRow}>
                <View style={styles.bankCell}>
                  <Text style={styles.thText}>Bank Account</Text>
                </View>
                {sources.map((s, i) => (
                  <View key={s.id} style={[styles.valueCell, { borderBottomColor: SOURCE_COLORS[i % SOURCE_COLORS.length] }]}>
                    <Text style={[styles.thText, { color: SOURCE_COLORS[i % SOURCE_COLORS.length] }]} numberOfLines={2}>
                      {s.name}
                    </Text>
                  </View>
                ))}
                <View style={[styles.totalCell]}>
                  <Text style={styles.thText}>Total</Text>
                </View>
              </View>

              {/* Data Rows */}
              {activeMonth.bankBreakdown.map((row, ri) => (
                <View key={ri} style={[styles.tableRow, ri % 2 === 1 && styles.tableRowAlt]}>
                  <View style={styles.bankCell}>
                    <EditableField
                      value={row.bank}
                      onSave={v => dispatch({ type: 'UPDATE_BANK_ROW', payload: { monthId: activeMonth.id, rowIndex: ri, field: 'bank', value: v } })}
                      textStyle={styles.bankText}
                    />
                  </View>
                  {sources.map((s, si) => (
                    <View key={s.id} style={styles.valueCell}>
                      <EditableField
                        value={row.values[si] || 0}
                        onSave={v => dispatch({ type: 'UPDATE_BANK_ROW', payload: { monthId: activeMonth.id, rowIndex: ri, field: 'value', value: v, valueIndex: si } })}
                        numeric
                        prefix="$"
                        textStyle={styles.valueText}
                        align="right"
                      />
                    </View>
                  ))}
                  <View style={styles.totalCell}>
                    <Text style={styles.rowTotalText}>{fmt(rowTotals[ri])}</Text>
                  </View>
                  <TouchableOpacity onPress={() => Alert.alert('Delete Row', `Remove "${row.bank}"?`, [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => dispatch({ type: 'DELETE_BANK_ROW', payload: { monthId: activeMonth.id, rowIndex: ri } }) },
                  ])} style={styles.deleteRowBtn}>
                    <Ionicons name="remove-circle" size={16} color="#E53935" />
                  </TouchableOpacity>
                </View>
              ))}

              {/* Totals Footer Row */}
              <View style={[styles.tableRow, styles.footerRow]}>
                <View style={styles.bankCell}>
                  <Text style={styles.footerLabel}>TOTALS</Text>
                </View>
                {colTotals.map((ct, si) => (
                  <View key={si} style={styles.valueCell}>
                    <Text style={[styles.footerValue, { color: SOURCE_COLORS[si % SOURCE_COLORS.length] }]}>{fmt(ct)}</Text>
                  </View>
                ))}
                <View style={styles.totalCell}>
                  <Text style={[styles.footerValue, { color: COLORS.primary }]}>{fmt(grandTotal)}</Text>
                </View>
                <View style={{ width: 28 }} />
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Add Bank Row */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => dispatch({ type: 'ADD_BANK_ROW', payload: { monthId: activeMonth.id, numSources: sources.length } })}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={22} color={COLORS.primary} />
          <Text style={styles.addBtnText}>Add Bank Account Row</Text>
        </TouchableOpacity>

        {/* Source totals summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Income Allocated to Banks</Text>
          {sources.map((s, i) => (
            <View key={s.id} style={styles.summaryRow}>
              <View style={[styles.summaryDot, { backgroundColor: SOURCE_COLORS[i % SOURCE_COLORS.length] }]} />
              <Text style={styles.summaryLabel}>{s.name}</Text>
              <Text style={[styles.summaryValue, { color: SOURCE_COLORS[i % SOURCE_COLORS.length] }]}>{fmt(colTotals[i])}</Text>
            </View>
          ))}
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <View style={[styles.summaryDot, { backgroundColor: COLORS.gold }]} />
            <Text style={[styles.summaryLabel, { fontWeight: '700' }]}>Grand Total</Text>
            <Text style={[styles.summaryValue, { color: COLORS.primary, fontWeight: '700' }]}>{fmt(grandTotal)}</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16, paddingBottom: 32, gap: 12 },

  headerCard: {
    backgroundColor: COLORS.gold, borderRadius: 14, padding: 16, alignItems: 'center',
    elevation: 3,
  },
  headerTitle: { color: COLORS.primary, fontSize: 17, fontWeight: '800' },
  headerSub: { color: COLORS.textDark, fontSize: 12, marginTop: 2, opacity: 0.7 },

  tableCard: {
    backgroundColor: COLORS.white, borderRadius: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 3, overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row', backgroundColor: COLORS.primary,
    paddingVertical: 10, alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  tableRowAlt: { backgroundColor: '#F8F9FF' },
  footerRow: { backgroundColor: COLORS.lightBlue, borderBottomWidth: 0 },

  bankCell: { width: 140, paddingHorizontal: 10 },
  valueCell: { width: 90, paddingHorizontal: 6, alignItems: 'flex-end', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  totalCell: { width: 80, paddingHorizontal: 6, alignItems: 'flex-end' },

  thText: { fontSize: 11, fontWeight: '700', color: '#fff', textAlign: 'center' },
  bankText: { fontSize: 12, color: COLORS.textDark, fontWeight: '500' },
  valueText: { fontSize: 12, color: COLORS.textDark },
  rowTotalText: { fontSize: 12, fontWeight: '700', color: COLORS.primary, textAlign: 'right' },
  footerLabel: { fontSize: 12, fontWeight: '800', color: COLORS.primary },
  footerValue: { fontSize: 12, fontWeight: '800' },
  deleteRowBtn: { width: 28, alignItems: 'center' },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14, backgroundColor: COLORS.lightGold,
    borderRadius: 12, borderWidth: 1.5, borderColor: COLORS.gold, borderStyle: 'dashed',
  },
  addBtnText: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },

  summaryCard: {
    backgroundColor: COLORS.white, borderRadius: 12, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 3,
  },
  summaryTitle: { fontSize: 14, fontWeight: '700', color: COLORS.primary, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  summaryDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  summaryLabel: { flex: 1, fontSize: 13, color: COLORS.textDark },
  summaryValue: { fontSize: 13, fontWeight: '600' },
  summaryDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
});
