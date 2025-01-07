import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';



@Injectable()
export class ProductsService {

  private readonly logger = new Logger()

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create({
        ...createProductDto,
        category: createProductDto.category.toLowerCase().replace(/\s+/g, ''),
      });
      
      await this.productRepository.save(product)
      
      return product
    } catch (error) {
      this.handleDBExeptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    
    const {limit = 10, offset = 0, ter} = paginationDto
    
    const query = this.productRepository.createQueryBuilder('product')
      .select('product')
      .take(limit)
      .skip(offset);
    
    if (typeof ter === 'number' || (typeof ter === 'string' && !isNaN(parseFloat(ter)))) {
      query.where('product.price = :price', { price: ter });
      // Es un número o una cadena que representa un número
    } 
        
      
     else if (typeof ter === 'string') {
      query.where('product.category = :category', { category: ter });
    }

    return await query.getMany();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product not found by id ${id}`)
    }
    return product 
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (updateProductDto.category) {
      updateProductDto.category = updateProductDto.category.toLowerCase().replace(/\s+/g, '');
    }
    
    const product = await this.productRepository.preload({
      id:id,
      ...updateProductDto
    })

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    try {
      await this.productRepository.save(product)

      return product;
    } catch (error) {
      this.handleDBExeptions(error)
    }
    
  }

  async remove(id: string) {
    const product = await this.findOne(id)

    if (!product) {
      throw new NotFoundException(`Product not found by id ${id}`)
    }

    await this.productRepository.remove(product)
    return product
  }

  private handleDBExeptions(error: any){
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }
    this.logger.error(error);
    throw new InternalServerErrorException(`Error creating product: ${error.message}`);
  }
    }

