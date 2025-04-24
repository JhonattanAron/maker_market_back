import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categorias } from 'src/schema/CategoriasSchema';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  async findAll(): Promise<Categorias[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Categorias> {
    const categoria = await this.categoriasService.findById(id);
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  @Post()
  async create(@Body() data: Partial<Categorias>): Promise<Categorias> {
    return this.categoriasService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Categorias>,
  ): Promise<Categorias> {
    const updated = await this.categoriasService.update(id, data);
    if (!updated) throw new NotFoundException('Categoría no encontrada');
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const deleted = await this.categoriasService.delete(id);
    if (!deleted) throw new NotFoundException('Categoría no encontrada');
    return { message: 'Categoría eliminada correctamente' };
  }
}
