import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "../../orders/entities/order.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty({
        description: "Unique identifier for the user",
        example: "123e4567-e89b-12d3-a456-426614174000",
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: "The name of the user",
        example: "John Doe",
        type: "string"
    })
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ApiProperty({
        description: "The email address of the user",
        example: "john.doe@example.com",
        format: "email"
    })
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @ApiProperty({
        description: "The password of the user",
        example: "hashed_password",
        type: "string",
        format: "password"
    })
    @Column({ type: 'varchar', length: 255 })
    password: string;

    @ApiProperty({
        description: "The role of the user (optional)",
        example: "admin",
        type: "string",
        default: "usuario"
    })
    @Column({ type: 'varchar', length: 255, default: 'usuario' })
    role?: string;

    @ApiProperty({
        description: "List of orders associated with this user",
        type: "array",
        isArray: true,
    })
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}

