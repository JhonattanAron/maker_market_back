import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from 'src/schema/ProductosSchema';
import { PaginatedResult } from './pagination.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async crearProducto(
    @Body() producto: Producto,
    @Body('imagenes') imagenes: string[],
  ): Promise<Producto> {
    return this.productosService.crearProducto(producto);
  }

  @Get(':id')
  async obtenerProducto(@Param('id') id: string): Promise<Producto> {
    const producto = await this.productosService.obtenerProducto(id);
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  @Get('c/:cantidad')
  async obtenerProductos(
    @Param('cantidad') cantidad: number,
  ): Promise<Producto[]> {
    return this.productosService.obtenerProductosPorCantidad(cantidad);
  }

  @Get('name/:name')
  async obtenerProductoPorNombre(
    @Param('name') nombre: string,
  ): Promise<Producto> {
    const producto =
      await this.productosService.obtenerProductosPorNombre(nombre);
    if (!producto) {
      throw new NotFoundException(
        `Producto con nombre ${nombre} no encontrado`,
      );
    }
    return producto;
  }

  @Put(':id')
  async actualizarProducto(
    @Param('id') id: string,
    @Body() producto: Producto,
  ): Promise<Producto> {
    const updatedProducto = await this.productosService.actualizarProducto(
      id,
      producto,
    );
    if (!updatedProducto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return updatedProducto;
  }

  @Delete(':id')
  async eliminarProducto(@Param('id') id: string): Promise<Producto> {
    const deletedProducto = await this.productosService.eliminarProducto(id);
    if (!deletedProducto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return deletedProducto;
  }

  @Get()
  async getPaginatedProducts(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('search') search?: string,
  ): Promise<PaginatedResult<Producto>> {
    return this.productosService.getPaginatedProducts(
      Number(page),
      Number(pageSize),
      search,
    );
  }

  @Get('most/sold')
  async obtenerMasVendidos(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<PaginatedResult<Producto>> {
    return this.productosService.ObetenerMasVendidos(
      Number(page),
      Number(pageSize),
    );
  }
}
