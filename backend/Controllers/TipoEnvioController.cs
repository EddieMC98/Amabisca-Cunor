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
    public class TipoEnvioController : ControllerBase
    {
        private readonly BDContext _context;

        public TipoEnvioController(BDContext context)
        {
            _context = context;
        }

        // GET: api/TipoEnvio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbTipoEnvio>>> GetTbTipoEnvio()
        {
            return await _context.TbTipoEnvio.ToListAsync();
        }

        // GET: api/TipoEnvio/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbTipoEnvio>> GetTbTipoEnvio(int id)
        {
            var tbTipoEnvio = await _context.TbTipoEnvio.FindAsync(id);

            if (tbTipoEnvio == null)
            {
                return NotFound();
            }

            return tbTipoEnvio;
        }

        // PUT: api/TipoEnvio/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbTipoEnvio(int id, TbTipoEnvio tbTipoEnvio)
        {
            if (id != tbTipoEnvio.CodTipoEnvio)
            {
                return BadRequest();
            }

            _context.Entry(tbTipoEnvio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbTipoEnvioExists(id))
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

        // POST: api/TipoEnvio
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbTipoEnvio>> PostTbTipoEnvio(TbTipoEnvio tbTipoEnvio)
        {
            _context.TbTipoEnvio.Add(tbTipoEnvio);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbTipoEnvioExists(tbTipoEnvio.CodTipoEnvio))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbTipoEnvio", new { id = tbTipoEnvio.CodTipoEnvio }, tbTipoEnvio);
        }

        // DELETE: api/TipoEnvio/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbTipoEnvio>> DeleteTbTipoEnvio(int id)
        {
            var tbTipoEnvio = await _context.TbTipoEnvio.FindAsync(id);
            if (tbTipoEnvio == null)
            {
                return NotFound();
            }

            _context.TbTipoEnvio.Remove(tbTipoEnvio);
            await _context.SaveChangesAsync();

            return tbTipoEnvio;
        }

        private bool TbTipoEnvioExists(int id)
        {
            return _context.TbTipoEnvio.Any(e => e.CodTipoEnvio == id);
        }
    }
}
