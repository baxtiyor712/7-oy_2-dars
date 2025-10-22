import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table({ timestamps: true, modelName: "users" })
export class User extends Model {

    @Column({ allowNull: false })
    username: string

    @Column({ allowNull: false })
    email: string

    @Column({ allowNull: false })
    password: string


    @Column({ allowNull: false })
    age: number

    @Column({ allowNull: false })
    img: string

}