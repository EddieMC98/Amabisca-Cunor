using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using amb_002_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace amb_002_backend.Controllers
{
    [Route("categorias")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {

        private readonly amabisca_cunorContext _context;

        public CategoriaController(amabisca_cunorContext context)
        {
            _context = context;
        }

        // GET: api/Categoria
        [HttpGet]
        public IEnumerable<TbCategoria> Get()
        {
            var categorias =
            (from TbCategoria t in _context.TbCategoria
             select new TbCategoria
             {
                 NombreCategoria = t.NombreCategoria,
                 CodCategoria = t.CodCategoria,
                 EstadoActivo = t.EstadoActivo
             }).ToList();

            return categorias;
        }

        // GET: api/Categoria/5
        [HttpGet("{id}")]
        public IEnumerable<TbCategoria> Get(int id)
        {
            var categorias =
           (from TbCategoria t in _context.TbCategoria
            where t.CodCategoria == id
            select new TbCategoria
            {
                NombreCategoria = t.NombreCategoria,
                CodCategoria = t.CodCategoria,
                EstadoActivo = t.EstadoActivo
            }).ToList();

            return categorias;
        }

        // POST: api/Categoria
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TbCategoria tbCategoria)
        {
            var cat = await _context.TbCategoria.FindAsync(tbCategoria.CodCategoria);
            if (cat == null)
            {
                _context.TbCategoria.Add(tbCategoria);
                await _context.SaveChangesAsync();
                return Ok(tbCategoria);
            }


            return BadRequest();

        }

        // PUT: api/Categoria/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TbCategoria tbCategoria)
        {
            var cat = await _context.TbCategoria.FindAsync(id);
            if (cat == null)
            {
                return NotFound();
            }
            _context.Entry(tbCategoria).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(tbCategoria);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var categorias = await _context.TbCategoria.FindAsync(id);
            if (categorias == null)
            {
                return NotFound();
            }
            _context.TbCategoria.Remove(categorias);
            await _context.SaveChangesAsync();

            return Ok();

        }
    }
}
