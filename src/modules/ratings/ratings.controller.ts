import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreateValoracionDto } from './create-valoracion.dto';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly valoracionesService: RatingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateValoracionDto) {
    return this.valoracionesService.create(createDto);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('id') id: string,
  ) {
    const p = Number(page);
    const l = Number(limit);

    return this.valoracionesService.findAll(p, l, id);
  }
}
