import React, { useState } from "react";
import "./App.css";

function App() {
  const [purchasePrice, setPurchasePrice] = useState(50);
  const [salePrice, setSalePrice] = useState(100);
  const [expenses, setExpenses] = useState(20);
  const [investmentType, setInvestmentType] = useState("Long Term");
  const [annualIncome, setAnnualIncome] = useState("$45,001 - $120,000");

  // Function to calculate capital gains
  const calculateCapitalGains = () => salePrice - purchasePrice - expenses;

  // Function to get the tax rate based on annual income
  const getTaxRate = (incomeRange) => {
    switch (incomeRange) {
      case "$0 - $18,200":
        return "0%";
      case "$18,201 - $45,000":
        return "19% of excess over $18,200";
      case "$45,001 - $120,000":
        return "$5092 + 32.5% of excess over $45,001";
      case "$120,001 - $180,000":
        return "$29,467 + 37% of excess over $120,000";
      case "Over $180,000":
        return "$51,667 + 45% of excess over $180,000";
      default:
        return "Select income range";
    }
  };

  const capitalGains = calculateCapitalGains();
  const discountForLongTermGains =
    investmentType === "Long Term" && capitalGains > 0 ? capitalGains * 0.5 : 0;
  const netCapitalGains =
    investmentType === "Long Term"
      ? capitalGains - discountForLongTermGains
      : capitalGains;

  // Tax calculation
  const taxRateInfo = getTaxRate(annualIncome);
  const taxToBePaid = netCapitalGains * 0.325; // Applying 32.5% for simplicity in the example case

  return (
    <div className="container">
      <h1 className="title">Free Crypto Tax Calculator Australia</h1>

      <div className="grid">
        <div className="input-group">
          <label>Financial Year</label>
          <select>
            <option>FY 2023-24</option>
          </select>
        </div>

        <div className="input-group">
          <label>Country</label>
          <div className="country">
            <img src="https://placehold.co/20x20" alt="Australia flag" />
            <span>Australia</span>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="input-group">
          <label>Enter purchase price of Crypto</label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Enter sale price of Crypto</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="input-group">
        <label>Enter your Expenses</label>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>Investment Type</label>
        <div className="button-group">
          <button
            className={investmentType === "Short Term" ? "active" : ""}
            onClick={() => setInvestmentType("Short Term")}
          >
            Short Term
          </button>
          <button
            className={investmentType === "Long Term" ? "active" : ""}
            onClick={() => setInvestmentType("Long Term")}
          >
            Long Term
          </button>
        </div>
      </div>

      <div className="input-group">
        <label>Select Your Annual Income</label>
        <select
          value={annualIncome}
          onChange={(e) => setAnnualIncome(e.target.value)}
        >
          <option>$0 - $18,200</option>
          <option>$18,201 - $45,000</option>
          <option>$45,001 - $120,000</option>
          <option>$120,001 - $180,000</option>
          <option>Over $180,000</option>
        </select>
      </div>

      <div className="input-group">
        <label>Tax Rate</label>
        <div className="tax-info">{taxRateInfo}</div>
      </div>

      {investmentType === "Long Term" && (
        <>
          <div className="grid">
            <div className="input-group">
              <label>Capital gains amount</label>
              <input type="text" value={`$ ${capitalGains}`} readOnly />
            </div>

            <div className="input-group">
              <label>Discount for long term gains</label>
              <input
                type="text"
                value={`$ ${discountForLongTermGains}`}
                readOnly
              />
            </div>
          </div>
        </>
      )}

      <div className="grid">
        <div className="result-box green">
          <div className="label">Net Capital gains tax amount</div>
          <div className="value">{`$ ${netCapitalGains}`}</div>
        </div>

        <div className="result-box blue">
          <div className="label">The tax you need to pay*</div>
          <div className="value">{`$ ${taxToBePaid.toFixed(2)}`}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
