import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from 'src/schema/ProductosSchema';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<Producto>,
  ) {}

  async crearProducto(producto: Producto): Promise<Producto> {
    const createdProducto = new this.productoModel({
      ...producto,
      images: producto.images || [],
    });
    return createdProducto.save();
  }

  async obtenerProducto(id: string): Promise<Producto> {
    const producto = await this.productoModel.findById(id).exec();
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async obtenerProductosPorCantidad(cantidad: number): Promise<Producto[]> {
    return this.productoModel.find().limit(cantidad).exec();
  }

  async obtenerProductos(): Promise<Producto[]> {
    return this.productoModel.find().exec();
  }

  async actualizarProducto(id: string, producto: Producto): Promise<Producto> {
    const updatedProducto = await this.productoModel
      .findByIdAndUpdate(id, producto, {
        new: true,
      })
      .exec();
    if (!updatedProducto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return updatedProducto;
  }

  async eliminarProducto(id: string): Promise<Producto> {
    const deletedProducto = await this.productoModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedProducto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return deletedProducto;
  }
}
