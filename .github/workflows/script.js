function calculateLoan() {
    // 1. Corrected logical OR operators (||) and inputs
    const amount = parseFloat(document.getElementById('amount').value);
    const monthlyRate = (parseFloat(document.getElementById('rate').value) / 100);
    const years = parseFloat(document.getElementById('years').value);
    const totalMonths = years * 12;

    // Fixed the IF condition logic
    if (isNaN(amount) || isNaN(monthlyRate) || isNaN(years) || amount <= 0) {
        alert("សូមបញ្ចូលទិន្នន័យឱ្យបានត្រឹមត្រូវ");
        return;
    }

    // 2. Fixed Template Literals (Added missing backticks)
    const x = Math.pow(1 + monthlyRate, totalMonths);
    const monthly = (amount * x * monthlyRate) / (x - 1);

    document.getElementById('sumAmount').innerText = `$${amount.toLocaleString()}`;
    document.getElementById('sumRate').innerText = `${(monthlyRate * 100).toFixed(2)}%`;
    document.getElementById('sumTerm').innerText = `${years} ឆ្នាំ (${totalMonths} ខែ)`;
    document.getElementById('monthlyPayment').innerText = monthly.toFixed(2);
    
    let today = new Date();
    document.getElementById('startDate').innerText = today.toISOString().split('T')[0];
    document.getElementById('summary').style.display = 'block';

    // 3. Optimized Table Generation
    const tableBody = document.getElementById('tableBody');
    let rows = ''; // Use a string buffer for better performance than innerHTML +=
    let remainingBalance = amount;
    let totalInt = 0;

    for (let i = 1; i <= totalMonths; i++) {
        let interest = remainingBalance * monthlyRate;
        let principal = monthly - interest;
        
        // Final balance calculation
        let endBalance = remainingBalance - principal;
        if (i === totalMonths) endBalance = 0; // Clean up rounding errors on last month

        totalInt += interest;

        let payDate = new Date();
        payDate.setMonth(today.getMonth() + i);
        let dateStr = payDate.toISOString().split('T')[0];

        rows += `<tr>
            <td>${i}</td>
            <td>${dateStr}</td>
            <td>$${remainingBalance.toFixed(2)}</td>
            <td>$${interest.toFixed(2)}</td>
            <td>$${monthly.toFixed(2)}</td>
            <td>$${principal.toFixed(2)}</td>
            <td>$${Math.max(0, endBalance).toFixed(2)}</td>
        </tr>`;
        
        remainingBalance = endBalance;
    }

    tableBody.innerHTML = rows;
    document.getElementById('scheduleTable').style.display = 'table';
    document.getElementById('totalInterest').innerText = `សរុបការប្រាក់ត្រូវបង់: $${totalInt.toFixed(2)}`;
}