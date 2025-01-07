import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from 'src/products/entities/product.entity';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private produtRepository: Repository<Product>,
  ) {}
  async create(createOrderDto: CreateOrderDto, user) {

   const{ products} = createOrderDto


   const product = await Promise.all(products.map(async (productId) => {
      return await this.produtRepository.findOneBy({ id: productId });
 }));

  const totalPrice = product.reduce((total, { price }) => total + price, 0);
 
    
    
    const newOrder = this.orderRepository.create({
      user: user,
      createdAt: new Date(),
      total: totalPrice,
      products: product,
    });
    return this.orderRepository.save(newOrder);
  }

  findAll(user) {
  return this.orderRepository.find({ where: { user: user } });
  }

  async findOne(id: string, user) {
    const orders =await this.orderRepository.findOne({where:{user:user, id:id}});

    if (!orders) {
      throw new UnauthorizedException('User not authotized')
    }

    return orders
  }
}
