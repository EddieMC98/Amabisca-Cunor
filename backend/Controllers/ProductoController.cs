using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.IO;
using System.Net.Http.Headers;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly BDContext _context;


        public ProductoController(BDContext context)
        {
            _context = context;
        }

        // GET: api/Producto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbProducto>>> GetTbProducto()
        {
            return await _context.TbProducto.ToListAsync();
        }

        // GET: api/Producto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbProducto>> GetTbProducto(int id)
        {
            var tbProducto = await _context.TbProducto.FindAsync(id);

            if (tbProducto == null)
            {
                return NotFound();
            }

            return tbProducto;
        }

        // PUT: api/Producto/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult>
        PutTbProducto(int id, TbProducto tbProducto)
        {

            if (id != tbProducto.CodProducto)
            {
                return BadRequest();
            }
            tbProducto.FechaModificacion = DateTime.Now;
            _context.Entry(tbProducto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbProductoExists(id))
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

        // POST: api/Producto
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbProducto>> PostTbProducto(TbProducto tbProducto)
        {
            tbProducto.FechaCreacion = DateTime.Now;
            tbProducto.FechaModificacion = null;
            int? codUsuario = Convert.ToInt32(HttpContext.User.Identity.Name);
            tbProducto.UsrModificacion = codUsuario;

            _context.TbProducto.Add(tbProducto);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbProductoExists(tbProducto.CodProducto))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbProducto",
            new { id = tbProducto.CodProducto },
            tbProducto);
        }

        //DELETE: api/Producto/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TbProducto>> DeleteTbProducto(int id)
        {
            var tbProducto = await _context.TbProducto.FindAsync(id);
            if (tbProducto == null)
            {
                return NotFound();
            }

            _context.TbProducto.Remove(tbProducto);
            await _context.SaveChangesAsync();

            return tbProducto;
        }

        private bool TbProductoExists(int id)
        {
            return _context.TbProducto.Any(e => e.CodProducto == id);
        }

        [AllowAnonymous]
        //Método para pruebas
        [HttpPost("Upload"), DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [AllowAnonymous]
        // GET: api/Producto
        [HttpGet("lstProducto")]
        public async Task<ActionResult<IEnumerable<ProductoAux>>> GetTbProductoAux()
        {
            var lstProductoAux = from pr in _context.TbProducto
                                 join ma in _context.TbMarca on pr.CodMarca equals ma.CodMarca
                                 join um in _context.TbUnidadMedida on pr.CodUnidadMedida equals um.CodUnidadMedida
                                 join cat in _context.TbCategoria on pr.CodCategoria equals cat.CodCategoria
                                 select new ProductoAux
                                 {
                                     CodProducto = pr.CodProducto,
                                     NombreProducto = pr.NombreProducto,
                                     CodigoProducto = pr.CodigoProducto,
                                     DetalleProducto = pr.DetalleProducto,
                                     Marca = ma.NombreMarca,
                                     Categoria = cat.NombreCategoria,
                                     PrecioCosto = pr.PrecioCosto,
                                     PrecioVenta = pr.PrecioVenta,
                                     ImagenProducto = pr.ImagenProducto,
                                     UnidadMedida = um.NombreUnidadMedida,
                                     EstadoActivo = pr.EstadoActivo
                                 };
            //List<ProductoAux> hola = lstProductoAux.ToList();

            return await lstProductoAux.ToListAsync();
        }

        [AllowAnonymous]
        // GET: api/Producto
        [HttpGet("lstProductoCatalogo")]
        public async Task<ActionResult<IEnumerable<ProductoAux>>> GetTbProductoCatalogo()
        {
            var lstProductoAux = from pr in _context.TbProducto
                                 join ma in _context.TbMarca on pr.CodMarca equals ma.CodMarca
                                 join um in _context.TbUnidadMedida on pr.CodUnidadMedida equals um.CodUnidadMedida
                                 join cat in _context.TbCategoria on pr.CodCategoria equals cat.CodCategoria
                                 where pr.EstadoActivo == 1
                                 select new ProductoAux
                                 {
                                     CodProducto = pr.CodProducto,
                                     NombreProducto = pr.NombreProducto,
                                     CodigoProducto = pr.CodigoProducto,
                                     DetalleProducto = pr.DetalleProducto,
                                     Marca = ma.NombreMarca,
                                     Categoria = cat.NombreCategoria,
                                     PrecioVenta = pr.PrecioVenta,
                                     ImagenProducto = pr.ImagenProducto,
                                     UnidadMedida = um.NombreUnidadMedida,
                                     EstadoActivo = pr.EstadoActivo
                                 };
            //List<ProductoAux> hola = lstProductoAux.ToList();

            return await lstProductoAux.ToListAsync();
        }

        [AllowAnonymous]
        // GET: api/Producto
        [HttpGet("lstProductoCatalogo/{id}")]
        public async Task<ActionResult<IEnumerable<ProductoAux>>> GetProductoCatalogo(int id)
        {
            int? codAux = id;
            var lstProductoAux = from pr in _context.TbProducto
                                 join ma in _context.TbMarca on pr.CodMarca equals ma.CodMarca
                                 join um in _context.TbUnidadMedida on pr.CodUnidadMedida equals um.CodUnidadMedida
                                 join cat in _context.TbCategoria on pr.CodCategoria equals cat.CodCategoria
                                 where pr.CodProducto == id
                                 select new ProductoAux
                                 {
                                     CodProducto = pr.CodProducto,
                                     NombreProducto = pr.NombreProducto,
                                     CodigoProducto = pr.CodigoProducto,
                                     DetalleProducto = pr.DetalleProducto,
                                     Marca = ma.NombreMarca,
                                     Categoria = cat.NombreCategoria,
                                     PrecioVenta = pr.PrecioVenta,
                                     ImagenProducto = pr.ImagenProducto,
                                     UnidadMedida = um.NombreUnidadMedida,
                                     EstadoActivo = pr.EstadoActivo
                                 };

            return await lstProductoAux.ToListAsync();

        }
    }
}
