using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbProducto
    {
        public TbProducto()
        {
            TbDetalleInventario = new HashSet<TbDetalleInventario>();
            TbDetallePedido = new HashSet<TbDetallePedido>();
        }

        public int CodProducto { get; set; }
        public string NombreProducto { get; set; }
        public string CodigoProducto { get; set; }
        public int? EstadoActivo { get; set; }
        public decimal? PrecioCosto { get; set; }
        public decimal? PrecioVenta { get; set; }
        public string ImagenProducto { get; set; }
        public string DetalleProducto { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? UsrModificacion { get; set; }
        public int CodCategoria { get; set; }
        public int CodMarca { get; set; }
        public int CodUnidadMedida { get; set; }

        public virtual TbCategoria CodCategoriaNavigation { get; set; }
        public virtual TbMarca CodMarcaNavigation { get; set; }
        public virtual TbUnidadMedida CodUnidadMedidaNavigation { get; set; }
        public virtual ICollection<TbDetalleInventario> TbDetalleInventario { get; set; }
        public virtual ICollection<TbDetallePedido> TbDetallePedido { get; set; }
    }
}
