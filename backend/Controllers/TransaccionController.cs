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
    public class TransaccionController : ControllerBase
    {
        private readonly BDContext _context;

        public TransaccionController(BDContext context)
        {
            _context = context;
        }

        // GET: api/Transaccion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbTransaccion>>> GetTbTransaccion()
        {
            return await _context.TbTransaccion.ToListAsync();
        }

        // GET: api/Transaccion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbTransaccion>> GetTbTransaccion(int id)
        {
            var tbTransaccion = await _context.TbTransaccion.FindAsync(id);

            if (tbTransaccion == null)
            {
                return NotFound();
            }

            return tbTransaccion;
        }

        // PUT: api/Transaccion/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbTransaccion(int id, TbTransaccion tbTransaccion)
        {
            if (id != tbTransaccion.CodTransaccion)
            {
                return BadRequest();
            }

            _context.Entry(tbTransaccion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbTransaccionExists(id))
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

        // POST: api/Transaccion
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbTransaccion>> PostTbTransaccion(TbTransaccion tbTransaccion)
        {
            tbTransaccion.FechaCreacion= DateTime.Now;
            _context.TbTransaccion.Add(tbTransaccion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTbTransaccion", new { id = tbTransaccion.CodTransaccion }, tbTransaccion);
        }

        // DELETE: api/Transaccion/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbTransaccion>> DeleteTbTransaccion(int id)
        {
            var tbTransaccion = await _context.TbTransaccion.FindAsync(id);
            if (tbTransaccion == null)
            {
                return NotFound();
            }

            _context.TbTransaccion.Remove(tbTransaccion);
            await _context.SaveChangesAsync();

            return tbTransaccion;
        }

        private bool TbTransaccionExists(int id)
        {
            return _context.TbTransaccion.Any(e => e.CodTransaccion == id);
        }
    }
}
