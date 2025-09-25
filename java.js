function checkText() {
    var phone = document.getElementById('pnumber').value;
    var name = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var msg = document.getElementById('msg').value;

    // Payment methods
    var payment = document.getElementsByName('pay');
    var pays = Array.from(payment)
        .filter((pay) => pay.checked)
        .map((pay) => pay.value);

    // Platform
    var platform = "none";
    if (document.getElementById('xbox')?.checked) platform = "xbox";
    else if (document.getElementById('pc')?.checked) platform = "pc";
    else if (document.getElementById('playstation')?.checked) platform = "playstation";
    else if (document.getElementById('nintendo')?.checked) platform = "nintendo";

    // Validation
    var alertMsg = "";
    var namePattern = /^[a-zA-Z]+$/; // Only letters
    var phonePattern = /^[0-9]+$/;  // Only digits

    if (name === '') alertMsg += 'Please enter your first name.\n';
    else if (!namePattern.test(name)) alertMsg += 'First name can only contain letters.\n';

    if (lastName === '') alertMsg += 'Please enter your last name.\n';
    else if (!namePattern.test(lastName)) alertMsg += 'Last name can only contain letters.\n';

    if (phone === '') {
        alertMsg += "Please enter your phone number.\n";
    } else if (!phonePattern.test(phone)) {
        alertMsg += 'Phone number must contain digits only.\n';
    }

    if (msg === '') {
        alertMsg += "Please enter your message.\n";
    }

    if (platform === 'none') {
        alertMsg += "Please select your favorite platform.\n";
    }

    if (pays.length === 0) {
        alertMsg += "Please select at least one payment method.\n";
    }

    // Display feedback
    if (alertMsg !== '') {
        alert(alertMsg);
        document.getElementById('snd').innerHTML = '';
    } else { // Save data to localStorage
        processInfo(phone, name, lastName, msg, pays, platform);
        document.getElementById('snd').innerHTML = `
            Thank you, ${name} ${lastName}, for your feedback!
            You prefer the ${platform} platform and pay using ${pays.join(", ")}.`;
    }
}

function clearText() {
	document.getElementById('fname').value = '';
	document.getElementById('lname').value = '';
	document.getElementById('pnumber').value = '';
	document.getElementById('msg').value = '';
	var platforms = document.getElementsByName('plat');
	for (var i = 0; i < platforms.length; i++) {
		platforms[i].checked = false;
	}
	var payments = document.getElementsByName('pay');
	for (var i = 0; i < payments.length; i++) {
		payments[i].checked = false;
	}
	document.getElementById('find').selectedIndex = 0;
	document.getElementById('snd').innerHTML = '';
}
function trim(str) {
	return str.replace(/^\s+|\s+$/g, '');
}
function getAllCustomers() {
    var customerTable = getCustomersDb();
    var textPrint = '';

    for (var i = 0; i < customerTable.length; i++) {
        var customer = customerTable[i];
        var fullName = customer[1] + ' ' + customer[2];
        textPrint += 'Phone: ' + customer[0] + ', named ' + fullName;
        textPrint += ' shared the message: "' + customer[3] + '".';
        textPrint += ' They use the ' + customer[5] + ' platform and prefer ';
        textPrint += customer[4] + ' as their payment method.';
        textPrint += '<br>';
    }

    document.getElementById('res').innerHTML = textPrint;
}


function showForm(){
    const elForm = document.querySelector('.formContainer');
    const elServiceHeader  = document.querySelector('.serviceHeader');
    elForm.style.display = 'block';
    elServiceHeader.style.display='none';
}
function showWheel(){
    console.log('boi');
    const elWheel = document.querySelector('.wheelContainer')
    elWheel.style.display='block'
}
