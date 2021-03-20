using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbPais
    {
        public TbPais()
        {
            TbInformacionPersonal = new HashSet<TbInformacionPersonal>();
            TbProveedor = new HashSet<TbProveedor>();
        }

        public int CodPais { get; set; }
        public string NomPais { get; set; }
        public string Acronimo { get; set; }
        public int? EstadoActivo { get; set; }

        public virtual ICollection<TbInformacionPersonal> TbInformacionPersonal { get; set; }
        public virtual ICollection<TbProveedor> TbProveedor { get; set; }
    }
}
