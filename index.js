
const fs = require('fs');
const LoanDataArr = JSON.parse(fs.readFileSync('./mydata.json'));
// Keep a counter for number of current active loans
var ActiveLoans = [];

// Keep an array of blacklisted ids in the start.
var BlacklistedIds = []

// Keep an array of blacklisted ids that give some kind of profit and allow them for 1 time at least. (Calculation of profit ratios for these would be Total repayable amount - principal / principal amount)
var BlacklistedIdsProfit = []

// Current balance
var CurrentBalance = 0;

// Profit made
var Profit;

// Make a list of current active loans, also add the profit ratios
var ActiveLoans = []

//Input Var N and K
var n = 5;
var k = 10;

CurrentBalance = n;
var map = {"01": [],"02":[],"03": [],"04":[],"05": [],"06":[],"07": [],"08":[],"09": [],"10":[],"11": [],"12":[] };
var keys = ["01", "02", "03","04","05","06","07","08","09","10","11","12"];
for (var i = 0; i < LoanDataArr.length; i++) {
    LoanDataArr[i]["Profit"] = LoanDataArr[i]["repaid_amount"] - LoanDataArr[i]["principal"];
    
    if (!LoanDataArr[i].repayments.length) BlacklistedIds.push(LoanDataArr[i].customer_id);
    else {
        const diffInMs = new Date(LoanDataArr[i].repayments[LoanDataArr[i].repayments.length - 1].date) - new Date(LoanDataArr[i].disbursement_date)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        if (diffInDays > 90) 
        { 
            BlacklistedIds.push(LoanDataArr[i].customer_id);
            //active date of repayment in under 90 days

            let temp = LoanDataArr[i].repayments;
            temp.sort((a, b) => new Date(b.date) - new Date(a.date))
            for(z=0; z<temp.length; z++){
                if(new Date(temp[z].date) - new Date(LoanDataArr[i].disbursement_date) <= 90) 
                {
                    LoanDataArr[i].repayments.push({"date": temp[z].date})
                    break
                }
            }
        }
    }
    map[LoanDataArr[i].disbursement_date.split("-")[1]].push(LoanDataArr[i]);

}

currentLoans = []
for(let month of keys){
    map[month].sort((a, b) => b.Profit - a.Profit);
    for(let j = 0; j < k; j++){
        if(map[month][j].profit > 0) currentLoans.push(map[months][j])
    }
    currentLoans.sort((a, b) => new Date(a.repayments[a.repayments.length - 1].date) - new Date(b.repayments[b.repayments.length - 1].date));
    
}
// Maintains array sorted according to profit, another sorted according to repayment date
// Sort according to the month, date, profit
// Set a goal : x loans per day - See to it that the balance doesnt become negative
// Each day check if any repayments are to be done today. Check if any loan is completed and to be deleted. Take x loans.
// If tried to exceed K, ignore the loan, continue. 

