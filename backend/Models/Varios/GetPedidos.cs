using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class GetPedidos
    {
        public int CodPedido { get; set; }
        public DateTime? FechaPedido { get; set; }
        public String NumeroPedido { get; set; }
        public decimal? MontoTotal { get; set; }
        public String EstadoEntrega { get; set; }

        public String Cliente { get; set; }
        public String ClienteDireccionEnvio { get; set; }
        public String TipoEnvio { get; set; }
        public String NProducto { get; set; }
        public int? Cantidad { get; set; }
        public decimal? PrecioVenta { get; set; }
        public String Marca { get; set; }
        public String Categoria { get; set; }
        public String NombrePersona { get; set; }
        public String TransaccionID { get; set; }
        public decimal? CostoEnvio { get; set; }


    }
}