export default interface Pedido {
  id: number;
  idCliente: number;
  idProducto: number;
  cantidad: number;
  total: number;
  fecha: Date;
}
