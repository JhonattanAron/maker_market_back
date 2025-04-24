import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorias } from 'src/schema/CategoriasSchema';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categorias.name) private categoriasModel: Model<Categorias>,
  ) {}

  async create(data: Partial<Categorias>): Promise<Categorias> {
    const newCategoria = new this.categoriasModel(data);
    return newCategoria.save();
  }

  async findAll(): Promise<Categorias[]> {
    return this.categoriasModel.find().exec();
  }

  async findById(id: number): Promise<Categorias | null> {
    return this.categoriasModel.findOne({ _id: id }).exec();
  }

  async update(
    id: number,
    updateData: Partial<Categorias>,
  ): Promise<Categorias | null> {
    return this.categoriasModel.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });
  }

  async delete(id: number): Promise<Categorias | null> {
    return this.categoriasModel.findOneAndDelete({ _id: id }).exec();
  }
}
