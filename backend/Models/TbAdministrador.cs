using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbAdministrador
    {
        public int CodAdministrador { get; set; }
        public int? EstadoActivo { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int CodUsuario { get; set; }
        public int CodInformacionPersonal { get; set; }

        public virtual TbInformacionPersonal CodInformacionPersonalNavigation { get; set; }
        public virtual Usuario CodUsuarioNavigation { get; set; }
    }
}
