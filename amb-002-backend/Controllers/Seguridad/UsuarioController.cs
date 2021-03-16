using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using amb_002_backend.Services;
using amb_002_backend.Models;
using System.Linq;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;

namespace amb_002_backend.Controllers_Seguridad
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioService _userService;
        private readonly ILogger<UsuariosController> _logger;

        private readonly amabisca_cunorContext _context;

        public UsuariosController(IUsuarioService userService, ILogger<UsuariosController> logger, amabisca_cunorContext context)
        {
            _logger = logger;
            _userService = userService;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.email, model.password);

            if (user == null)
                return BadRequest(new { message = "Correo electrónico o contraseña incorrecta." });

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpDelete("logout")]
        public IActionResult Logout()
        {
            return Ok();
        }

        // GET: usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbUsuario>>> GetUsuarios()
        {
            return await _context.TbUsuario.ToListAsync();
        }

        // GET: usuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbUsuario>> GetUsuarios(int id)
        {
            var usuarios = await _context.TbUsuario.FindAsync(id);

            if (usuarios == null)
            {
                return NotFound();
            }

            usuarios.Contraseña = null;
            usuarios.Salt = null;

            return usuarios;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> editar(int id, RegisterModel usuario)
        {
            if (id != usuario.cod_usuario)
            {
                return BadRequest();
            }

            TbUsuario reg = _context.TbUsuario.Find(usuario.cod_usuario);

            reg.NombreUsuario = usuario.nombre_completo;
            reg.EstadoActivo = usuario.estado;
            reg.FecCreacion = DateTime.Now;
            reg.CodRol = usuario.cod_rol;

            if (!string.IsNullOrWhiteSpace(usuario.contrasenia))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(usuario.contrasenia, out passwordHash, out passwordSalt);

                reg.Contraseña = passwordHash;
                reg.Salt = passwordSalt;
            }

            _context.Entry(reg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuariosExists(id))
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

        // POST: api/Usuarios
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TbUsuario>> nuevo(RegisterModel usuario)
        {
            if (string.IsNullOrWhiteSpace(usuario.contrasenia))
                return BadRequest();

            if (_context.TbUsuario.Any(x => x.CorreoElectronico == usuario.correo_electronico))
                return BadRequest();

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(usuario.contrasenia, out passwordHash, out passwordSalt);

            TbUsuario reg = new TbUsuario();

            reg.NombreUsuario = usuario.nombre_completo;
            reg.CorreoElectronico = usuario.correo_electronico;
            reg.Contraseña = passwordHash;
            reg.Salt = passwordSalt;
            reg.EstadoActivo = usuario.estado;
            reg.FecCreacion = DateTime.Now;
            reg.CodRol =  usuario.cod_rol;

            _context.TbUsuario.Add(reg);

            //_context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuarios", new { id = reg.CodUsuario }, reg);
        }

        private bool UsuariosExists(int id)
        {
            return _context.TbUsuario.Any(e => e.CodUsuario == id);
        }

        //DELETE   
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteUser(int id)
        {
           TbUsuario reg = _context.TbUsuario.Find(id);
           var reg1 = await _context.TbUsuario.FindAsync(id); 

           if(reg1==null)
           {
               return NotFound();
           }

           _context.TbUsuario.Remove(reg1);
           await _context.SaveChangesAsync();
           return NoContent();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("No se permite una contraseña vacía.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        // GET: menu/permisos/5/6
        [HttpGet("menu/permisos/{codRol}")]
        public ActionResult<List<MenuOpcion2>> GetMenus(int codRol) => _userService.GetOpciones(codRol);


        [HttpPost("menu/permisos")]
        public async Task<ActionResult<int>> SaveMenus(List<MenuOpcion2> items)
        {
            foreach(var item in items){
                var permiso = _context.TbPermiso.SingleOrDefault(x => x.CodRol == item.cod_rol && x.CodMenuOpcion == item.cod_menu_opcion);

                if (permiso != null){
                    permiso.FecActualizacion = DateTime.Now;
                    permiso.EstadoActivo = item.estado_permiso;
                    _context.Entry(permiso).State = EntityState.Modified;
                }else{
                    TbPermiso nuevo = new TbPermiso();
                    nuevo.FecActualizacion = DateTime.Now;
                    nuevo.FechCreacion = DateTime.Now;
                    nuevo.CodMenuOpcion = item.cod_menu_opcion;
                    nuevo.EstadoActivo = item.estado_permiso;
                    nuevo.CodRol = item.cod_rol;
                    _context.TbPermiso.Add(nuevo);
                }
            }

            //_context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return 1;
        }
    }
}