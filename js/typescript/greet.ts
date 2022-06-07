interface Person{
    fisrtName:string,
    lastName:string
}
function sayName(person:Person){
    return person.fisrtName+person.lastName;
}

function greeter(person:string) {
    return "Hello, " + person;
}

let user = "Jane User";
let inperson = {
    firstName:'ls',
    lastName:'shuo'
};
document.body.innerHTML = greeter(user);