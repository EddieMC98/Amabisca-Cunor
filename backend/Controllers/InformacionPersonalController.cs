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
    public class InformacionPersonalController : ControllerBase
    {
        private readonly BDContext _context;

        public InformacionPersonalController(BDContext context)
        {
            _context = context;
        }

        // GET: api/InformacionPersonal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbInformacionPersonal>>> GetTbInformacionPersonal()
        {
            return await _context.TbInformacionPersonal.ToListAsync();
        }

        // GET: api/InformacionPersonal/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbInformacionPersonal>> GetTbInformacionPersonal(int id)
        {
            var tbInformacionPersonal = await _context.TbInformacionPersonal.FindAsync(id);

            if (tbInformacionPersonal == null)
            {
                return NotFound();
            }

            return tbInformacionPersonal;
        }

        // PUT: api/InformacionPersonal/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbInformacionPersonal(int id, TbInformacionPersonal tbInformacionPersonal)
        {
            if (id != tbInformacionPersonal.CodInformacionPersonal)
            {
                return BadRequest();
            }

            _context.Entry(tbInformacionPersonal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbInformacionPersonalExists(id))
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

        // POST: api/InformacionPersonal
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbInformacionPersonal>> PostTbInformacionPersonal(TbInformacionPersonal tbInformacionPersonal)
        {
            _context.TbInformacionPersonal.Add(tbInformacionPersonal);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbInformacionPersonalExists(tbInformacionPersonal.CodInformacionPersonal))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbInformacionPersonal", new { id = tbInformacionPersonal.CodInformacionPersonal }, tbInformacionPersonal);
        }

        // DELETE: api/InformacionPersonal/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbInformacionPersonal>> DeleteTbInformacionPersonal(int id)
        {
            var tbInformacionPersonal = await _context.TbInformacionPersonal.FindAsync(id);
            if (tbInformacionPersonal == null)
            {
                return NotFound();
            }

            _context.TbInformacionPersonal.Remove(tbInformacionPersonal);
            await _context.SaveChangesAsync();

            return tbInformacionPersonal;
        }

        private bool TbInformacionPersonalExists(int id)
        {
            return _context.TbInformacionPersonal.Any(e => e.CodInformacionPersonal == id);
        }

        //Cliente
        [HttpGet("cliente/{id}")]
        public async Task<ActionResult<IEnumerable<TbInformacionPersonal>>> GetCliente(int id)
        {
            var cliente = from c in _context.TbCliente
                          join d in _context.TbInformacionPersonal
                          on c.CodInformacionPersonal equals d.CodInformacionPersonal
                          where c.CodUsuario == id
                          select new TbInformacionPersonal
                          {
                              CodInformacionPersonal = d.CodInformacionPersonal,
                              NombrePersona = d.NombrePersona,
                              ApellidoPersona = d.ApellidoPersona,
                              Cui = d.Cui,
                              Nit = d.Nit,
                              Direccion = d.Direccion,
                              ImagenPerfil = d.ImagenPerfil,
                              Telefono = d.Telefono,
                              CodPais = d.CodPais
                          };


            if (cliente == null)
            {
                return NotFound();
            }


            return await cliente.ToListAsync();
        }

        [HttpPost("cliente")]
        public async Task<ActionResult<TbCliente>> PostCliente(TbCliente tbCliente)
        {
            tbCliente.FechaCreacion= DateTime.Now;
            tbCliente.EstadoActivo=1;



            _context.TbCliente.Add(tbCliente);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbClienteExists(tbCliente.CodCliente))
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

        private bool TbClienteExists(int id)
        {
            return _context.TbCliente.Any(e => e.CodCliente == id);
        }
        // GET: api/InformacionPersonal/5
        [AllowAnonymous]
        [HttpGet("cliente-aux/{id}")]
        public async Task<IEnumerable<TbCliente>> GetClienteAux(int id)
        {
            var tbCliente = from p in _context.TbCliente
                            where p.CodUsuario == id
                            select new TbCliente{
                                CodCliente = p.CodCliente
                            };

                return await tbCliente.ToListAsync();
            }
    }
}
