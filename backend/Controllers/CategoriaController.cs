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
    public class CategoriaController : ControllerBase
    {
        private readonly BDContext _context;

        public CategoriaController(BDContext context)
        {
            _context = context;
        }

        // GET: api/CategoriaController-actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbCategoria>>> GetTbCategoria()
        {
            return await _context.TbCategoria.ToListAsync();
        }

        // GET: api/CategoriaController-actions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbCategoria>> GetTbCategoria(int id)
        {
            var tbCategoria = await _context.TbCategoria.FindAsync(id);

            if (tbCategoria == null)
            {
                return NotFound();
            }

            return tbCategoria;
        }

        // PUT: api/CategoriaController-actions/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbCategoria(int id, TbCategoria tbCategoria)
        {
            if (id != tbCategoria.CodCategoria)
            {
                return BadRequest();
            }

            _context.Entry(tbCategoria).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbCategoriaExists(id))
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

        // POST: api/CategoriaController-actions
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbCategoria>> PostTbCategoria(TbCategoria tbCategoria)
        {
            _context.TbCategoria.Add(tbCategoria);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbCategoriaExists(tbCategoria.CodCategoria))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbCategoria", new { id = tbCategoria.CodCategoria }, tbCategoria);
        }

        // DELETE: api/CategoriaController-actions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbCategoria>> DeleteTbCategoria(int id)
        {
            var tbCategoria = await _context.TbCategoria.FindAsync(id);
            if (tbCategoria == null)
            {
                return NotFound();
            }

            _context.TbCategoria.Remove(tbCategoria);
            await _context.SaveChangesAsync();

            return tbCategoria;
        }

        private bool TbCategoriaExists(int id)
        {
            return _context.TbCategoria.Any(e => e.CodCategoria == id);
        }
    }
}