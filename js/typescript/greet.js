function sayName(person) {
    return person.fisrtName + person.lastName;
}
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
var inperson = {
    firstName: 'ls',
    lastName: 'shuo'
};
document.body.innerHTML = greeter(user);
