import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateValoracionDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  opinion?: string;

  @IsMongoId()
  userId: string;

  @IsMongoId()
  productId: string;
}
