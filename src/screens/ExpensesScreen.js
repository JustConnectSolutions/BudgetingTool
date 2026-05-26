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
const SOURCE_COLORS = ['#0D47A1', '#22B573', '#D4AF37', '#7B1FA2', '#F57C00'];

const CATEGORY_ICONS = {
  'HOUSING': 'home',
  'TRANSPORTATION': 'car',
  'INSURANCE': 'shield-checkmark',
  'BNPL': 'card',
  'PETS': 'paw',
  'PERSONAL CARE': 'person',
  'BEA': 'school',
  'DAILY EXPENSES': 'basket',
  'CREDIT CARD': 'card-outline',
  'LOANS': 'cash',
  'AD HOC': 'star',
  'SAVINGS': 'save',
};

export default function ExpensesScreen() {
  const { activeMonth, dispatch, computedValues } = useBudget();
  const [expanded, setExpanded] = useState({});

  if (!activeMonth) return null;
  const { totalExpense, categoryTotals } = computedValues;
  const numSrc = activeMonth.incomeSources.length;

  const toggleCat = (name) => setExpanded(p => ({ ...p, [name]: !p[name] }));

  return (
    <View style={styles.screen}>
      <MonthSelector />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Total Expense Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerLabel}>Total Projected Monthly Expense</Text>
          <Text style={styles.headerValue}>{fmt(totalExpense)}</Text>
        </View>

        {/* Source labels legend */}
        <View style={styles.legendRow}>
          {activeMonth.incomeSources.map((s, i) => (
            <View key={s.id} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: SOURCE_COLORS[i % SOURCE_COLORS.length] }]} />
              <Text style={styles.legendText} numberOfLines={1}>{s.name}</Text>
            </View>
          ))}
        </View>

        {/* Categories */}
        {activeMonth.categories.map((cat, ci) => {
          const catData = categoryTotals.find(c => c.name === cat.name) || { total: 0, perSource: [] };
          const isOpen = expanded[cat.name];
          const icon = CATEGORY_ICONS[cat.name] || 'list';

          return (
            <View key={cat.name} style={styles.catCard}>
              {/* Category header */}
              <TouchableOpacity style={styles.catHeader} onPress={() => toggleCat(cat.name)} activeOpacity={0.8}>
                <View style={styles.catHeaderLeft}>
                  <View style={styles.catIconWrap}>
                    <Ionicons name={icon} size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.catName}>{cat.name}</Text>
                </View>
                <View style={styles.catHeaderRight}>
                  <Text style={styles.catTotal}>{fmt(catData.total)}</Text>
                  <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color={COLORS.primary} />
                </View>
              </TouchableOpacity>

              {/* Per-source mini bars */}
              <View style={styles.catSourceRow}>
                {activeMonth.incomeSources.map((s, i) => (
                  <View key={s.id} style={styles.catSourcePill}>
                    <View style={[styles.catSourceDot, { backgroundColor: SOURCE_COLORS[i % SOURCE_COLORS.length] }]} />
                    <Text style={styles.catSourceAmt}>{fmt(catData.perSource[i] || 0)}</Text>
                  </View>
                ))}
              </View>

              {/* Expanded items */}
              {isOpen && (
                <View style={styles.itemsContainer}>
                  {/* Column headers */}
                  <View style={styles.itemHeaderRow}>
                    <Text style={[styles.colHdr, { flex: 2 }]}>Description</Text>
                    <Text style={[styles.colHdr, { flex: 1, textAlign: 'center' }]}>Due</Text>
                    <Text style={[styles.colHdr, { flex: 1, textAlign: 'right' }]}>Total</Text>
                  </View>
                  {/* Source amounts header */}
                  <View style={[styles.itemHeaderRow, { marginBottom: 8 }]}>
                    <Text style={[styles.colHdr, { flex: 2 }]}>Source Allocation:</Text>
                    {activeMonth.incomeSources.map((s, i) => (
                      <Text key={s.id} style={[styles.colHdr, { flex: 1, textAlign: 'right', color: SOURCE_COLORS[i % SOURCE_COLORS.length] }]} numberOfLines={1}>
                        {s.name.split(' ')[0]}
                      </Text>
                    ))}
                  </View>

                  {cat.items.map(item => (
                    <View key={item.id} style={styles.itemRow}>
                      <View style={styles.itemTopRow}>
                        <EditableField
                          value={item.description}
                          onSave={v => dispatch({ type: 'UPDATE_EXPENSE_ITEM', payload: { monthId: activeMonth.id, categoryName: cat.name, itemId: item.id, field: 'description', value: v } })}
                          textStyle={styles.itemDesc}
                          style={{ flex: 2 }}
                        />
                        <EditableField
                          value={item.due}
                          onSave={v => dispatch({ type: 'UPDATE_EXPENSE_ITEM', payload: { monthId: activeMonth.id, categoryName: cat.name, itemId: item.id, field: 'due', value: v } })}
                          textStyle={styles.itemDue}
                          style={{ flex: 1 }}
                          align="center"
                        />
                        <EditableField
                          value={item.total}
                          onSave={v => dispatch({ type: 'UPDATE_EXPENSE_ITEM', payload: { monthId: activeMonth.id, categoryName: cat.name, itemId: item.id, field: 'total', value: v } })}
                          numeric
                          prefix="$"
                          textStyle={styles.itemTotal}
                          style={{ flex: 1 }}
                          align="right"
                        />
                      </View>
                      {/* Source amounts row */}
                      <View style={styles.sourceAmtRow}>
                        <Text style={[styles.sourceAmtLabel, { flex: 2 }]}>Allocated:</Text>
                        {activeMonth.incomeSources.map((s, i) => (
                          <EditableField
                            key={s.id}
                            value={item.sourceAmounts[i] || 0}
                            onSave={v => dispatch({ type: 'UPDATE_EXPENSE_SOURCE_AMOUNT', payload: { monthId: activeMonth.id, categoryName: cat.name, itemId: item.id, sourceIndex: i, value: v } })}
                            numeric
                            prefix="$"
                            textStyle={[styles.srcAmt, { color: SOURCE_COLORS[i % SOURCE_COLORS.length] }]}
                            style={{ flex: 1 }}
                            align="right"
                          />
                        ))}
                        <TouchableOpacity onPress={() => Alert.alert('Delete', `Delete "${item.description}"?`, [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Delete', style: 'destructive', onPress: () => dispatch({ type: 'DELETE_EXPENSE_ITEM', payload: { monthId: activeMonth.id, categoryName: cat.name, itemId: item.id } }) },
                        ])} style={{ paddingLeft: 8 }}>
                          <Ionicons name="trash-outline" size={14} color="#E53935" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.itemDivider} />
                    </View>
                  ))}

                  {/* Subtotal row */}
                  <View style={styles.subtotalRow}>
                    <Text style={[styles.subtotalLabel, { flex: 2 }]}>Subtotal</Text>
                    <Text style={[styles.subtotalTotal, { flex: 1, textAlign: 'right' }]}>{fmt(catData.total)}</Text>
                  </View>
                  <View style={styles.subtotalSrcRow}>
                    <Text style={[styles.sourceAmtLabel, { flex: 2 }]}>Per source:</Text>
                    {activeMonth.incomeSources.map((s, i) => (
                      <Text key={s.id} style={[styles.subtotalSrc, { flex: 1, textAlign: 'right', color: SOURCE_COLORS[i % SOURCE_COLORS.length] }]}>
                        {fmt(catData.perSource[i] || 0)}
                      </Text>
                    ))}
                    <View style={{ width: 22 }} />
                  </View>

                  <TouchableOpacity style={styles.addItemBtn}
                    onPress={() => dispatch({ type: 'ADD_EXPENSE_ITEM', payload: { monthId: activeMonth.id, categoryName: cat.name, numSources: numSrc } })}>
                    <Ionicons name="add" size={14} color={COLORS.green} />
                    <Text style={styles.addItemText}>Add Item</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}

        {/* Add Category */}
        <TouchableOpacity style={styles.addCatBtn}
          onPress={() => {
            Alert.prompt('New Category', 'Category name:', name => {
              if (name) dispatch({ type: 'ADD_CATEGORY', payload: { monthId: activeMonth.id, categoryName: name.toUpperCase(), numSources: numSrc } });
            });
          }}>
          <Ionicons name="add-circle" size={20} color={COLORS.primary} />
          <Text style={styles.addCatText}>Add Category</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16, paddingBottom: 32, gap: 12 },

  headerCard: {
    backgroundColor: '#E53935', borderRadius: 14, padding: 18, alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 6,
  },
  headerLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 4 },
  headerValue: { color: '#fff', fontSize: 28, fontWeight: '800' },

  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.white, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: COLORS.textMid, maxWidth: 80 },

  catCard: {
    backgroundColor: COLORS.white, borderRadius: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 3, overflow: 'hidden',
  },
  catHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 14, backgroundColor: COLORS.white,
  },
  catHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  catIconWrap: { width: 30, height: 30, borderRadius: 8, backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center' },
  catName: { fontSize: 14, fontWeight: '700', color: COLORS.textDark },
  catHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  catTotal: { fontSize: 14, fontWeight: '700', color: COLORS.primary },

  catSourceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: 14, paddingBottom: 10 },
  catSourcePill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.background, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3 },
  catSourceDot: { width: 6, height: 6, borderRadius: 3 },
  catSourceAmt: { fontSize: 11, color: COLORS.textMid, fontWeight: '500' },

  itemsContainer: { borderTopWidth: 1, borderTopColor: COLORS.border, padding: 14, backgroundColor: '#FAFBFD' },
  itemHeaderRow: { flexDirection: 'row', marginBottom: 4 },
  colHdr: { fontSize: 10, fontWeight: '700', color: COLORS.textLight, textTransform: 'uppercase', letterSpacing: 0.5 },

  itemRow: { marginBottom: 4 },
  itemTopRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  itemDesc: { fontSize: 13, color: COLORS.textDark },
  itemDue: { fontSize: 11, color: COLORS.textMid },
  itemTotal: { fontSize: 13, fontWeight: '600', color: COLORS.textDark },
  sourceAmtRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, marginLeft: 4 },
  sourceAmtLabel: { fontSize: 10, color: COLORS.textLight },
  srcAmt: { fontSize: 11, fontWeight: '600' },
  itemDivider: { height: 1, backgroundColor: COLORS.border, marginTop: 8, marginBottom: 4 },

  subtotalRow: { flexDirection: 'row', paddingTop: 8 },
  subtotalLabel: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  subtotalTotal: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  subtotalSrcRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  subtotalSrc: { fontSize: 11, fontWeight: '700' },

  addItemBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, marginTop: 10, padding: 8,
    backgroundColor: COLORS.lightGreen, borderRadius: 8,
  },
  addItemText: { color: COLORS.green, fontSize: 12, fontWeight: '600' },

  addCatBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, padding: 14,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 12, borderWidth: 1.5, borderColor: COLORS.primary, borderStyle: 'dashed',
  },
  addCatText: { color: COLORS.primary, fontSize: 14, fontWeight: '600' },
});
