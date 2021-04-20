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
    public class DivisaController : ControllerBase
    {
        private readonly BDContext _context;

        public DivisaController(BDContext context)
        {
            _context = context;
        }

        // GET: api/Divisa
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbDivisa>>> GetTbDivisa()
        {
            return await _context.TbDivisa.ToListAsync();
        }

        // GET: api/Divisa/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbDivisa>> GetTbDivisa(int id)
        {
            var tbDivisa = await _context.TbDivisa.FindAsync(id);

            if (tbDivisa == null)
            {
                return NotFound();
            }

            return tbDivisa;
        }

        // PUT: api/Divisa/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbDivisa(int id, TbDivisa tbDivisa)
        {
            if (id != tbDivisa.CodDivisa)
            {
                return BadRequest();
            }

            _context.Entry(tbDivisa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbDivisaExists(id))
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

        // POST: api/Divisa
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbDivisa>> PostTbDivisa(TbDivisa tbDivisa)
        {
            _context.TbDivisa.Add(tbDivisa);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbDivisaExists(tbDivisa.CodDivisa))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbDivisa", new { id = tbDivisa.CodDivisa }, tbDivisa);
        }

        // DELETE: api/Divisa/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbDivisa>> DeleteTbDivisa(int id)
        {
            var tbDivisa = await _context.TbDivisa.FindAsync(id);
            if (tbDivisa == null)
            {
                return NotFound();
            }

            _context.TbDivisa.Remove(tbDivisa);
            await _context.SaveChangesAsync();

            return tbDivisa;
        }

        private bool TbDivisaExists(int id)
        {
            return _context.TbDivisa.Any(e => e.CodDivisa == id);
        }
    }
}
