// ============================================================
// BUDGET TRACKER - Initial Data (from 2026_Bill_Paying_Checklist.xlsx)
// ============================================================

export const COLORS = {
  primary: '#0D47A1',
  green: '#22B573',
  gold: '#D4AF37',
  background: '#F5F7FA',
  white: '#FFFFFF',
  red: '#E53935',
  lightBlue: '#E3F2FD',
  lightGold: '#FFF8E1',
  lightGreen: '#E8F5E9',
  border: '#DEE5F0',
  textDark: '#1A237E',
  textMid: '#455A64',
  textLight: '#90A4AE',
  cardBg: '#FFFFFF',
  navBg: '#0D47A1',
};

export const CATEGORY_ORDER = [
  'HOUSING',
  'TRANSPORTATION',
  'INSURANCE',
  'BNPL',
  'PETS',
  'PERSONAL CARE',
  'BEA',
  'DAILY EXPENSES',
  'CREDIT CARD',
  'LOANS',
  'AD HOC',
  'SAVINGS',
];

export const initialMonths = [
  // ─────────────── JANUARY 2026 ───────────────
  {
    id: 'jan2026',
    label: 'January 2026',
    incomeSources: [
      { id: 's1', name: 'Ayuda 3rd', amount: 4069.94 },
      { id: 's2', name: 'Ayuda 17th', amount: 3475.32 },
      { id: 's3', name: 'Salary (46044)', amount: 2316 },
    ],
    bankBreakdown: [
      { bank: 'Bills Payment 6498', values: [360.15, 352.29, 265.51] },
      { bank: 'Rents and Loans 3876', values: [1856, 1545, 640] },
      { bank: 'Visa Savings - Up Savers', values: [81.40, 69.51, 46.32] },
      { bank: 'Credit Card 4806', values: [300, 0, 0] },
      { bank: 'UP Bills 3703', values: [654.36, 346, 19] },
      { bank: 'ING Everyday', values: [0, 899, 214] },
      { bank: 'ING Savings', values: [790.76, 0, 910.76] },
    ],
    categories: [
      {
        name: 'HOUSING',
        items: [
          { id: 'h1', description: 'House Rent', due: 'Thursdays Weekly', total: 3200, sourceAmounts: [1280, 1280, 640] },
          { id: 'h2', description: 'Electricity - Winconnect', due: 'Monthly', total: 181.85, sourceAmounts: [162.85, 0, 19] },
          { id: 'h3', description: 'Water', due: 'Quarterly', total: 0, sourceAmounts: [0, 0, 0] },
          { id: 'h4', description: 'Aussie Broadband', due: '3rd Monthly', total: 96, sourceAmounts: [96, 0, 0] },
        ],
      },
      {
        name: 'TRANSPORTATION',
        items: [
          { id: 't1', description: 'Car Mortgage', due: '21st Monthly', total: 1581.52, sourceAmounts: [790.76, 0, 790.76] },
          { id: 't2', description: 'Car Registration', due: '2nd Monthly', total: 72.2, sourceAmounts: [72.2, 0, 0] },
        ],
      },
      {
        name: 'INSURANCE',
        items: [
          { id: 'i1', description: 'Bupa Medical', due: '3rd Monthly', total: 279, sourceAmounts: [279, 0, 0] },
          { id: 'i2', description: 'H&C Suncorp', due: '30th Monthly', total: 27, sourceAmounts: [0, 27, 0] },
          { id: 'i3', description: 'WW Pet Insurance', due: '2nd Monthly', total: 32.31, sourceAmounts: [32.31, 0, 0] },
          { id: 'i4', description: 'NRMA Car', due: '13th Monthly', total: 136, sourceAmounts: [0, 136, 0] },
        ],
      },
      {
        name: 'BNPL',
        items: [
          { id: 'b1', description: 'Afterpay', due: 'Weekly', total: 0, sourceAmounts: [0, 0, 0] },
          { id: 'b2', description: 'Step Pay', due: 'Weekly', total: 947.95, sourceAmounts: [330.15, 352.29, 265.51] },
          { id: 'b3', description: 'Zip Money', due: 'Monthly', total: 40, sourceAmounts: [0, 0, 40] },
          { id: 'b4', description: 'Zip Plus', due: 'Monthly', total: 80, sourceAmounts: [0, 0, 80] },
        ],
      },
      {
        name: 'PETS',
        items: [
          { id: 'p1', description: 'Food', due: 'Monthly', total: 30, sourceAmounts: [0, 0, 30] },
          { id: 'p2', description: 'Grooming', due: 'Quarterly', total: 0, sourceAmounts: [0, 0, 0] },
          { id: 'p3', description: 'Emergency Doc', due: '', total: 0, sourceAmounts: [0, 0, 0] },
          { id: 'p4', description: 'Cattery', due: '', total: 0, sourceAmounts: [0, 0, 0] },
        ],
      },
      {
        name: 'PERSONAL CARE',
        items: [
          { id: 'pc1', description: 'Youtube', due: '28th Monthly', total: 17, sourceAmounts: [0, 17, 0] },
          { id: 'pc2', description: 'Microsoft', due: '5th Monthly', total: 12, sourceAmounts: [12, 0, 0] },
          { id: 'pc3', description: 'Linkt', due: 'Bills Payment', total: 20, sourceAmounts: [0, 20, 0] },
          { id: 'pc4', description: 'Telstra Phone', due: '19th Monthly', total: 146, sourceAmounts: [0, 146, 0] },
          { id: 'pc5', description: 'Gym', due: '', total: 0, sourceAmounts: [0, 0, 0] },
        ],
      },
      {
        name: 'BEA',
        items: [
          { id: 'bea1', description: 'School Fees', due: '', total: 265, sourceAmounts: [0, 265, 0] },
          { id: 'bea2', description: 'Lunch Money', due: 'Monthly', total: 200, sourceAmounts: [100, 100, 0] },
          { id: 'bea3', description: 'Phone Recharge', due: '3rd Monthly', total: 30, sourceAmounts: [30, 0, 0] },
          { id: 'bea4', description: 'Volleyball', due: 'Quarterly', total: 299, sourceAmounts: [0, 299, 0] },
        ],
      },
      {
        name: 'DAILY EXPENSES',
        items: [
          { id: 'de1', description: 'Credit Card to Close', due: '', total: 300, sourceAmounts: [300, 0, 0] },
          { id: 'de2', description: 'Petrol, Grocery, Eat Out', due: 'Total Monthly', total: 484, sourceAmounts: [0, 300, 184] },
        ],
      },
      {
        name: 'LOANS',
        items: [
          { id: 'l1', description: 'Mama Personal', due: 'Monthly', total: 576, sourceAmounts: [576, 0, 0] },
        ],
      },
      {
        name: 'AD HOC',
        items: [
          { id: 'ah1', description: 'School Uniform', due: '', total: 300, sourceAmounts: [0, 300, 0] },
          { id: 'ah2', description: 'School Supplies', due: '', total: 0, sourceAmounts: [0, 0, 0] },
        ],
      },
      {
        name: 'SAVINGS',
        items: [
          { id: 'sv1', description: 'Visa', due: 'Weekly', total: 197.23, sourceAmounts: [81.40, 69.51, 46.32] },
          { id: 'sv2', description: 'Savings', due: 'Weekly', total: 0, sourceAmounts: [0, 0, 0] },
          { id: 'sv3', description: 'BEA Savers', due: 'Weekly', total: 620, sourceAmounts: [200, 200, 220] },
        ],
      },
    ],
    directDebits: [
      { id: 'dd1', day: 2, bill: 'Car Registration', amount: 72.2, paid: false },
      { id: 'dd2', day: 2, bill: 'Pet Insurance', amount: 32.31, paid: false },
      { id: 'dd3', day: 3, bill: 'Bea Phone Recharge', amount: 30, paid: false },
      { id: 'dd4', day: 3, bill: 'Bupa Health', amount: 279, paid: false },
      { id: 'dd5', day: 4, bill: 'Aussie Broadband', amount: 96, paid: false },
      { id: 'dd6', day: 11, bill: 'Microsoft', amount: 12, paid: false },
      { id: 'dd7', day: 13, bill: 'Mama Loan', amount: 576, paid: false },
      { id: 'dd8', day: 13, bill: 'NRMA', amount: 136, paid: false },
      { id: 'dd9', day: 21, bill: 'Telstra', amount: 146, paid: false },
      { id: 'dd10', day: 21, bill: 'Angle Auto', amount: 1581.52, paid: false },
      { id: 'dd11', day: 27, bill: 'Credit Card', amount: 784, paid: false },
      { id: 'dd12', day: 28, bill: 'Zip Plus', amount: 80, paid: false },
      { id: 'dd13', day: 28, bill: 'Youtube', amount: 17, paid: false },
      { id: 'dd14', day: 29, bill: 'Zip Money', amount: 40, paid: false },
      { id: 'dd15', day: 30, bill: 'Bea School', amount: 265, paid: false },
      { id: 'dd16', day: 30, bill: 'Suncorp Home & Con', amount: 27, paid: false },
    ],
  },

  // ─────────────── FEBRUARY 2026 ───────────────
  {
    id: 'feb2026',
    label: 'February 2026',
    incomeSources: [
      { id: 's1', name: 'Ayuda 3rd', amount: 2124.49 },
      { id: 's2', name: 'Ayuda 17th', amount: 4244 },
      { id: 's3', name: 'Salary (46059)', amount: 2316 },
      { id: 's4', name: 'Salary (46073)', amount: 2316 },
    ],
    bankBreakdown: [
      { bank: 'Bills Payment 6498', values: [458.82, 369.08, 616.03, 435.24] },
      { bank: 'Rents and Loans 3876', values: [1216, 640, 640, 640] },
      { bank: 'Visa Savings - Up Savers', values: [42.49, 0, 46.32, 246.32] },
      { bank: 'Credit Card 4806', values: [0, 500, 0, 0] },
      { bank: 'UP Bills 3703', values: [654.31, 379, 166, 17] },
      { bank: 'ING Bills', values: [0, 0, 790.76, 910.76] },
      { bank: 'ING Expenses', values: [0, 2220, 0, 30] },
    ],
    categories: [
      {
        name: 'HOUSING',
        items: [
          { id: 'h1', description: 'House Rent', due: 'Thursdays Weekly', total: 2560, sourceAmounts: [640, 640, 640, 640] },
          { id: 'h2', description: 'Electricity - Winconnect', due: 'Monthly', total: 168, sourceAmounts: [168, 0, 0, 0] },
          { id: 'h3', description: 'Water/Sewer', due: 'Quarterly', total: 99.6, sourceAmounts: [0, 99.6, 0, 0] },
          { id: 'h4', description: 'Aussie Broadband', due: '3rd Monthly', total: 96, sourceAmounts: [96, 0, 0, 0] },
        ],
      },
      {
        name: 'TRANSPORTATION',
        items: [
          { id: 't1', description: 'Car Mortgage', due: '21st Monthly', total: 1581.52, sourceAmounts: [0, 0, 790.76, 790.76] },
          { id: 't2', description: 'Car Registration', due: '2nd Monthly', total: 72, sourceAmounts: [72, 0, 0, 0] },
        ],
      },
      {
        name: 'INSURANCE',
        items: [
          { id: 'i1', description: 'Bupa Medical', due: '3rd Monthly', total: 279, sourceAmounts: [279, 0, 0, 0] },
          { id: 'i2', description: 'H&C Suncorp', due: '30th Monthly', total: 27, sourceAmounts: [27, 0, 0, 0] },
          { id: 'i3', description: 'WW Pet Insurance', due: '2nd Monthly', total: 32.31, sourceAmounts: [32.31, 0, 0, 0] },
          { id: 'i4', description: 'NRMA Car', due: '13th Monthly', total: 136, sourceAmounts: [136, 0, 0, 0] },
        ],
      },
      {
        name: 'BNPL',
        items: [
          { id: 'b1', description: 'Afterpay', due: 'Weekly', total: 379, sourceAmounts: [0, 379, 0, 0] },
          { id: 'b2', description: 'Step Pay', due: 'Weekly', total: 961.57, sourceAmounts: [160.82, 169.48, 376.03, 255.24] },
          { id: 'b3', description: 'Zip Money', due: 'Monthly', total: 40, sourceAmounts: [0, 0, 0, 40] },
          { id: 'b4', description: 'Zip Plus', due: 'Monthly', total: 80, sourceAmounts: [0, 0, 0, 80] },
        ],
      },
      {
        name: 'PETS',
        items: [
          { id: 'p1', description: 'Food', due: 'Monthly', total: 30, sourceAmounts: [0, 0, 0, 30] },
          { id: 'p2', description: 'Grooming', due: 'Quarterly', total: 0, sourceAmounts: [0, 0, 0, 0] },
        ],
      },
      {
        name: 'PERSONAL CARE',
        items: [
          { id: 'pc1', description: 'Youtube', due: '28th Monthly', total: 17, sourceAmounts: [0, 0, 0, 17] },
          { id: 'pc2', description: 'Microsoft', due: '5th Monthly', total: 12, sourceAmounts: [12, 0, 0, 0] },
          { id: 'pc3', description: 'Linkt', due: 'Bills Payment', total: 20, sourceAmounts: [0, 0, 20, 0] },
          { id: 'pc4', description: 'Telstra Phone', due: '19th Monthly', total: 146, sourceAmounts: [0, 0, 146, 0] },
        ],
      },
      {
        name: 'BEA',
        items: [
          { id: 'bea1', description: 'School Fees', due: '', total: 0, sourceAmounts: [0, 0, 0, 0] },
          { id: 'bea2', description: 'Lunch Money', due: 'Monthly', total: 200, sourceAmounts: [100, 100, 0, 0] },
          { id: 'bea3', description: 'Phone Recharge', due: '3rd Monthly', total: 30, sourceAmounts: [30, 0, 0, 0] },
          { id: 'bea4', description: 'Volleyball/Tennis', due: 'Quarterly', total: 420, sourceAmounts: [0, 0, 240, 180] },
        ],
      },
      {
        name: 'CREDIT CARD',
        items: [
          { id: 'cc1', description: 'Credit Card to Close', due: '', total: 500, sourceAmounts: [0, 500, 0, 0] },
        ],
      },
      {
        name: 'LOANS',
        items: [
          { id: 'l1', description: 'Mama Personal', due: 'Monthly', total: 576, sourceAmounts: [576, 0, 0, 0] },
        ],
      },
      {
        name: 'AD HOC',
        items: [
          { id: 'ah1', description: 'Bea Ortho', due: '11th Feb', total: 2000, sourceAmounts: [0, 2000, 0, 0] },
          { id: 'ah2', description: 'Visa Assistance', due: '', total: 220, sourceAmounts: [0, 220, 0, 0] },
        ],
      },
      {
        name: 'SAVINGS',
        items: [
          { id: 'sv1', description: 'Visa', due: 'Weekly', total: 220.01, sourceAmounts: [42.49, 84.88, 46.32, 46.32] },
          { id: 'sv2', description: 'Savings', due: 'Weekly', total: 84.88, sourceAmounts: [0, 84.88, 0, 0] },
          { id: 'sv3', description: 'BEA Savers', due: 'Weekly', total: 200, sourceAmounts: [0, 0, 0, 200] },
        ],
      },
    ],
    directDebits: [
      { id: 'dd1', day: 2, bill: 'Car Registration', amount: 72, paid: false },
      { id: 'dd2', day: 2, bill: 'Pet Insurance', amount: 32.31, paid: false },
      { id: 'dd3', day: 3, bill: 'Bea Phone Recharge', amount: 30, paid: false },
      { id: 'dd4', day: 3, bill: 'Bupa Health', amount: 279, paid: false },
      { id: 'dd5', day: 4, bill: 'Aussie Broadband', amount: 96, paid: false },
      { id: 'dd6', day: 11, bill: 'Microsoft', amount: 12, paid: false },
      { id: 'dd7', day: 13, bill: 'Mama Loan', amount: 576, paid: false },
      { id: 'dd8', day: 13, bill: 'NRMA', amount: 136, paid: false },
      { id: 'dd9', day: 21, bill: 'Telstra', amount: 146, paid: false },
      { id: 'dd10', day: 21, bill: 'Angle Auto', amount: 1581.52, paid: false },
      { id: 'dd11', day: 27, bill: 'Credit Card', amount: 500, paid: false },
      { id: 'dd12', day: 28, bill: 'Zip Plus', amount: 80, paid: false },
      { id: 'dd13', day: 28, bill: 'Youtube', amount: 17, paid: false },
      { id: 'dd14', day: 29, bill: 'Zip Money', amount: 40, paid: false },
      { id: 'dd15', day: 30, bill: 'Bea School', amount: 0, paid: false },
      { id: 'dd16', day: 30, bill: 'Suncorp Home & Con', amount: 27, paid: false },
    ],
  },

  // ─────────────── MARCH 2026 ───────────────
  {
    id: 'mar2026',
    label: 'March 2026',
    incomeSources: [
      { id: 's1', name: 'Ayuda 3rd', amount: 1752.76 },
      { id: 's2', name: 'Ayuda 17th', amount: 1787.86 },
      { id: 's3', name: 'Salary (46087)', amount: 2316 },
      { id: 's4', name: 'Salary (46101)', amount: 2863.42 },
    ],
    bankBreakdown: [
      { bank: 'Bills Payment 6498', values: [380.07, 736.05, 474, 272.44] },
      { bank: 'Rents and Loans 3876', values: [1144, 640, 712, 640] },
      { bank: 'Visa Savings - Up Savers', values: [35.06, 35.76, 46.32, 57.27] },
      { bank: 'Credit Card 4806', values: [0, 200, 250, 500] },
      { bank: 'UP Bills 3703', values: [479.31, 0, 341, 47] },
      { bank: 'ING Bills', values: [0, 244, 934.76, 910.76] },
      { bank: 'ING Expenses', values: [0, 0, 0, 30] },
    ],
    categories: [
      {
        name: 'HOUSING',
        items: [
          { id: 'h1', description: 'House Rent', due: 'Thursdays Weekly', total: 2560, sourceAmounts: [640, 640, 640, 640] },
          { id: 'h2', description: 'Electricity - Winconnect', due: 'Monthly', total: 195.99, sourceAmounts: [0, 195.99, 0, 0] },
          { id: 'h3', description: 'Water/Sewer', due: 'Quarterly', total: 0, sourceAmounts: [0, 0, 0, 0] },
          { id: 'h4', description: 'Aussie Broadband', due: '3rd Monthly', total: 96, sourceAmounts: [96, 0, 0, 0] },
        ],
      },
      {
        name: 'TRANSPORTATION',
        items: [
          { id: 't1', description: 'Car Mortgage', due: '21st Monthly', total: 1681.52, sourceAmounts: [0, 100, 790.76, 790.76] },
          { id: 't2', description: 'Car Registration', due: '2nd Monthly', total: 72, sourceAmounts: [72, 0, 0, 0] },
        ],
      },
      {
        name: 'INSURANCE',
        items: [
          { id: 'i1', description: 'Bupa Medical', due: '3rd Monthly', total: 279, sourceAmounts: [279, 0, 0, 0] },
          { id: 'i2', description: 'H&C Suncorp', due: '30th Monthly', total: 27, sourceAmounts: [0, 0, 27, 0] },
          { id: 'i3', description: 'WW Pet Insurance', due: '2nd Monthly', total: 32.31, sourceAmounts: [32.31, 0, 0, 0] },
          { id: 'i4', description: 'NRMA Car', due: '13th Monthly', total: 136, sourceAmounts: [0, 0, 136, 0] },
        ],
      },
      {
        name: 'BNPL',
        items: [
          { id: 'b1', description: 'Afterpay', due: 'Weekly', total: 0, sourceAmounts: [0, 0, 0, 0] },
          { id: 'b2', description: 'Step Pay', due: 'Weekly', total: 1348.57, sourceAmounts: [380.07, 396.06, 300, 272.44] },
          { id: 'b3', description: 'Zip Money', due: 'Monthly', total: 40, sourceAmounts: [0, 0, 0, 40] },
          { id: 'b4', description: 'Zip Plus', due: 'Monthly', total: 80, sourceAmounts: [0, 0, 0, 80] },
        ],
      },
      {
        name: 'PETS',
        items: [
          { id: 'p1', description: 'Food', due: 'Monthly', total: 30, sourceAmounts: [0, 0, 0, 30] },
        ],
      },
      {
        name: 'PERSONAL CARE',
        items: [
          { id: 'pc1', description: 'Youtube', due: '28th Monthly', total: 17, sourceAmounts: [0, 0, 0, 17] },
          { id: 'pc2', description: 'Microsoft', due: '5th Monthly', total: 12, sourceAmounts: [0, 0, 12, 0] },
          { id: 'pc3', description: 'Linkt', due: 'Bills Payment', total: 20, sourceAmounts: [0, 0, 20, 0] },
          { id: 'pc4', description: 'Telstra Phone', due: '19th Monthly', total: 146, sourceAmounts: [0, 0, 146, 0] },
        ],
      },
      {
        name: 'BEA',
        items: [
          { id: 'bea2', description: 'Lunch Money', due: 'Monthly', total: 200, sourceAmounts: [100, 100, 0, 0] },
          { id: 'bea3', description: 'Phone Recharge', due: '3rd Monthly', total: 30, sourceAmounts: [0, 0, 30, 0] },
          { id: 'bea4', description: 'Bea Ortho', due: 'Quarterly', total: 288, sourceAmounts: [0, 144, 144, 0] },
        ],
      },
      {
        name: 'CREDIT CARD',
        items: [
          { id: 'cc1', description: 'Credit Card to Close', due: '', total: 950, sourceAmounts: [0, 200, 250, 500] },
        ],
      },
      {
        name: 'LOANS',
        items: [
          { id: 'l1', description: 'Mama Personal', due: 'Monthly', total: 576, sourceAmounts: [504, 0, 72, 0] },
        ],
      },
      {
        name: 'AD HOC',
        items: [
          { id: 'ah1', description: 'Car Battery', due: '', total: 0, sourceAmounts: [0, 0, 0, 0] },
        ],
      },
      {
        name: 'SAVINGS',
        items: [
          { id: 'sv1', description: 'Visa', due: 'Weekly', total: 174.4, sourceAmounts: [35.06, 35.76, 46.32, 57.27] },
          { id: 'sv2', description: 'Savings', due: 'Weekly', total: 0, sourceAmounts: [0, 0, 0, 0] },
        ],
      },
    ],
    directDebits: [
      { id: 'dd1', day: 2, bill: 'Car Registration', amount: 72, paid: false },
      { id: 'dd2', day: 2, bill: 'Pet Insurance', amount: 32.31, paid: false },
      { id: 'dd3', day: 3, bill: 'Bea Phone Recharge', amount: 30, paid: false },
      { id: 'dd4', day: 3, bill: 'Bupa Health', amount: 279, paid: false },
      { id: 'dd5', day: 4, bill: 'Aussie Broadband', amount: 96, paid: false },
      { id: 'dd6', day: 11, bill: 'Microsoft', amount: 12, paid: false },
      { id: 'dd7', day: 13, bill: 'Mama Loan', amount: 576, paid: false },
      { id: 'dd8', day: 13, bill: 'NRMA', amount: 136, paid: false },
      { id: 'dd9', day: 21, bill: 'Telstra', amount: 146, paid: false },
      { id: 'dd10', day: 21, bill: 'Angle Auto', amount: 1581.52, paid: false },
      { id: 'dd11', day: 27, bill: 'Credit Card', amount: 950, paid: false },
      { id: 'dd12', day: 28, bill: 'Zip Plus', amount: 80, paid: false },
      { id: 'dd13', day: 28, bill: 'Youtube', amount: 17, paid: false },
      { id: 'dd14', day: 29, bill: 'Zip Money', amount: 40, paid: false },
      { id: 'dd15', day: 30, bill: 'Suncorp Home & Con', amount: 27, paid: false },
    ],
  },

  // ─────────────── APRIL 2026 ───────────────
  {
    id: 'apr2026',
    label: 'April 2026',
    incomeSources: [
      { id: 's1', name: 'Ayuda 10th', amount: 1751.35 },
      { id: 's2', name: 'Ayuda 24th', amount: 1752.95 },
      { id: 's3', name: 'Salary (46108)', amount: 1830 },
      { id: 's4', name: 'Salary (46122)', amount: 1810.29 },
      { id: 's5', name: 'Salary (46136)', amount: 2670 },
    ],
    bankBreakdown: [
      { bank: 'Bills Payment 6498', values: [227.67, 280, 230, 341.61, 925.91] },
      { bank: 'Rents and Loans 3876', values: [1216, 640, 640, 640, 640] },
      { bank: 'Visa Savings - Up Savers', values: [35.03, 35.06, 36.6, 61, 53.4] },
      { bank: 'Credit Card 4806', values: [0, 250, 0, 0, 0] },
      { bank: 'UP Bills 3703', values: [282, 17, 479.31, 0, 200.31] },
      { bank: 'ING Bills', values: [0, 510, 0, 698.4, 846.52] },
      { bank: 'ING Expenses', values: [0, 0, 0, 30, 0] },
    ],
    categories: [
      {
        name: 'HOUSING',
        items: [
          { id: 'h1', description: 'House Rent', due: 'Thursdays Weekly', total: 2560, sourceAmounts: [640, 640, 640, 640, 640] },
          { id: 'h2', description: 'Electricity - Winconnect', due: 'Monthly', total: 200, sourceAmounts: [0, 0, 200, 0, 0] },
          { id: 'h3', description: 'Water/Sewer', due: 'Quarterly', total: 0, sourceAmounts: [0, 0, 0, 0, 0] },
          { id: 'h4', description: 'Aussie Broadband', due: '3rd Monthly', total: 96, sourceAmounts: [0, 0, 96, 0, 96] },
        ],
      },
      {
        name: 'TRANSPORTATION',
        items: [
          { id: 't1', description: 'Car Mortgage', due: '21st Monthly', total: 1646.52, sourceAmounts: [0, 390, 0, 410, 846.52] },
          { id: 't2', description: 'Car Registration', due: '2nd Monthly', total: 72, sourceAmounts: [0, 0, 72, 0, 72] },
        ],
      },
      {
        name: 'INSURANCE',
        items: [
          { id: 'i1', description: 'Bupa Medical', due: '3rd Monthly', total: 279, sourceAmounts: [0, 0, 279, 0, 0] },
          { id: 'i2', description: 'H&C Suncorp', due: '30th Monthly', total: 0, sourceAmounts: [0, 0, 0, 0, 0] },
          { id: 'i3', description: 'WW Pet Insurance', due: '2nd Monthly', total: 32.31, sourceAmounts: [0, 0, 32.31, 0, 32.31] },
          { id: 'i4', description: 'NRMA Car', due: '13th Monthly', total: 136, sourceAmounts: [136, 0, 0, 0, 0] },
        ],
      },
      {
        name: 'BNPL',
        items: [
          { id: 'b2', description: 'Step Pay', due: 'Weekly', total: 469.28, sourceAmounts: [127.67, 0, 0, 341.61, 225.91] },
          { id: 'b3', description: 'Zip Money', due: 'Monthly', total: 40, sourceAmounts: [0, 40, 0, 0, 0] },
          { id: 'b4', description: 'Zip Plus', due: 'Monthly', total: 80, sourceAmounts: [0, 80, 0, 0, 0] },
        ],
      },
      {
        name: 'PETS',
        items: [
          { id: 'p1', description: 'Food', due: 'Monthly', total: 30, sourceAmounts: [0, 0, 0, 30, 0] },
        ],
      },
      {
        name: 'PERSONAL CARE',
        items: [
          { id: 'pc1', description: 'Youtube', due: '28th Monthly', total: 17, sourceAmounts: [0, 17, 0, 0, 0] },
          { id: 'pc4', description: 'Telstra Phone', due: '19th Monthly', total: 146, sourceAmounts: [146, 0, 0, 0, 0] },
        ],
      },
      {
        name: 'BEA',
        items: [
          { id: 'bea2', description: 'Lunch Money', due: 'Monthly', total: 200, sourceAmounts: [100, 100, 0, 0, 0] },
          { id: 'bea3', description: 'Phone Recharge', due: '3rd Monthly', total: 30, sourceAmounts: [0, 0, 30, 0, 0] },
          { id: 'bea4', description: 'Bea Ortho', due: 'Quarterly', total: 288.4, sourceAmounts: [0, 0, 0, 288.4, 0] },
        ],
      },
      {
        name: 'CREDIT CARD',
        items: [
          { id: 'cc1', description: 'Credit Card to Close', due: '', total: 250, sourceAmounts: [0, 250, 0, 0, 0] },
        ],
      },
      {
        name: 'LOANS',
        items: [
          { id: 'l1', description: 'Mama Personal', due: 'Monthly', total: 576, sourceAmounts: [576, 0, 0, 0, 0] },
        ],
      },
      {
        name: 'AD HOC',
        items: [
          { id: 'ah1', description: 'Bea Volleyball', due: '', total: 180, sourceAmounts: [0, 180, 0, 0, 0] },
        ],
      },
      {
        name: 'SAVINGS',
        items: [
          { id: 'sv1', description: 'Visa', due: 'Weekly', total: 167.69, sourceAmounts: [35.03, 35.06, 36.6, 61, 53.4] },
          { id: 'sv3', description: 'BEA Savers', due: 'Weekly', total: 100, sourceAmounts: [0, 0, 0, 0, 100] },
        ],
      },
    ],
    directDebits: [
      { id: 'dd1', day: 2, bill: 'Car Registration', amount: 72, paid: false },
      { id: 'dd2', day: 2, bill: 'Pet Insurance', amount: 32.31, paid: false },
      { id: 'dd3', day: 3, bill: 'Bea Phone Recharge', amount: 30, paid: false },
      { id: 'dd4', day: 3, bill: 'Bupa Health', amount: 279, paid: false },
      { id: 'dd5', day: 4, bill: 'Aussie Broadband', amount: 96, paid: false },
      { id: 'dd6', day: 5, bill: 'Bea Phone', amount: 30, paid: false },
      { id: 'dd7', day: 11, bill: 'Microsoft Bsns Standard', amount: 22, paid: false },
      { id: 'dd8', day: 13, bill: 'Mama Loan', amount: 576, paid: false },
      { id: 'dd9', day: 13, bill: 'NRMA', amount: 136, paid: false },
      { id: 'dd10', day: 17, bill: 'Bea Ortho', amount: 288.4, paid: false },
      { id: 'dd11', day: 19, bill: 'Telstra', amount: 146, paid: false },
      { id: 'dd12', day: 21, bill: 'Angle Auto', amount: 1581.52, paid: false },
      { id: 'dd13', day: 27, bill: 'Credit Card', amount: 250, paid: false },
      { id: 'dd14', day: 28, bill: 'Zip Plus', amount: 80, paid: false },
      { id: 'dd15', day: 28, bill: 'Youtube', amount: 17, paid: false },
      { id: 'dd16', day: 29, bill: 'Zip Money', amount: 40, paid: false },
    ],
  },

  // ─────────────── MAY 2026 ───────────────
  {
    id: 'may2026',
    label: 'May 2026',
    incomeSources: [
      { id: 's1', name: 'Ayuda 3rd', amount: 1751.6 },
      { id: 's2', name: 'Ayuda 17th', amount: 0 },
      { id: 's3', name: 'Salary (8-May)', amount: 0 },
      { id: 's4', name: 'Salary (22-May)', amount: 0 },
    ],
    bankBreakdown: [
      { bank: 'Bills Payment 6498', values: [174.6, 305.4, 597.24, 250] },
      { bank: 'Rents and Loans 3876', values: [1216, 640, 640, 640] },
      { bank: 'Visa Savings - Up Savers', values: [35.03, 35, 24.9, 31.02] },
      { bank: 'Credit Card 4806', values: [0, 0, 0, 0] },
      { bank: 'UP Bills 3703', values: [304, 146, 135, 185] },
      { bank: 'ING Bills', values: [0, 564.4, 359.4, 1070] },
      { bank: 'ING Expenses', values: [0, 18, 0, 0] },
    ],
    categories: [
      {
        name: 'HOUSING',
        items: [
          { id: 'h1', description: 'House Rent', due: 'Thursdays Weekly', total: 2560, sourceAmounts: [640, 640, 640, 640] },
          { id: 'h2', description: 'Electricity - Winconnect', due: 'Monthly', total: 188.08, sourceAmounts: [0, 0, 188.08, 0] },
          { id: 'h3', description: 'Water/Sewer', due: 'Quarterly', total: 0, sourceAmounts: [0, 0, 0, 0] },
          { id: 'h4', description: 'Aussie Broadband', due: '3rd Monthly', total: 96, sourceAmounts: [0, 0, 0, 96] },
        ],
      },
      {
        name: 'TRANSPORTATION',
        items: [
          { id: 't1', description: 'Car Mortgage', due: '21st Monthly', total: 1585, sourceAmounts: [0, 300, 215, 1070] },
          { id: 't2', description: 'Car Registration', due: '2nd Monthly', total: 72, sourceAmounts: [0, 0, 0, 72] },
        ],
      },
      {
        name: 'INSURANCE',
        items: [
          { id: 'i1', description: 'Bupa Medical', due: '3rd Monthly', total: 279, sourceAmounts: [279, 0, 0, 0] },
          { id: 'i3', description: 'WW Pet Insurance', due: '2nd Monthly', total: 0, sourceAmounts: [0, 0, 0, 0] },
          { id: 'i4', description: 'NRMA Car', due: '13th Monthly', total: 135, sourceAmounts: [0, 0, 135, 0] },
        ],
      },
      {
        name: 'BNPL',
        items: [
          { id: 'b2', description: 'Step Pay', due: 'Weekly', total: 821.36, sourceAmounts: [145.6, 161, 264.76, 250] },
          { id: 'b3', description: 'Zip Money', due: 'Monthly', total: 40, sourceAmounts: [0, 40, 0, 0] },
          { id: 'b4', description: 'Zip Plus', due: 'Monthly', total: 80, sourceAmounts: [0, 80, 0, 0] },
        ],
      },
      {
        name: 'PETS',
        items: [
          { id: 'p1', description: 'Food', due: 'Monthly', total: 0, sourceAmounts: [0, 0, 0, 0] },
        ],
      },
      {
        name: 'PERSONAL CARE',
        items: [
          { id: 'pc1', description: 'Youtube', due: '28th Monthly', total: 17, sourceAmounts: [0, 0, 0, 17] },
          { id: 'pc2', description: 'Microsoft', due: '6th Monthly', total: 25, sourceAmounts: [25, 0, 0, 0] },
          { id: 'pc4', description: 'Telstra Phone', due: '19th Monthly', total: 146, sourceAmounts: [0, 146, 0, 0] },
        ],
      },
      {
        name: 'BEA',
        items: [
          { id: 'bea2', description: 'Lunch Money', due: 'Monthly', total: 200, sourceAmounts: [100, 100, 0, 0] },
          { id: 'bea3', description: 'Phone Recharge', due: '3rd Monthly', total: 29, sourceAmounts: [29, 0, 0, 0] },
          { id: 'bea4', description: 'Bea Ortho', due: '', total: 288.8, sourceAmounts: [0, 0, 288.8, 0] },
        ],
      },
      {
        name: 'CREDIT CARD',
        items: [
          { id: 'cc1', description: 'Credit Card to Close', due: '', total: 0, sourceAmounts: [0, 0, 0, 0] },
        ],
      },
      {
        name: 'LOANS',
        items: [
          { id: 'l1', description: 'Mama Personal', due: 'Monthly', total: 576, sourceAmounts: [576, 0, 0, 0] },
        ],
      },
      {
        name: 'AD HOC',
        items: [
          { id: 'ah1', description: 'Ad Hoc', due: '', total: 0, sourceAmounts: [0, 0, 0, 0] },
        ],
      },
      {
        name: 'SAVINGS',
        items: [
          { id: 'sv1', description: 'Visa', due: 'Weekly', total: 125.95, sourceAmounts: [35.03, 35, 24.9, 31.02] },
        ],
      },
    ],
    directDebits: [
      { id: 'dd1', day: 2, bill: 'Car Registration', amount: 72, paid: false },
      { id: 'dd2', day: 2, bill: 'Pet Insurance', amount: 0, paid: false },
      { id: 'dd3', day: 3, bill: 'Bea Phone Recharge', amount: 29, paid: false },
      { id: 'dd4', day: 3, bill: 'Bupa Health', amount: 279, paid: false },
      { id: 'dd5', day: 4, bill: 'Aussie Broadband', amount: 96, paid: false },
      { id: 'dd6', day: 5, bill: 'Bea Phone', amount: 29, paid: false },
      { id: 'dd7', day: 11, bill: 'Mama Loan', amount: 576, paid: false },
      { id: 'dd8', day: 13, bill: 'NRMA', amount: 135, paid: false },
      { id: 'dd9', day: 17, bill: 'Microsoft', amount: 25, paid: false },
      { id: 'dd10', day: 17, bill: 'Bea Ortho', amount: 288.8, paid: false },
      { id: 'dd11', day: 19, bill: 'Telstra', amount: 146, paid: false },
      { id: 'dd12', day: 21, bill: 'Angle Auto', amount: 1581.52, paid: false },
      { id: 'dd13', day: 27, bill: 'Credit Card', amount: 0, paid: false },
      { id: 'dd14', day: 28, bill: 'Zip Plus', amount: 80, paid: false },
      { id: 'dd15', day: 28, bill: 'Youtube', amount: 17, paid: false },
      { id: 'dd16', day: 29, bill: 'Zip Money', amount: 40, paid: false },
    ],
  },
];

export const generateId = () => Math.random().toString(36).substr(2, 9);
