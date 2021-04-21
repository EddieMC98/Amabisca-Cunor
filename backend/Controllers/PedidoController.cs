using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly BDContext _context;

        public PedidoController(BDContext context)
        {
            _context = context;
        }

        // GET: api/Pedido
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbPedido>>> GetTbPedido()
        {
            return await _context.TbPedido.ToListAsync();
        }

        // GET: api/Pedido/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbPedido>> GetTbPedido(int id)
        {
            var tbPedido = await _context.TbPedido.FindAsync(id);

            if (tbPedido == null)
            {
                return NotFound();
            }

            return tbPedido;
        }

        // PUT: api/Pedido/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbPedido(int id, TbPedido tbPedido)
        {
            if (id != tbPedido.CodPedido)
            {
                return BadRequest();
            }

            _context.Entry(tbPedido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbPedidoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pedido
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<IActionResult> PostTbPedido(PedidoAux pedidoAux)
        {
            Console.WriteLine("ESPAÑA: " + pedidoAux.CodCliente);
            TbPedido tbPedido = new TbPedido();
            tbPedido.CodCliente = pedidoAux.CodCliente;
            tbPedido.CodClienteDireccionEnvio = pedidoAux.CodClienteDireccionEnvio;
            tbPedido.CodTipoEnvio = pedidoAux.CodTipoEnvio;
            tbPedido.FechaPedido = DateTime.Now;
            tbPedido.MontoTotal = pedidoAux.MontoTotal;
            tbPedido.EstadoEntrega = "PROCESO";

            _context.TbPedido.Add(tbPedido);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbPedidoExists(tbPedido.CodPedido))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            foreach (var element in pedidoAux.lstProductos)
            {
                TbDetallePedido det = new TbDetallePedido();
                det.Cantidad = Convert.ToInt32(element.PrecioCosto);
                det.CodPedido = tbPedido.CodPedido;
                det.CodProducto = element.CodProducto;
                _context.TbDetallePedido.Add(det);
                await _context.SaveChangesAsync();
            }
            int res = tbPedido.CodPedido;

            return Ok(res);
        }

        // DELETE: api/Pedido/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbPedido>> DeleteTbPedido(int id)
        {
            var tbPedido = await _context.TbPedido.FindAsync(id);
            if (tbPedido == null)
            {
                return NotFound();
            }

            _context.TbPedido.Remove(tbPedido);
            await _context.SaveChangesAsync();

            return tbPedido;
        }

        private bool TbPedidoExists(int id)
        {
            return _context.TbPedido.Any(e => e.CodPedido == id);
        }

        // GET: api/Pedido
        [HttpGet("pedidos/{id}")]
        public async Task<ActionResult<IEnumerable<GetPedidos>>> GetPedidos(int id)
        {
            var pedidos = from p in _context.TbPedido
                          join c in _context.TbCliente
                          on p.CodCliente equals c.CodCliente
                          join d in _context.TbClienteDireccionEnvio
                          on p.CodClienteDireccionEnvio equals d.CodClienteDireccionEnvio
                          join t in _context.TbTipoEnvio
                          on p.CodTipoEnvio equals t.CodTipoEnvio
                          join dt in _context.TbDireccionEnvio
                          on d.CodDireccionEnvio equals dt.CodDireccionEnvio
                          join inf in _context.TbInformacionPersonal
                          on c.CodInformacionPersonal equals inf.CodInformacionPersonal
                          join dp in _context.TbDetallePedido
                          on p.CodPedido equals dp.CodPedido
                          join pr in _context.TbProducto
                          on dp.CodProducto equals pr.CodProducto
                          join mc in _context.TbMarca
                          on pr.CodMarca equals mc.CodMarca
                          join ct in _context.TbCategoria
                          on pr.CodCategoria equals ct.CodCategoria
                          join tr in _context.TbTransaccion
                          on p.CodPedido equals tr.CodPedido
                          where p.CodPedido == id
                          select new GetPedidos
                          {
                              CodPedido = p.CodPedido,
                              FechaPedido = p.FechaPedido,
                              EstadoEntrega = p.EstadoEntrega,
                              MontoTotal = p.MontoTotal,
                              Cliente = inf.NombrePersona,
                              ClienteDireccionEnvio = dt.Direccion,
                              TipoEnvio = t.NombreTipoEnvio,
                              CostoEnvio = t.CostoEnvio,
                              Marca = mc.NombreMarca,
                              Categoria = ct.NombreCategoria,
                              NProducto = pr.NombreProducto,
                              Cantidad = dp.Cantidad,
                              PrecioVenta = pr.PrecioVenta,
                              NombrePersona = inf.NombrePersona + " " + inf.ApellidoPersona,
                              TransaccionID = tr.TransaccionId,
                              Nit = inf.Nit,
                              Cui = inf.Cui
                          };



            return await pedidos.ToListAsync();


            //return await _context.TbPedido.ToListAsync();
        }



        // GET: api/Pedido
        [HttpGet("pedidos-cliente/{id}")]
        public async Task<ActionResult<IEnumerable<GetPedidos>>> GetPedidosCliente(int id)
        {
            var pedidos = from p in _context.TbPedido
                          join c in _context.TbCliente
                          on p.CodCliente equals c.CodCliente
                          join d in _context.TbClienteDireccionEnvio
                          on p.CodClienteDireccionEnvio equals d.CodClienteDireccionEnvio
                          join t in _context.TbTipoEnvio
                          on p.CodTipoEnvio equals t.CodTipoEnvio
                          join dt in _context.TbDireccionEnvio
                          on d.CodDireccionEnvio equals dt.CodDireccionEnvio
                          join inf in _context.TbInformacionPersonal
                          on c.CodInformacionPersonal equals inf.CodInformacionPersonal
                          join dp in _context.TbDetallePedido
                          on p.CodPedido equals dp.CodPedido
                          join pr in _context.TbProducto
                          on dp.CodProducto equals pr.CodProducto
                          join mc in _context.TbMarca
                          on pr.CodMarca equals mc.CodMarca
                          join ct in _context.TbCategoria
                          on pr.CodCategoria equals ct.CodCategoria
                          join tr in _context.TbTransaccion
                          on p.CodPedido equals tr.CodPedido
                          where p.CodPedido == id
                          select new GetPedidos
                          {
                              CodPedido = p.CodPedido,
                              FechaPedido = p.FechaPedido,
                              EstadoEntrega = p.EstadoEntrega,
                              MontoTotal = p.MontoTotal,
                              Cliente = inf.NombrePersona,
                              ClienteDireccionEnvio = dt.Direccion,
                              TipoEnvio = t.NombreTipoEnvio,
                              CostoEnvio = t.CostoEnvio,
                              Marca = mc.NombreMarca,
                              Categoria = ct.NombreCategoria,
                              NProducto = pr.NombreProducto,
                              Cantidad = dp.Cantidad,
                              PrecioVenta = pr.PrecioVenta,
                              NombrePersona = inf.NombrePersona + " " + inf.ApellidoPersona,
                              TransaccionID = tr.TransaccionId
                          };



            return await pedidos.ToListAsync();


            //return await _context.TbPedido.ToListAsync();
        }


        // [HttpGet("pedidocliente/{id}")]
        // public async Task<ActionResult<IEnumerable<TbPedido>>> GetTbPedidoCliente(int id)
        // {
        //     var consulta = from tb in _context.TbPedido
        //                    where tb.CodCliente == id
        //                    select new TbPedido{ 
        //                        CodCliente = tb.CodCliente,
        //                        CodClienteDireccionEnvio = tb.CodClienteDireccionEnvio,
        //                        CodPedido = tb.CodPedido,
        //                        CodTipoEnvio = tb.CodTipoEnvio,
        //                        EstadoEntrega = tb.EstadoEntrega,
        //                        FechaPedido = tb.FechaPedido,
        //                        MontoTotal = tb.MontoTotal,
        //                        NumeroPedido = tb.NumeroPedido
        //                    };
        //     return await consulta.ToListAsync();
        // }
        [HttpGet("pedidoscliente/{id}")]
        public async Task<ActionResult<IEnumerable<TbPedido>>> GetTbPedidoPorCliente(int id)
        {
            return await _context.TbPedido.Where(x=> x.CodCliente==id).ToListAsync();
        }
    }
}
