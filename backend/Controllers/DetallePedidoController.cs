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
    public class DetallePedidoController : ControllerBase
    {
        private readonly BDContext _context;

        public DetallePedidoController(BDContext context)
        {
            _context = context;
        }

        // GET: api/DetallePedido
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbDetallePedido>>> GetTbDetallePedido()
        {
            return await _context.TbDetallePedido.ToListAsync();
        }

        // GET: api/DetallePedido/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbDetallePedido>> GetTbDetallePedido(int id)
        {
            var tbDetallePedido = await _context.TbDetallePedido.FindAsync(id);

            if (tbDetallePedido == null)
            {
                return NotFound();
            }

            return tbDetallePedido;
        }

        // PUT: api/DetallePedido/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbDetallePedido(int id, TbDetallePedido tbDetallePedido)
        {
            if (id != tbDetallePedido.CodDetallePedido)
            {
                return BadRequest();
            }

            _context.Entry(tbDetallePedido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbDetallePedidoExists(id))
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

        // POST: api/DetallePedido
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbDetallePedido>> PostTbDetallePedido(TbDetallePedido tbDetallePedido)
        {
            _context.TbDetallePedido.Add(tbDetallePedido);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbDetallePedidoExists(tbDetallePedido.CodDetallePedido))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbDetallePedido", new { id = tbDetallePedido.CodDetallePedido }, tbDetallePedido);
        }

        // DELETE: api/DetallePedido/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbDetallePedido>> DeleteTbDetallePedido(int id)
        {
            var tbDetallePedido = await _context.TbDetallePedido.FindAsync(id);
            if (tbDetallePedido == null)
            {
                return NotFound();
            }

            _context.TbDetallePedido.Remove(tbDetallePedido);
            await _context.SaveChangesAsync();

            return tbDetallePedido;
        }

        private bool TbDetallePedidoExists(int id)
        {
            return _context.TbDetallePedido.Any(e => e.CodDetallePedido == id);
        }
    }
}
