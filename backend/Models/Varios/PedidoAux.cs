using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class PedidoAux
    {
        public int CodPedido { get; set; }
        public DateTime FechaPedido { get; set; }
        public String NumeroPedido { get; set; }
        public decimal MontoTotal { get; set; }
        public String EstadoEntrega { get; set; }

        public int CodCliente { get; set; }
        public int CodClienteDireccionEnvio { get; set; }
        public int CodTipoEnvio { get; set; }
        public IEnumerable<ProductoAux> lstProductos { get; set; }
    }
}