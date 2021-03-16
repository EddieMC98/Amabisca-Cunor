using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbProducto
    {
        public int CodProducto { get; set; }
        public string NombreProducto { get; set; }
        public string CodigoProducto { get; set; }
        public int? EstadoActivo { get; set; }
        public decimal? PrecioCosto { get; set; }
        public decimal? PrecioVenta { get; set; }
        public byte[] ImagenProducto { get; set; }
        public string DetalleProducto { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int? UsrModificacion { get; set; }
        public int CodCategoria { get; set; }
        public int CodMarca { get; set; }
        public string CodUnidadMedida { get; set; }
    }
}
