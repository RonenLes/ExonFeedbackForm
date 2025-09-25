function processInfo(phone, name, lastName, msg, pays, platf) {
    var dbString = stringify(phone, name, lastName, msg, pays, platf);
    localStorage.setItem(phone, dbString);
}

function stringify(phone, name, lastName, msg, pays, platf) {
    return JSON.stringify({
        phone: phone,
        name: name,
        lastName: lastName,
        message: msg,
        payment: pays,
        platform: platf
    });
}

// Move getCustomersDb to global scope
function getCustomersDb() {
    var customers = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var customerInfo = localStorage.getItem(key);
        try {
            var parsedCustomer = JSON.parse(customerInfo);
            customers.push([
                parsedCustomer.phone,
                parsedCustomer.name,
                parsedCustomer.lastName,
                parsedCustomer.message,
                parsedCustomer.payment.join(", "),
                parsedCustomer.platform
            ]);
        } catch (error) {
            console.error("Error parsing customer data for key:", key, error);
        }
    }
    return customers;
}

// Helper functions
function getPhone(customerInfo) {
    var phoneIndex = customerInfo.indexOf('phone') + 7;
    var endPhoneIndex = customerInfo.indexOf('firstName') - 2;
    return customerInfo.substring(phoneIndex, endPhoneIndex);
}

function getFirstName(customerInfo) {
    var nameIndex = customerInfo.indexOf('firstName') + 12;
    var endNameIndex = customerInfo.indexOf('lastName') - 2;
    return customerInfo.substring(nameIndex, endNameIndex);
}

function getLastName(customerInfo) {
    var lastNameIndex = customerInfo.indexOf('lastName') + 10;
    var endLastNameIndex = customerInfo.indexOf('message') - 2;
    return customerInfo.substring(lastNameIndex, endLastNameIndex);
}

function getMessage(customerInfo) {
    var msgIndex = customerInfo.indexOf('message') + 9;
    var endMsgIndex = customerInfo.indexOf('paymentMethods') - 2;
    return customerInfo.substring(msgIndex, endMsgIndex);
}

function getPaymentMethods(customerInfo) {
    var paymentIndex = customerInfo.indexOf('paymentMethods') + 16;
    var endPaymentIndex = customerInfo.indexOf('platform') - 2;
    return customerInfo.substring(paymentIndex, endPaymentIndex);
}

function getPlatform(customerInfo) {
    var platformIndex = customerInfo.indexOf('platform') + 10;
    var endPlatformIndex = customerInfo.indexOf('}') - 1;
    return customerInfo.substring(platformIndex, endPlatformIndex);
}