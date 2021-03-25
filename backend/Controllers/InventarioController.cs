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
    public class InventarioController : ControllerBase
    {
        private readonly BDContext _context;

        public InventarioController(BDContext context)
        {
            _context = context;
        }

        // GET: api/Inventario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbInventario>>> GetTbInventario()
        {
            return await _context.TbInventario.ToListAsync();
        }

        // GET: api/Inventario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbInventario>> GetTbInventario(int id)
        {
            var tbInventario = await _context.TbInventario.FindAsync(id);

            if (tbInventario == null)
            {
                return NotFound();
            }

            return tbInventario;
        }

        // PUT: api/Inventario/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbInventario(int id, TbInventario tbInventario)
        {
            if (id != tbInventario.CodInventario)
            {
                return BadRequest();
            }

            _context.Entry(tbInventario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbInventarioExists(id))
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

        // POST: api/Inventario
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbInventario>> PostTbInventario(TbInventario tbInventario)
        {


            TbInventario reg = new TbInventario();
            reg.EstadoActivo=tbInventario.EstadoActivo;
            reg.NombreInventario=tbInventario.NombreInventario;
            _context.TbInventario.Add(reg);
            await _context.SaveChangesAsync();
           

            return CreatedAtAction("GetTbInventario", new { id = reg.CodInventario }, reg);
        }

        // DELETE: api/Inventario/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbInventario>> DeleteTbInventario(int id)
        {
            var tbInventario = await _context.TbInventario.FindAsync(id);
            if (tbInventario == null)
            {
                return NotFound();
            }

            _context.TbInventario.Remove(tbInventario);
            await _context.SaveChangesAsync();

            return tbInventario;
        }

        private bool TbInventarioExists(int id)
        {
            return _context.TbInventario.Any(e => e.CodInventario == id);
        }
    }
}
