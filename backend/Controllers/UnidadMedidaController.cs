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
    public class UnidadMedidaController : ControllerBase
    {
        private readonly BDContext _context;

        public UnidadMedidaController(BDContext context)
        {
            _context = context;
        }

        // GET: api/UnidadMedida
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbUnidadMedida>>> GetTbUnidadMedida()
        {
            return await _context.TbUnidadMedida.ToListAsync();
        }

        // GET: api/UnidadMedida/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbUnidadMedida>> GetTbUnidadMedida(int id)
        {
            var tbUnidadMedida = await _context.TbUnidadMedida.FindAsync(id);

            if (tbUnidadMedida == null)
            {
                return NotFound();
            }

            return tbUnidadMedida;
        }

        // PUT: api/UnidadMedida/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbUnidadMedida(int id, TbUnidadMedida tbUnidadMedida)
        {
            if (id != tbUnidadMedida.CodUnidadMedida)
            {
                return BadRequest();
            }

            _context.Entry(tbUnidadMedida).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbUnidadMedidaExists(id))
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

        // POST: api/UnidadMedida
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbUnidadMedida>> PostTbUnidadMedida(TbUnidadMedida tbUnidadMedida)
        {
            _context.TbUnidadMedida.Add(tbUnidadMedida);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTbUnidadMedida", new { id = tbUnidadMedida.CodUnidadMedida }, tbUnidadMedida);
        }

        // DELETE: api/UnidadMedida/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbUnidadMedida>> DeleteTbUnidadMedida(int id)
        {
            var tbUnidadMedida = await _context.TbUnidadMedida.FindAsync(id);
            if (tbUnidadMedida == null)
            {
                return NotFound();
            }

            _context.TbUnidadMedida.Remove(tbUnidadMedida);
            await _context.SaveChangesAsync();

            return tbUnidadMedida;
        }

        private bool TbUnidadMedidaExists(int id)
        {
            return _context.TbUnidadMedida.Any(e => e.CodUnidadMedida == id);
        }
    }
}