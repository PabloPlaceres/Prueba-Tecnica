import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  private readonly logger = new Logger()
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {

      const {password, ... userData}= createUserDto

      const user = this.usersRepository.create({... userData,
        password: bcrypt.hashSync(password, 10)}
      );
  
      await this.usersRepository.save(user);

      return {...user, 
        token: this.getJwtToken({id: user.id, rol: user.role})
    };
    } catch (error) {
      this.handleDBExeptions(error)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const {email, password} = loginUserDto

    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password is incorrect');
    }
    return {
      email: user.email,
      password: user.password, 
      token: this.getJwtToken({id: user.id, rol: user.role})
    };
  }

  private getJwtToken(payload: JwtPayload){
    return this.jwtService.sign(payload)
  }

  private handleDBExeptions(error: any): never{
    
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }
    this.logger.error(error);
    throw new InternalServerErrorException(`Error creating the user: ${error.message}`);
  }
}
