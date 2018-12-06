// BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
    
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
        
    };
    
    Expense.prototype.getPercentage = function() {
        
        return this.percentage;
        
    }
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    
    var calculateTotal = function(type) {
        var sum = 0;
        
        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });
        
        data.totals[type] = sum;
        
    };
    
    return {
        addItem: function(type, description, value) {
            var newItem, ID;
            
            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0;
            }
            
            // create newItem based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, description, value);
                ID++;
            } else if (type === 'inc') {
                newItem = new Income(ID, description, value);
                ID++;
            }
            
            // push it into our data structure
            data.allItems[type].push(newItem);
            
            // return the new element
            return newItem;
        },
        
        deteleItem: function(type, id) {
            var index, ids;
            // id = 6
            // data.allItems[type][id];
            // ids = [1 2 4 6 8]
            // index = 3
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            })
            
            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        calculateBudget: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');            
            
            // calculate the budget income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
            
        },
        
        calculatePercentages: function() {
            
            /*
            a = 20
            b = 10
            c = 40
            
            income = 100
            a = 20 / 100 = 20%
            b = 10 / 100 = 10%
            c = 40 / 100 = 40%
            */
            
            data.allItems.exp.forEach(function(curr){
                curr.calcPercentage(data.totals.inc);
            })
            
        },
        
        getPercentages: function() {
            
            var allPerc;
            
            allPerc = data.allItems.exp.map(function(curr) {
                return curr.getPercentage();
            })
            
            return allPerc;
            
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage
            }
        },
        
        testing: function() {
            console.log(data);
        }
    };
    
}());
