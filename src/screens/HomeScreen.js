import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/initialData';
import { useBudget } from '../context/BudgetContext';
import MonthSelector from '../components/MonthSelector';

const fmt = (n) => `$${Math.abs(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function HomeScreen({ navigation }) {
  const { activeMonth, computedValues } = useBudget();

  if (!activeMonth || !computedValues) {
    return <View style={styles.empty}><Text style={styles.emptyText}>No month data</Text></View>;
  }

  const {
    totalIncome, totalExpense, totalDifference,
    incomePerSource, expensePerSource, differencePerSource,
    totalDebits, paidDebits,
  } = computedValues;

  const paidPct = totalDebits > 0 ? Math.round((paidDebits / totalDebits) * 100) : 0;

  return (
    <View style={styles.screen}>
      <MonthSelector />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── TOTALS HEADER ── */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>{activeMonth.label}</Text>
          <View style={styles.headerRow}>
            <MetricBox label="Total Income" value={fmt(totalIncome)} color={COLORS.green} icon="trending-up" />
            <MetricBox label="Total Expense" value={fmt(totalExpense)} color="#E53935" icon="trending-down" />
          </View>
          <View style={[styles.diffBanner, { backgroundColor: totalDifference >= 0 ? COLORS.green : '#E53935' }]}>
            <Ionicons name={totalDifference >= 0 ? 'checkmark-circle' : 'alert-circle'} size={20} color="#fff" />
            <Text style={styles.diffLabel}>Net {totalDifference >= 0 ? 'Surplus' : 'Deficit'}</Text>
            <Text style={styles.diffValue}>{totalDifference >= 0 ? '+' : '-'}{fmt(totalDifference)}</Text>
          </View>
        </View>

        {/* ── PER-SOURCE BREAKDOWN (req 1,2,3,8) ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Income vs Expense per Source</Text>
          {activeMonth.incomeSources.map((src, i) => {
            const inc = incomePerSource[i] || 0;
            const exp = expensePerSource[i] || 0;
            const diff = differencePerSource[i] || 0;
            const isPos = diff >= 0;
            return (
              <View key={src.id} style={styles.sourceRow}>
                <View style={styles.sourceHeader}>
                  <View style={[styles.sourceDot, { backgroundColor: sourceColor(i) }]} />
                  <Text style={styles.sourceName}>{src.name}</Text>
                </View>
                <View style={styles.sourceMetrics}>
                  <SourceMetric label="Income" value={fmt(inc)} color={COLORS.green} />
                  <SourceMetric label="Expense" value={fmt(exp)} color="#E53935" />
                  <SourceMetric
                    label="Difference"
                    value={(isPos ? '+' : '-') + fmt(diff)}
                    color={isPos ? COLORS.green : '#E53935'}
                    bold
                  />
                </View>
                {/* Progress bar */}
                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, {
                    width: `${Math.min(100, inc > 0 ? (exp / inc) * 100 : 0)}%`,
                    backgroundColor: isPos ? COLORS.green : '#E53935',
                  }]} />
                </View>
                <Text style={styles.progressLabel}>
                  {inc > 0 ? Math.round((exp / inc) * 100) : 0}% of income used
                </Text>
              </View>
            );
          })}
        </View>

        {/* ── DIRECT DEBITS PROGRESS ── */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DirectDebits')} activeOpacity={0.85}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>Direct Debits</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
          </View>
          <View style={styles.debitProgress}>
            <View style={styles.debitProgressBar}>
              <View style={[styles.debitProgressFill, { width: `${paidPct}%` }]} />
            </View>
            <Text style={styles.debitProgressText}>{paidPct}% paid ({fmt(paidDebits)} of {fmt(totalDebits)})</Text>
          </View>
          <View style={styles.debitStats}>
            <View style={styles.debitStat}>
              <Text style={styles.debitStatNum}>{activeMonth.directDebits.filter(d => d.paid).length}</Text>
              <Text style={styles.debitStatLabel}>Paid</Text>
            </View>
            <View style={[styles.debitStat, { borderLeftWidth: 1, borderColor: COLORS.border }]}>
              <Text style={[styles.debitStatNum, { color: '#E53935' }]}>{activeMonth.directDebits.filter(d => !d.paid).length}</Text>
              <Text style={styles.debitStatLabel}>Pending</Text>
            </View>
            <View style={[styles.debitStat, { borderLeftWidth: 1, borderColor: COLORS.border }]}>
              <Text style={[styles.debitStatNum, { color: COLORS.gold }]}>{activeMonth.directDebits.length}</Text>
              <Text style={styles.debitStatLabel}>Total Bills</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* ── QUICK LINKS ── */}
        <View style={styles.quickLinks}>
          {[
            { icon: 'wallet', label: 'Income', screen: 'Income' },
            { icon: 'receipt', label: 'Expenses', screen: 'Expenses' },
            { icon: 'business', label: 'Banks', screen: 'Banks' },
            { icon: 'calendar', label: 'Months', screen: 'Months' },
          ].map(q => (
            <TouchableOpacity key={q.screen} style={styles.quickLink} onPress={() => navigation.navigate(q.screen)} activeOpacity={0.8}>
              <View style={styles.quickLinkIcon}>
                <Ionicons name={q.icon} size={22} color={COLORS.primary} />
              </View>
              <Text style={styles.quickLinkLabel}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

function MetricBox({ label, value, color, icon }) {
  return (
    <View style={[styles.metricBox, { borderTopColor: color }]}>
      <Ionicons name={icon} size={18} color={color} style={{ marginBottom: 4 }} />
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function SourceMetric({ label, value, color, bold }) {
  return (
    <View style={styles.srcMetric}>
      <Text style={[styles.srcMetricVal, { color }, bold && { fontWeight: '700', fontSize: 13 }]}>{value}</Text>
      <Text style={styles.srcMetricLbl}>{label}</Text>
    </View>
  );
}

const SOURCE_COLORS = ['#0D47A1', '#22B573', '#D4AF37', '#7B1FA2', '#F57C00'];
const sourceColor = (i) => SOURCE_COLORS[i % SOURCE_COLORS.length];

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16, paddingBottom: 32, gap: 14 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: COLORS.textMid },

  headerCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 18,
    gap: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  headerRow: { flexDirection: 'row', gap: 10 },
  metricBox: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12, padding: 12, alignItems: 'center',
    borderTopWidth: 3,
  },
  metricValue: { fontSize: 16, fontWeight: '700', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  diffBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderRadius: 10, padding: 10, gap: 8,
  },
  diffLabel: { color: '#fff', fontSize: 14, flex: 1 },
  diffValue: { color: '#fff', fontSize: 16, fontWeight: '700' },

  card: {
    backgroundColor: COLORS.white, borderRadius: 14, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.primary, marginBottom: 12 },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },

  sourceRow: { marginBottom: 16 },
  sourceHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  sourceDot: { width: 10, height: 10, borderRadius: 5 },
  sourceName: { fontSize: 13, fontWeight: '600', color: COLORS.textDark },
  sourceMetrics: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  srcMetric: { flex: 1, alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 8, padding: 8 },
  srcMetricVal: { fontSize: 12, fontWeight: '600' },
  srcMetricLbl: { fontSize: 10, color: COLORS.textLight, marginTop: 2 },

  progressBg: { height: 6, backgroundColor: COLORS.border, borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: 6, borderRadius: 3 },
  progressLabel: { fontSize: 10, color: COLORS.textLight, textAlign: 'right' },

  debitProgress: { marginBottom: 12 },
  debitProgressBar: { height: 8, backgroundColor: COLORS.border, borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  debitProgressFill: { height: 8, backgroundColor: COLORS.green, borderRadius: 4 },
  debitProgressText: { fontSize: 12, color: COLORS.textMid, textAlign: 'center' },
  debitStats: { flexDirection: 'row' },
  debitStat: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  debitStatNum: { fontSize: 20, fontWeight: '700', color: COLORS.primary },
  debitStatLabel: { fontSize: 11, color: COLORS.textLight },

  quickLinks: { flexDirection: 'row', gap: 10 },
  quickLink: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: 12, padding: 12,
    alignItems: 'center', gap: 8,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 3,
  },
  quickLinkIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center',
  },
  quickLinkLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textDark, textAlign: 'center' },
});
