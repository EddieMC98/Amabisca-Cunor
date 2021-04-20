using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class TbTransaccion
    {
        public int CodTransaccion { get; set; }
       public String TransaccionId {get;set;}
       public int CodPedido {get;set;}
       public DateTime FechaCreacion {get;set;}
    }
}
