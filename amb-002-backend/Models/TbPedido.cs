using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbPedido
    {
        public int CodPedido { get; set; }
        public DateTime? FechaPedido { get; set; }
        public decimal? MontoTotal { get; set; }
        public string NumeroPedido { get; set; }
        public string EstadoEntrega { get; set; }
        public int CodCliente { get; set; }
        public int CodClienteDireccionEnvio { get; set; }
        public int CodTipoEnvio { get; set; }
    }
}
