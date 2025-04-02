import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from 'src/schema/ProductosSchema';

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

  @Get()
  async obtenerProductosAll(): Promise<Producto[]> {
    return this.productosService.obtenerProductos();
  }

  @Get('c/:cantidad')
  async obtenerProductos(
    @Param('cantidad') cantidad: number,
  ): Promise<Producto[]> {
    return this.productosService.obtenerProductosPorCantidad(cantidad);
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
}
