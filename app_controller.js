
// GLOBAL APP CONTROLLER
var AppController = (function(budgetCtrl, UICtrl) {
    
    var updateBudget = function() {
        
        // 1. calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. display the budget on the UI
        UICtrl.displayBudget(budget);
        
    };
    
    var updatePercentages = function() {
        
        // 1. calculate percentages
        budgetCtrl.calculatePercentages();
        
        
        // 2. read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
        
        
    };
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. get field input date
        input = UICtrl.getInput();
        
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);


            // 3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            
            // 4. clear the fields
            UICtrl.clearFields();

            
            // 5. calculate and update budget
            updateBudget();
            
            
            // 6. calculate and update percentages
            updatePercentages();
        }
    }
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            // inc-0
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            
            // 1. delete the item from the data structure
            budgetCtrl.deteleItem(type, ID);
            
            
            // 2. delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            
            // 3. Update and show the new budget
            updateBudget();
            
        }
    }
    
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
               ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
    }
    
    return {
        init: function() {
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
    
}(budgetController, UIController));

AppController.init();

