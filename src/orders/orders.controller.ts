import { Controller, Get, Post, Body, Param,  ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';

import { Auth } from 'src/users/decorators/auth.decorators';
import { GetUser } from 'src/users/decorators/get-user.decorators';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Created find successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  create(@Body() createOrderDto: CreateOrderDto,
          @GetUser() user: User
  ) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Get()
  @Auth()
  @ApiResponse({ status: 201, description: 'Orders find successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll(@GetUser() user: User) {
    return this.ordersService.findAll(user);
  }

  @Get(':id')
  @Auth()
  @ApiResponse({ status: 201, description: 'Orders find successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.ordersService.findOne(id, user);
  }
}
