export interface ProductoEstado {
  productoId: string; // ID del producto
  estadoProducto: string;
  cantidad: number; // Estado del producto (e.g., "En fabricación", "Listo para envío")
}

export interface SeguimientoProducto {
  fecha: Date; // Fecha del seguimiento
  descripcion: string; // Descripción del evento (e.g., "Producto enviado", "Producto entregado")
}
