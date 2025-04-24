import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rating } from 'src/schema/RatingSchema';
import { User } from 'src/schema/UserSchema';
import { CreateValoracionDto } from './create-valoracion.dto';
import { Producto } from 'src/schema/ProductosSchema';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name) private valoracionModel: Model<Rating>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Producto.name) private productModel: Model<Producto>,
  ) {}

  async create(createRatingDto: CreateValoracionDto) {
    const { userId, productId, rating, opinion } = createRatingDto;

    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Producto no encontrado');

    const nuevaValoracion = await this.valoracionModel.create({
      rating,
      opinion,
      userId,
      productId,
    });

    // Recalcular el promedio
    const valoraciones = await this.valoracionModel.find({ productId });
    const total = valoraciones.length;
    const suma = valoraciones.reduce((acc, val) => acc + val.rating, 0);
    const promedio = Number((suma / total).toFixed(2));

    // Actualizar producto
    await this.productModel.findByIdAndUpdate(productId, {
      valoracion: promedio,
      valoraciones_totales: total,
    });

    return nuevaValoracion;
  }

  async findAll(page = 1, limit = 10, productoId: string) {
    const skip = (page - 1) * limit;
    console.log(productoId);

    const valoraciones = await this.valoracionModel
      .find({ productId: productoId })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name image')
      .exec();

    const total = await this.valoracionModel.countDocuments({
      productId: productoId,
    });

    return {
      total,
      page,
      pages: Math.ceil(total / limit),
      results: valoraciones,
    };
  }
}
