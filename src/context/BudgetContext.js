import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialMonths, generateId } from '../data/initialData';

const BudgetContext = createContext(null);

const STORAGE_KEY = '@budget_tracker_data';

function budgetReducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, months: action.payload, loaded: true };

    case 'SET_ACTIVE_MONTH':
      return { ...state, activeMonthId: action.payload };

    case 'UPDATE_INCOME_SOURCE': {
      const { monthId, sourceId, field, value } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            incomeSources: m.incomeSources.map(s =>
              s.id !== sourceId ? s : { ...s, [field]: value }
            ),
          }
        ),
      };
    }

    case 'ADD_INCOME_SOURCE': {
      const { monthId } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            incomeSources: [
              ...m.incomeSources,
              { id: generateId(), name: 'New Source', amount: 0 },
            ],
            categories: m.categories.map(cat => ({
              ...cat,
              items: cat.items.map(item => ({
                ...item,
                sourceAmounts: [...item.sourceAmounts, 0],
              })),
            })),
            bankBreakdown: m.bankBreakdown.map(b => ({
              ...b,
              values: [...b.values, 0],
            })),
          }
        ),
      };
    }

    case 'DELETE_INCOME_SOURCE': {
      const { monthId, sourceIndex } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            incomeSources: m.incomeSources.filter((_, i) => i !== sourceIndex),
            categories: m.categories.map(cat => ({
              ...cat,
              items: cat.items.map(item => ({
                ...item,
                sourceAmounts: item.sourceAmounts.filter((_, i) => i !== sourceIndex),
              })),
            })),
            bankBreakdown: m.bankBreakdown.map(b => ({
              ...b,
              values: b.values.filter((_, i) => i !== sourceIndex),
            })),
          }
        ),
      };
    }

    case 'UPDATE_EXPENSE_ITEM': {
      const { monthId, categoryName, itemId, field, value } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            categories: m.categories.map(cat =>
              cat.name !== categoryName ? cat : {
                ...cat,
                items: cat.items.map(item =>
                  item.id !== itemId ? item : { ...item, [field]: value }
                ),
              }
            ),
          }
        ),
      };
    }

    case 'UPDATE_EXPENSE_SOURCE_AMOUNT': {
      const { monthId, categoryName, itemId, sourceIndex, value } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            categories: m.categories.map(cat =>
              cat.name !== categoryName ? cat : {
                ...cat,
                items: cat.items.map(item => {
                  if (item.id !== itemId) return item;
                  const newAmounts = [...item.sourceAmounts];
                  newAmounts[sourceIndex] = value;
                  return { ...item, sourceAmounts: newAmounts };
                }),
              }
            ),
          }
        ),
      };
    }

    case 'ADD_EXPENSE_ITEM': {
      const { monthId, categoryName, numSources } = action.payload;
      const newItem = {
        id: generateId(),
        description: 'New Item',
        due: '',
        total: 0,
        sourceAmounts: Array(numSources).fill(0),
      };
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            categories: m.categories.map(cat =>
              cat.name !== categoryName ? cat : {
                ...cat,
                items: [...cat.items, newItem],
              }
            ),
          }
        ),
      };
    }

    case 'DELETE_EXPENSE_ITEM': {
      const { monthId, categoryName, itemId } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            categories: m.categories.map(cat =>
              cat.name !== categoryName ? cat : {
                ...cat,
                items: cat.items.filter(item => item.id !== itemId),
              }
            ),
          }
        ),
      };
    }

    case 'ADD_CATEGORY': {
      const { monthId, categoryName, numSources } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            categories: [
              ...m.categories,
              { name: categoryName, items: [] },
            ],
          }
        ),
      };
    }

    case 'UPDATE_BANK_ROW': {
      const { monthId, rowIndex, field, value, valueIndex } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            bankBreakdown: m.bankBreakdown.map((row, i) => {
              if (i !== rowIndex) return row;
              if (field === 'bank') return { ...row, bank: value };
              const newValues = [...row.values];
              newValues[valueIndex] = value;
              return { ...row, values: newValues };
            }),
          }
        ),
      };
    }

    case 'ADD_BANK_ROW': {
      const { monthId, numSources } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            bankBreakdown: [
              ...m.bankBreakdown,
              { bank: 'New Account', values: Array(numSources).fill(0) },
            ],
          }
        ),
      };
    }

    case 'DELETE_BANK_ROW': {
      const { monthId, rowIndex } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            bankBreakdown: m.bankBreakdown.filter((_, i) => i !== rowIndex),
          }
        ),
      };
    }

    case 'TOGGLE_DIRECT_DEBIT': {
      const { monthId, debitId } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            directDebits: m.directDebits.map(d =>
              d.id !== debitId ? d : { ...d, paid: !d.paid }
            ),
          }
        ),
      };
    }

    case 'UPDATE_DIRECT_DEBIT': {
      const { monthId, debitId, field, value } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            directDebits: m.directDebits.map(d =>
              d.id !== debitId ? d : { ...d, [field]: value }
            ),
          }
        ),
      };
    }

    case 'ADD_DIRECT_DEBIT': {
      const { monthId } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            directDebits: [
              ...m.directDebits,
              { id: generateId(), day: 1, bill: 'New Bill', amount: 0, paid: false },
            ],
          }
        ),
      };
    }

    case 'DELETE_DIRECT_DEBIT': {
      const { monthId, debitId } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : {
            ...m,
            directDebits: m.directDebits.filter(d => d.id !== debitId),
          }
        ),
      };
    }

    case 'ADD_MONTH': {
      const { newMonth } = action.payload;
      return {
        ...state,
        months: [...state.months, newMonth],
        activeMonthId: newMonth.id,
      };
    }

    case 'DELETE_MONTH': {
      const { monthId } = action.payload;
      const filtered = state.months.filter(m => m.id !== monthId);
      return {
        ...state,
        months: filtered,
        activeMonthId: filtered.length > 0 ? filtered[filtered.length - 1].id : null,
      };
    }

    case 'UPDATE_MONTH_LABEL': {
      const { monthId, label } = action.payload;
      return {
        ...state,
        months: state.months.map(m =>
          m.id !== monthId ? m : { ...m, label }
        ),
      };
    }

    default:
      return state;
  }
}

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, {
    months: initialMonths,
    activeMonthId: initialMonths[initialMonths.length - 1]?.id || null,
    loaded: false,
  });

  // Load from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          dispatch({ type: 'LOAD_DATA', payload: parsed.months });
          if (parsed.activeMonthId) dispatch({ type: 'SET_ACTIVE_MONTH', payload: parsed.activeMonthId });
        } else {
          dispatch({ type: 'LOAD_DATA', payload: initialMonths });
        }
      } catch (e) {
        dispatch({ type: 'LOAD_DATA', payload: initialMonths });
      }
    })();
  }, []);

  // Persist on changes
  useEffect(() => {
    if (!state.loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ months: state.months, activeMonthId: state.activeMonthId })).catch(() => {});
  }, [state.months, state.activeMonthId, state.loaded]);

  const activeMonth = state.months.find(m => m.id === state.activeMonthId) || state.months[0];

  // Computed values for the active month
  const computedValues = activeMonth ? computeMonthValues(activeMonth) : null;

  return (
    <BudgetContext.Provider value={{ state, dispatch, activeMonth, computedValues }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error('useBudget must be used inside BudgetProvider');
  return ctx;
}

export function computeMonthValues(month) {
  const totalIncome = month.incomeSources.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);

  // Total expense per source
  const numSources = month.incomeSources.length;
  const expensePerSource = Array(numSources).fill(0);
  let totalExpense = 0;

  month.categories.forEach(cat => {
    cat.items.forEach(item => {
      const itemTotal = parseFloat(item.total) || 0;
      totalExpense += itemTotal;
      item.sourceAmounts.forEach((amt, i) => {
        expensePerSource[i] = (expensePerSource[i] || 0) + (parseFloat(amt) || 0);
      });
    });
  });

  const incomePerSource = month.incomeSources.map(s => parseFloat(s.amount) || 0);
  const differencePerSource = incomePerSource.map((inc, i) => inc - (expensePerSource[i] || 0));
  const totalDifference = totalIncome - totalExpense;

  // Category totals per source
  const categoryTotals = month.categories.map(cat => {
    const perSource = Array(numSources).fill(0);
    let catTotal = 0;
    cat.items.forEach(item => {
      catTotal += parseFloat(item.total) || 0;
      item.sourceAmounts.forEach((amt, i) => {
        perSource[i] = (perSource[i] || 0) + (parseFloat(amt) || 0);
      });
    });
    return { name: cat.name, total: catTotal, perSource };
  });

  // Direct debits
  const totalDebits = month.directDebits.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
  const paidDebits = month.directDebits.filter(d => d.paid).reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

  return {
    totalIncome,
    totalExpense,
    totalDifference,
    incomePerSource,
    expensePerSource,
    differencePerSource,
    categoryTotals,
    totalDebits,
    paidDebits,
    numSources,
  };
}

export function duplicateMonth(sourceMonth, newLabel) {
  const newId = generateId();
  return {
    ...JSON.parse(JSON.stringify(sourceMonth)),
    id: newId,
    label: newLabel,
    directDebits: sourceMonth.directDebits.map(d => ({
      ...d,
      id: generateId(),
      paid: false,
    })),
    categories: sourceMonth.categories.map(cat => ({
      ...cat,
      items: cat.items.map(item => ({ ...item, id: generateId() })),
    })),
  };
}
