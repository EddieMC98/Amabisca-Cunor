using System;
using System.Collections.Generic;

namespace amb_002_backend.Models
{
    public partial class TbInformacionPersonal
    {
        public int CodInformacionPersonal { get; set; }
        public string NombrePersona { get; set; }
        public string ApellidoPersona { get; set; }
        public string Cui { get; set; }
        public string Nit { get; set; }
        public byte[] ImagenPerfil { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public int CodPais { get; set; }
    }
}
