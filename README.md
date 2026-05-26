# Budget Tracker App - Expo Setup Guide

## Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS or Android)

## Quick Start
1. Extract the zip file
2. Run: `npm install`
3. Run: `npx expo start`
4. Scan the QR code with Expo Go

## Project Structure
```
BudgetApp/
├── App.js                    # Root navigator
├── app.json                  # Expo config
├── package.json
├── src/
│   ├── data/
│   │   └── initialData.js    # All your spreadsheet data
│   ├── context/
│   │   └── BudgetContext.js  # Global state management
│   ├── screens/
│   │   ├── HomeScreen.js     # Dashboard / summary
│   │   ├── IncomeScreen.js   # Income per source
│   │   ├── ExpensesScreen.js # Expenses per category
│   │   ├── BankBreakdownScreen.js # Bank account table
│   │   ├── DirectDebitsScreen.js  # Checklist
│   │   └── MonthsScreen.js   # Month management
│   └── components/
│       ├── MonthSelector.js
│       ├── SummaryCard.js
│       └── EditableField.js
```
