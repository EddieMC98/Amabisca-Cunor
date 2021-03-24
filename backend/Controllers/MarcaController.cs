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
    public class MarcaController : ControllerBase
    {
        private readonly BDContext _context;

        public MarcaController(BDContext context)
        {
            _context = context;
        }

        // GET: api/Marca
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMarca>>> GetTbMarca()
        {
            return await _context.TbMarca.ToListAsync();
        }

        // GET: api/Marca/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMarca>> GetTbMarca(int id)
        {
           
           Console.WriteLine("Hola");
            var tbMarca = await _context.TbMarca.FindAsync(id);

            if (tbMarca == null)
            {
                return NotFound();
            }

            return tbMarca;
        }

        // PUT: api/Marca/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMarca(int id, TbMarca tbMarca)
        {
            if (id != tbMarca.CodMarca)
            {
                return BadRequest();
            }

            _context.Entry(tbMarca).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMarcaExists(id))
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

        // POST: api/Marca
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbMarca>> PostTbMarca(TbMarca tbMarca)
        {
            Console.WriteLine("Marca"+tbMarca.CodMarca);
            _context.TbMarca.Add(tbMarca);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMarcaExists(tbMarca.CodMarca))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMarca", new { id = tbMarca.CodMarca }, tbMarca);
        }

        // DELETE: api/Marca/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbMarca>> DeleteTbMarca(int id)
        {
            var tbMarca = await _context.TbMarca.FindAsync(id);
            if (tbMarca == null)
            {
                return NotFound();
            }

            _context.TbMarca.Remove(tbMarca);
            await _context.SaveChangesAsync();

            return tbMarca;
        }

        private bool TbMarcaExists(int id)
        {
            return _context.TbMarca.Any(e => e.CodMarca == id);
        }
    }
}
