import { ApiProperty } from "@nestjs/swagger";

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Product } from "../../products/entities/product.entity";

@Entity()
export class Order {
    @ApiProperty({
        description: "Unique identifier for the order",
        example: "123e4567-e89b-12d3-a456-426614174000",
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: "The user associated with this order",
        type: "object",
        properties: {
        }
    })
    @ManyToOne(() => User, user => user.orders)
    user: User;

    @ApiProperty({
        description: "List of products included in this order",
        type: "array",
        items: { $ref: "#/definitions/Product" },
        isArray: true
    })
    @OneToMany(() => Product, product => product.order)
    products: Product[];

    @ApiProperty({
        description: "Total cost of all items in this order",
        example: 2,
        type: "number"
    })
    @Column({ type: 'decimal' })
    total: number;

    @ApiProperty({
        description: "Date and time when the order was created",
    })
    @Column()
    createdAt: Date;
}

