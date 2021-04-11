using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend.Services;
using backend.Models;
using System.Linq;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Controllers
{
  // [Authorize(Roles = "Administrador")]
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioService _userService;
        private readonly ILogger<UsuariosController> _logger;

        private readonly BDContext _context;

        public UsuariosController(IUsuarioService userService, ILogger<UsuariosController> logger, BDContext context)
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
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuario.ToListAsync();
        }

        // GET: usuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuarios(int id)
        {
            var usuarios = await _context.Usuario.FindAsync(id);

            if (usuarios == null)
            {
                return NotFound();
            }

            usuarios.contrasenia = null;
            usuarios.salt = null;

            return usuarios;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> editar(int id, RegisterModel usuario)
        {
            if (id != usuario.cod_usuario )
            {
                return BadRequest();
            }

            Usuario reg = _context.Usuario.Find(usuario.cod_usuario);
            if(reg.correo_electronico != usuario.correo_electronico){
                if( _context.Usuario.Any(x => x.correo_electronico == usuario.correo_electronico)){
                    return BadRequest();
                }
            }
            reg.nombre_completo = usuario.nombre_completo;
            reg.estado = usuario.estado;
            reg.fec_creacion = DateTime.Now;
            reg.cod_rol = usuario.cod_rol;
            reg.correo_electronico= usuario.correo_electronico;
            

            if (!string.IsNullOrWhiteSpace(usuario.contrasenia))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(usuario.contrasenia, out passwordHash, out passwordSalt);

                reg.contrasenia = passwordHash;
                reg.salt = passwordSalt;
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
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<Usuario>> nuevo(RegisterModel usuario)
        {
            if (string.IsNullOrWhiteSpace(usuario.contrasenia))
                return BadRequest();

            if (_context.Usuario.Any(x => x.correo_electronico == usuario.correo_electronico))
                return BadRequest();

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(usuario.contrasenia, out passwordHash, out passwordSalt);

            Usuario reg = new Usuario();

            reg.nombre_completo = usuario.nombre_completo;
            reg.correo_electronico = usuario.correo_electronico;
            reg.contrasenia = passwordHash;
            reg.salt = passwordSalt;
            reg.estado = usuario.estado;
            reg.fec_creacion = DateTime.Now;
            reg.cod_rol =  usuario.cod_rol;

            _context.Usuario.Add(reg);

            //_context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuarios", new { id = reg.cod_usuario }, reg);
        }

        [AllowAnonymous]
        [HttpPost("new-register")]
        public async Task<ActionResult<Usuario>> newUser(Registro rm){

            RegisterModel usuario = new RegisterModel();
            usuario.nombre_completo=rm.fullName;
            usuario.correo_electronico = rm.email;
            usuario.contrasenia = rm.password;
            usuario.estado=1;
            usuario.cod_rol=3;
            
            if (string.IsNullOrWhiteSpace(usuario.contrasenia) || usuario.contrasenia != rm.confirmPassword)
                return BadRequest();

            if (_context.Usuario.Any(x => x.correo_electronico == usuario.correo_electronico))
                return BadRequest();

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(usuario.contrasenia, out passwordHash, out passwordSalt);

            Usuario reg = new Usuario();

            reg.nombre_completo = usuario.nombre_completo;
            reg.correo_electronico = usuario.correo_electronico;
            reg.contrasenia = passwordHash;
            reg.salt = passwordSalt;
            reg.estado = usuario.estado;
            reg.fec_creacion = DateTime.Now;
            reg.cod_rol =  usuario.cod_rol;

            _context.Usuario.Add(reg);

            //_context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(reg);
        }

        
        private bool UsuariosExists(int id)
        {
            return _context.Usuario.Any(e => e.cod_usuario == id);
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
                var permiso = _context.Permiso.SingleOrDefault(x => x.cod_rol == item.cod_rol && x.cod_menu_opcion == item.cod_menu_opcion);

                if (permiso != null){
                    permiso.fec_actualizacion = DateTime.Now;
                    permiso.estado = item.estado_permiso;
                    _context.Entry(permiso).State = EntityState.Modified;
                }else{
                    Permiso nuevo = new Permiso();
                    nuevo.fec_actualizacion = DateTime.Now;
                    nuevo.fec_creacion = DateTime.Now;
                    nuevo.cod_menu_opcion = item.cod_menu_opcion;
                    nuevo.estado = item.estado_permiso;
                    nuevo.cod_rol = item.cod_rol;
                    _context.Permiso.Add(nuevo);
                }
            }

            //_context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return 1;
        }
    }
}