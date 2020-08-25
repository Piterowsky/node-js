import connection from '../../config/connection';
import User from '../UserModel';

describe('User model', () => {
    describe('User model', () => {
        test('User model exists', () => {
            expect(connection.models.User).toEqual(User);
        });
    });

    describe('User model', () => {
        test('User model exists', () => {
            console.dir(new connection.models.User());
            expect(connection.models.User).toEqual(User);
        });
    });
});
