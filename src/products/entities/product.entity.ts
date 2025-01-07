import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "../../orders/entities/order.entity";

@Entity()
export class Product {
    @ApiProperty({
        description: "Unique identifier for the product",
        example: "9d31be8f-b5fd-426c-b0aa-e455c77d96e2",
        
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: "Name of the product",
        example: "ssdsds",
        type: "string"
    })
    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @ApiProperty({
        description: "Description of the product",
        example: "Descripción del producto",
    })
    @Column({ type: 'text' })
    description: string;

    @ApiProperty({
        description: "Price of the product",
        example: "10",
        type: "number",
        format: "decimal"
    })
    @Column('float')
    price: number;

    @ApiProperty({
        description: "Current stock quantity",
        example: 1,
        type: "integer"
    })
    @Column({ type: 'int' })
    stock: number;

    @ApiProperty({
        description: "Category of the product",
        example: "Categoría del Producto",
        type: "string"
    })
    @Column({ type: 'varchar', length: 255 })
    category: string;

    @ApiProperty({
        description: "Order associated with this product",
        type: "object",
        isArray: false,
        properties: {
            
        }
    })
    @ManyToOne(() => Order, order => order.products)
    order?: Order;
}

