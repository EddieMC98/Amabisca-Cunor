using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using amb_002_backend.Models;
using amb_002_backend.Helpers;
using Newtonsoft.Json;

namespace amb_002_backend.Services
{
    public interface IUsuarioService
    {
        TbUsuario Authenticate(string username, string password);
        IEnumerable<TbUsuario> GetAll();
        List<MenuOpcion2> GetOpciones(int codRol);
    }

    public class UsuarioService : IUsuarioService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications

        private readonly amabisca_cunorContext _context;

        private readonly AppSettings _appSettings;

        public UsuarioService(IOptions<AppSettings> appSettings, amabisca_cunorContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public TbUsuario Authenticate(string username, string password)
        {
            var user = _context.TbUsuario.SingleOrDefault(x => x.CorreoElectronico == username);

            // return null if user not found
            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.Contraseña, user.Salt))
                return null;

            List<Menu2> menus = GetMenus(user.CodRol);

            String tipo = "";
            if (user.CodRol == 1){
                tipo = "admin_general";
            }else if (user.CodRol == 2){
                tipo = "negocio";
            }
            else{
                tipo = "normal";
            }

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.CodUsuario.ToString()),
                    new Claim("menus", JsonConvert.SerializeObject(menus)),
                    new Claim("tipo", JsonConvert.SerializeObject(tipo))
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user.WithoutPassword();
        }

        public IEnumerable<TbUsuario> GetAll()
        {
            return _context.TbUsuario.WithoutPasswords();
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    
        public List<Menu2> GetMenus(int codRol){
            List<TbMenu> rows = _context.TbMenu.ToList();
		    List<Menu2> menus = new List<Menu2>();

            foreach(TbMenu row in rows){
                Menu2 menu = new Menu2();
                menu.cod_menu = row.CodMenu;
                menu.nombre = row.Nombre;
                menu.orden = (int)row.Orden;
                menu.icono = row.Icono;
                menu.enlace = row.Enlace;
                menu.inicio = (int)row.Inicio;

                List<TbMenuOpcion> rowsP  = (from m in _context.TbMenuOpcion
                                            join n in _context.TbPermiso on m.CodMenuOpcion equals n.CodMenuOpcion
                                            where m.CodMenu == menu.cod_menu && n.CodRol == codRol && n.EstadoActivo == 1
                                            orderby m.Orden ascending
                                            select m).ToList();
                
                List<TbMenuOpcion> permisos  = new List<TbMenuOpcion>();
                int cnt = 0;
                foreach(TbMenuOpcion rowP in rowsP){
                    TbMenuOpcion per = new TbMenuOpcion();
                    per.CodMenuOpcion = rowP.CodMenuOpcion;
                    per.NombreMenuOpcion = rowP.NombreMenuOpcion;
                    per.EstadoActivo = rowP.EstadoActivo;
                    per.Orden = rowP.Orden;
                    per.Enlace = rowP.Enlace;
                    permisos.Add(per);
                    cnt++;
                }
                
                //Comprueba si existen permisos para el menú, de lo contrario no lo incluye.
                if (cnt > 0) {
                    menu.permisos = permisos;
                    menus.Add(menu);
                }
            }

            return menus;
        }

        public List<MenuOpcion2> GetOpciones(int codRol){
            var menuOpciones = (from m in _context.TbMenuOpcion
                                join n in _context.TbMenu on m.CodMenu equals n.CodMenu
                                orderby m.Orden ascending, n.Orden ascending
                                select m).ToList();

            List<MenuOpcion2> menus = new List<MenuOpcion2>();

            foreach(TbMenuOpcion item in menuOpciones){
                var menu =_context.TbMenu.SingleOrDefault(x => x.CodMenu == item.CodMenu);

                var permiso =(from n in _context.TbPermiso
                            where n.CodRol == codRol && n.CodMenuOpcion == item.CodMenuOpcion
                            select n).SingleOrDefault();

                MenuOpcion2 nuevo = new MenuOpcion2();
                nuevo.cod_menu_opcion = item.CodMenuOpcion;
                nuevo.nombre = item.NombreMenuOpcion;
                nuevo.estado = item.EstadoActivo;
                nuevo.orden = item.Orden;
                nuevo.cod_menu = item.CodMenu;
                nuevo.enlace = item.Enlace;
                
                if (permiso != null){
                    nuevo.estado_permiso = permiso.EstadoActivo;
                }else{
                    nuevo.estado_permiso = 0;
                }

                nuevo.nom_menu = menu.Nombre;
                nuevo.cod_rol = codRol;
                menus.Add(nuevo);
            }
            return menus;
        }
    }
}