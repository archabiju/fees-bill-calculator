import React, { useState } from "react";

function FeesBillCalculator() {
  const [tuition, setTuition] = useState(0);
  const [standard, setStandard] = useState(1);
  const [paymentDate, setPaymentDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [totalFee, setTotalFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [fineAmount, setFineAmount] = useState(0);

  // Calculate total fees 
  const calculateFees = () => {
    let activityFee = tuition * 0.1;
    let dressFee = 0;
    let hostelFee = 0;

    if (standard >= 1 && standard <= 3) {
      dressFee = 3000;
      hostelFee = 5000;
    } else if (standard >= 4 && standard <= 6) {
      dressFee = 5000;
      hostelFee = 8000;
    } else {
      dressFee = 10000;
      hostelFee = 10000;
    }

    let total = Number(tuition) + activityFee + dressFee + hostelFee;
    setTotalFee(total);
    setFinalAmount(total); 
  };

  // Check Discount
  const checkDiscount = () => {
    let disc = 0;
    if (totalFee >= 1000 && totalFee <= 4000) disc = totalFee * 0.05;
    else if (totalFee <= 6000) disc = totalFee * 0.12;
    else if (totalFee <= 8000) disc = totalFee * 0.17;
    else if (totalFee <= 40000) disc = totalFee * 0.21;

    setDiscount(disc);
    setFinalAmount(totalFee - disc);
  };

  // Check Payment Fine
  const checkPayment = () => {
    if (!paymentDate || !lastDate) {
      alert("Enter valid dates!");
      return;
    }

    let diff =
      (new Date(paymentDate) - new Date(lastDate)) / (1000 * 60 * 60 * 24);

    if (diff <= 0) {
      alert("Last date of payment should be less than Date of payment!");
      return;
    }

    let fine = 0;
    if (diff < 30) fine = finalAmount * 0.06;
    else if (diff <= 60) fine = finalAmount * 0.12;
    else fine = finalAmount * 0.21;

    setFineAmount(fine);
    setFinalAmount(finalAmount + fine);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Fees Bill Calculator</h2>

      <label>Tuition Fee: </label>
      <input
        type="number"
        value={tuition}
        onChange={(e) => setTuition(Number(e.target.value))}
      />
      <br />

      <label>Standard of Study: </label>
      <input
        type="number"
        value={standard}
        onChange={(e) => setStandard(Number(e.target.value))}
      />
      <br />

      <label>Payment Date: </label>
      <input
        type="date"
        value={paymentDate}
        onChange={(e) => setPaymentDate(e.target.value)}
      />
      <br />

      <label>Last Date of Payment: </label>
      <input
        type="date"
        value={lastDate}
        onChange={(e) => setLastDate(e.target.value)}
      />
      <br />
      <br />

      <button onClick={calculateFees}>Calculate Fees</button>
      <button onClick={checkDiscount}>Check Discount</button>
      <button onClick={checkPayment}>Check Payment</button>

      <h3>Results:</h3>
      <p>Total Fee (Before Discount/Fine): {totalFee}</p>
      <p>Discount Applied: {discount}</p>
      <p>Fine Applied: {fineAmount}</p>
      <p>
        <strong>Final Bill Amount: {finalAmount}</strong>
      </p>
    </div>
  );
}

export default FeesBillCalculator;
