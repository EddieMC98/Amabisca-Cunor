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
    public class PaisController : ControllerBase
    {
        private readonly BDContext _context;

        public PaisController(BDContext context)
        {
            _context = context;
        }

        // GET: api/Pais
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbPais>>> GetTbPais()
        {
            return await _context.TbPais.ToListAsync();
        }

        // GET: api/Pais/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbPais>> GetTbPais(int id)
        {
            var tbPais = await _context.TbPais.FindAsync(id);

            if (tbPais == null)
            {
                return NotFound();
            }

            return tbPais;
        }

        // PUT: api/Pais/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbPais(int id, TbPais tbPais)
        {
            if (id != tbPais.CodPais)
            {
                return BadRequest();
            }

            _context.Entry(tbPais).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbPaisExists(id))
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

        // POST: api/Pais
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbPais>> PostTbPais(TbPais tbPais)
        {
            TbPais reg = new TbPais();
            reg.NomPais=tbPais.NomPais;
            reg.EstadoActivo=tbPais.EstadoActivo;
            reg.Acronimo=tbPais.Acronimo;

            _context.TbPais.Add(reg);
            await _context.SaveChangesAsync();
            

            return CreatedAtAction("GetTbPais", new { id = reg.CodPais }, reg);
        }

        // DELETE: api/Pais/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbPais>> DeleteTbPais(int id)
        {
            var tbPais = await _context.TbPais.FindAsync(id);
            if (tbPais == null)
            {
                return NotFound();
            }

            _context.TbPais.Remove(tbPais);
            await _context.SaveChangesAsync();

            return tbPais;
        }

        private bool TbPaisExists(int id)
        {
            return _context.TbPais.Any(e => e.CodPais == id);
        }
    }
}
