using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DireccionEnvioController : ControllerBase
    {
        private readonly BDContext _context;

        public DireccionEnvioController(BDContext context)
        {
            _context = context;
        }

        // GET: api/DireccionEnvio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbDireccionEnvio>>> GetTbDireccionEnvio()
        {
            return await _context.TbDireccionEnvio.ToListAsync();
        }

        // GET: api/DireccionEnvio/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbDireccionEnvio>> GetTbDireccionEnvio(int id)
        {
            var tbDireccionEnvio = await _context.TbDireccionEnvio.FindAsync(id);

            if (tbDireccionEnvio == null)
            {
                return NotFound();
            }

            return tbDireccionEnvio;
        }

        // PUT: api/DireccionEnvio/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbDireccionEnvio(int id, TbDireccionEnvio tbDireccionEnvio)
        {
            if (id != tbDireccionEnvio.CodDireccionEnvio)
            {
                return BadRequest();
            }

            _context.Entry(tbDireccionEnvio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbDireccionEnvioExists(id))
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

        // POST: api/DireccionEnvio
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbDireccionEnvio>> PostTbDireccionEnvio(TbDireccionEnvio tbDireccionEnvio)
        {
            // int? codUsuario = Convert.ToInt32(HttpContext.User.Identity.Name);
            _context.TbDireccionEnvio.Add(tbDireccionEnvio);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbDireccionEnvioExists(tbDireccionEnvio.CodDireccionEnvio))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbDireccionEnvio", new { id = tbDireccionEnvio.CodDireccionEnvio }, tbDireccionEnvio);
        }

        // DELETE: api/DireccionEnvio/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbDireccionEnvio>> DeleteTbDireccionEnvio(int id)
        {
            var tbDireccionEnvio = await _context.TbDireccionEnvio.FindAsync(id);
            if (tbDireccionEnvio == null)
            {
                return NotFound();
            }

            _context.TbDireccionEnvio.Remove(tbDireccionEnvio);
            await _context.SaveChangesAsync();

            return tbDireccionEnvio;
        }

        private bool TbDireccionEnvioExists(int id)
        {
            return _context.TbDireccionEnvio.Any(e => e.CodDireccionEnvio == id);
        }

         [HttpPost("direccion-cliente")]
        public async Task<ActionResult<TbClienteDireccionEnvio>> PostTbDireccionEnvioCliente(TbClienteDireccionEnvio tbDireccionEnvio)
        {
            
            _context.TbClienteDireccionEnvio.Add(tbDireccionEnvio);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbClienteDireccionEnvioExists(tbDireccionEnvio.CodClienteDireccionEnvio))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok();

    }
    private bool TbClienteDireccionEnvioExists(int id)
        {
            return _context.TbClienteDireccionEnvio.Any(e => e.CodClienteDireccionEnvio == id);
        }
        
        [AllowAnonymous]
        [HttpGet("direcciones-cliente/{id}")]
        public async Task<IEnumerable<TbDireccionEnvio>> GetDirecciones(int id)
        {
            var lstDirecciones= from p in _context.TbCliente
                                join c in _context.TbClienteDireccionEnvio
                                on p.CodCliente equals c.CodCliente
                                join d in _context.TbDireccionEnvio
                                on c.CodDireccionEnvio equals d.CodDireccionEnvio
                                where p.CodCliente==id
                                select new TbDireccionEnvio {
                                 Direccion= d.Direccion,
                                 CodDireccionEnvio=d.CodDireccionEnvio
                                };
            

            return await lstDirecciones.ToListAsync();
        }
    
    }
}
