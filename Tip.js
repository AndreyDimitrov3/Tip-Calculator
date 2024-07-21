document.addEventListener('DOMContentLoaded', function(){

    // Declare Variables
    let bill = document.getElementById('bill');
    let tipAmount = document.getElementById('tipAmount');
    let total = document.getElementById('total');
    let people = document.getElementById('people');
    let percent = 0;

    // "Number of People" - Input 
    people.addEventListener('keyup', peopleListener)
    function peopleListener(){
        let zeroPeople = document.getElementById('zeroPeople');
        let peopleValue = Number(people.value);

        if(peopleValue == 0 || peopleValue == '0' || peopleValue == ''){
            zeroPeople.classList.remove('hidden');
            people.style.border = '2px solid red';
            return false;
        }

        else if(document.activeElement === people){
            zeroPeople.classList.add('hidden');
            people.style.border = '2px solid transparent'
        }
    }

    // Calculating the 'Tip Amount' and 'Total'
    people.addEventListener('keyup', math)
    bill.addEventListener('keyup', math)
    function math(){
        let billValue = Number(bill.value);
        let peopleValue = Number(people.value);

        tipAmount.innerText = '$' + parseFloat((Number(billValue) * percent / 100) / peopleValue).toFixed(2);
        total.innerText = '$' + parseFloat(((Number(billValue) / peopleValue) + ((Number(billValue) * percent / 100) / peopleValue))).toFixed(2);

        // If People === 0, Don't display result (Prevent's the user seeng $NaN)
        if(peopleListener() === false){
            tipAmount.innerText = '$0.00';
            total.innerText = '$0.00';
        }
    }

    // Reset all values when you click 'Reset' 
    document.getElementById('reset').addEventListener('click', function(){
        percent = 0;
        bill.value = '';
        document.getElementById('custom').value = '';
        document.getElementById('people').value = '';
        tipAmount.innerText = '$0.00';
        total.innerText = '$0.00';
        document.querySelectorAll('.percent').forEach(button => button.classList.remove('selected'));
        zeroPeople.classList.add('hidden');
        people.style.border = '2px solid transparent'
    })

    // Percent calculation
    function percentListener(evt) {
        percent = Number(evt.currentTarget.dataset.percent); // Update percent
        custom.value = '';
        math();

        // Add background-color to buttons when clicked
        document.querySelectorAll('.percent').forEach(button => button.classList.remove('selected'));
        evt.currentTarget.classList.add('selected');
    }

    // Which button has been clicked
    document.querySelectorAll('.percent').forEach((option) => {
        option.addEventListener('click', percentListener);
    });

    // Remove button focus when you click Custom
    document.getElementById('customHolder').addEventListener('click', removeSelectedOnCustom);
    function removeSelectedOnCustom(){
        document.querySelectorAll('.percent').forEach(button => button.classList.remove('selected'));
    }

    document.getElementById('customHolder').addEventListener('keyup', customPercent);
    function customPercent(){
        percent = document.getElementById('custom').value; // Update Custom percent
        math() // Recalculate with the new percent
    }
})

// Disable certain keys
function isNumberKeyPeople(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}

function isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}