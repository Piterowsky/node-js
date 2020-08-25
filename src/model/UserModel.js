import { DataTypes, Model } from 'sequelize';
import connection from '../config/connection';

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pwHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize: connection }
);

export default User;
