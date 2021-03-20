using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbInformacionPersonal
    {
        public TbInformacionPersonal()
        {
            TbAdministrador = new HashSet<TbAdministrador>();
            TbCliente = new HashSet<TbCliente>();
            TbEmpleado = new HashSet<TbEmpleado>();
        }

        public int CodInformacionPersonal { get; set; }
        public string NombrePersona { get; set; }
        public string ApellidoPersona { get; set; }
        public string Cui { get; set; }
        public string Nit { get; set; }
        public string ImagenPerfil { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public int CodPais { get; set; }

        public virtual TbPais CodPaisNavigation { get; set; }
        public virtual ICollection<TbAdministrador> TbAdministrador { get; set; }
        public virtual ICollection<TbCliente> TbCliente { get; set; }
        public virtual ICollection<TbEmpleado> TbEmpleado { get; set; }
    }
}
