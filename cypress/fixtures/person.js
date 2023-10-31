const faker = require('faker-br');

class Person {
    constructor() {
        this.firstName = faker.name.firstName();
        this.middleName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.id = faker.random.number({min:10000, max:99999});
        this.image = 'cypress/images/caneta.png';
    }
}

export default Person;