import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table({ timestamps: true, modelName: "auth" })
export class Auth extends Model {

    @Column({ allowNull: false })
    username: string

    @Column({ allowNull: false })
    email: string

    @Column({ allowNull: false })
    password: string

    @Column({ allowNull: true })
    role: string
}