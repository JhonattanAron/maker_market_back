import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from 'src/schema/ProductosSchema';
import { PaginatedResult } from './pagination.dto';

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

  async obtenerProductosPorNombre(nombre: string): Promise<Producto> {
    const producto = await this.productoModel.findOne({ name: nombre }).exec();
    if (!producto) {
      throw new NotFoundException(
        `Producto con nombre ${nombre} no encontrado`,
      );
    }
    return producto;
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

  async getPaginatedProducts(
    page: number,
    pageSize: number,
    searchQuery?: string,
  ): Promise<PaginatedResult<Producto>> {
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: 'i' } }
      : {};

    const total = await this.productoModel.countDocuments(filter);
    const products = await this.productoModel
      .find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select('name price stock category supplier images code');

    return { total, page, pageSize, products };
  }

  async obtenerProductosMejorValorados(cantidad: number): Promise<Producto[]> {
    return this.productoModel
      .find()
      .sort({ rating: -1 }) // Assuming 'rating' is a field in the schema
      .limit(cantidad)
      .select('name price stock category supplier images code');
  }

  async ObetenerMasVendidos(
    page: number,
    pageSize: number,
  ): Promise<PaginatedResult<Producto>> {
    const total = await this.productoModel.countDocuments({ sold: { $gt: 0 } });
    const products = await this.productoModel
      .find({ sold: { $gt: 0 } })
      .sort({ sold: -1 }) // Sort by 'sold' field in descending order
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select('name price stock category supplier images code sold');

    return { total, page, pageSize, products };
  }
}
