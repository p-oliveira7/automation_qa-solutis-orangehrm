const faker = require('faker-br');

class Person {
    constructor(firstName, middleName, lastName, id) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.id = id;
        this.image = 'cypress/images/caneta.png';
    }

    static createRandomPerson() {
        return new Person(
            faker.name.firstName(),
            faker.name.firstName(),
            faker.name.lastName(),
            faker.random.number({ min: 10000, max: 99999 })
        );
    }
}

export default Person;
