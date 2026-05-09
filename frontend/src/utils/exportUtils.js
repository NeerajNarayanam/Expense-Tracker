import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

// EXPORT CSV
export const exportCSV = (
  expenses,
  income
) => {

  const rows = [];

  // EXPENSES
  expenses.forEach((item) => {

    rows.push({
      Type: "Expense",
      Title: item.title,
      Category:
        item.category,
      Amount: item.amount,
    });
  });

  // INCOME
  income.forEach((item) => {

    rows.push({
      Type: "Income",
      Title: item.title,
      Category:
        "Income",
      Amount: item.amount,
    });
  });

  const headers =
    Object.keys(rows[0]);

  const csvRows = [];

  csvRows.push(
    headers.join(",")
  );

  rows.forEach((row) => {

    const values =
      headers.map(
        (header) =>
          row[header]
      );

    csvRows.push(
      values.join(",")
    );
  });

  const blob = new Blob(
    [csvRows.join("\n")],
    {
      type:
        "text/csv",
    }
  );

  const url =
    window.URL.createObjectURL(
      blob
    );

  const a =
    document.createElement(
      "a"
    );

  a.href = url;

  a.download =
    "financial-report.csv";

  a.click();
};

// EXPORT PDF
export const exportPDF = (
  expenses,
  income,
  totalIncome,
  totalExpense,
  totalBalance
) => {

  const doc =
    new jsPDF();

  // TITLE
  doc.setFontSize(24);

  doc.text(
    "Financial Report",
    14,
    20
  );

  // SUMMARY
  doc.setFontSize(14);

  doc.text(
    `Total Income: ₹${totalIncome}`,
    14,
    40
  );

  doc.text(
    `Total Expense: ₹${totalExpense}`,
    14,
    50
  );

  doc.text(
    `Balance: ₹${totalBalance}`,
    14,
    60
  );

  // TABLE DATA
  const tableData = [];

  expenses.forEach((item) => {

    tableData.push([
      "Expense",
      item.title,
      item.category,
      `₹${item.amount}`,
    ]);
  });

  income.forEach((item) => {

    tableData.push([
      "Income",
      item.title,
      "Income",
      `₹${item.amount}`,
    ]);
  });

  // TABLE
  autoTable(doc, {
    startY: 80,
    head: [[
      "Type",
      "Title",
      "Category",
      "Amount",
    ]],
    body: tableData,
  });

  // SAVE
  doc.save(
    "financial-report.pdf"
  );
};