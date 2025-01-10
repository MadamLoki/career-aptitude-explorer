// backend/src/models/User.ts
import { Model, DataTypes, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';

// Export this interface so it can be used by other files
export interface UserAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
    lastLogin?: Date;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Export this interface as well if needed elsewhere
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'lastLogin' | 'isActive'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public lastLogin!: Date;
    public isActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    async verifyPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50],
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100],
                notEmpty: true,
            },
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
        indexes: [
            {
                unique: true,
                fields: ['email'],
            },
            {
                unique: true,
                fields: ['username'],
            },
        ],
    }
);

export default User;