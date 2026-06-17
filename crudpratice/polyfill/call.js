// const developer={
//     name:"Sachin",
//     greet(role){
//         console.log(`Hii, I'm ${role}-${this.name}`)
//     }
// }

// const desginer={name:"priya"}
// developer.greet.call(desginer,"UI Desinger")

function person(name,age){
    this.name=name,
    this.age=age
}

function Engineer(name,age,stack){
    person.call(this,name,age);
    this.stack=stack
}

const sachin=new Engineer("Sachin",23,"Node");
console.log(sachin.name,sachin.age,sachin.stack)