import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entities/product.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[
    TypeOrmModule.forFeature([Order, Product]),
    UsersModule, 
    ProductsModule
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
