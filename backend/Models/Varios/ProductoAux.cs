namespace backend.Models
{

    public class ProductoAux
    {

        public int CodProducto { get; set; }
        public string NombreProducto { get; set; }
        public string CodigoProducto { get; set; }
        public int? EstadoActivo { get; set; }
        public decimal? PrecioCosto { get; set; }
        public decimal? PrecioVenta { get; set; }
        public string ImagenProducto { get; set; }
        public string DetalleProducto { get; set; }
        public string Categoria { get; set; }
        public string Marca { get; set; }
        public string UnidadMedida { get; set; }
    }
}
