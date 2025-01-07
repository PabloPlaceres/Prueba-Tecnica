import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { Product } from './products/entities/product.entity';
import { Order } from './orders/entities/order.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product, Order, User],
      autoLoadEntities: true,
      synchronize:true
    }),

  ProductsModule,

  CommonModule,

  UsersModule,

  OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
