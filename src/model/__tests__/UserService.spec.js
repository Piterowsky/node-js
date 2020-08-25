import Service from '../../controller/UserController';

describe('Item Service', () => {
    test('Should contain all crud methods', () => {
        const crudMethods = ['findAll', 'findOne', 'saveOne', 'updateOne', 'removeOne'];
        crudMethods.forEach((method) => {
            const result = Object.getOwnPropertyNames(Service.prototype).includes(method);
            expect(result).toBeTruthy();
        });
    });
});
