using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using backend.Models;
using backend.Helpers;
using Newtonsoft.Json;

namespace backend.Services
{
    public interface IUsuarioService
    {
        Usuario Authenticate(string username, string password);
        IEnumerable<Usuario> GetAll();
        List<MenuOpcion2> GetOpciones(int codRol);
    }

    public class UsuarioService : IUsuarioService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications

        private readonly BDContext _context;

        private readonly AppSettings _appSettings;

        public UsuarioService(IOptions<AppSettings> appSettings, BDContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public Usuario Authenticate(string username, string password)
        {
            var user = _context.Usuario.SingleOrDefault(x => x.correo_electronico == username);

            // return null if user not found
            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.contrasenia, user.salt))
                return null;

            List<Menu2> menus = GetMenus(user.cod_rol);

            String tipo = "";
            if (user.cod_rol == 1){
                tipo = "Administrador";
            }else if (user.cod_rol == 2){
                tipo = "Operador";
            }
            else if (user.cod_rol == 3){
                tipo = "Cliente";
            }
            else{
                tipo = "Normal";
            }

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.cod_usuario.ToString()),
                    new Claim("menus", JsonConvert.SerializeObject(menus)),
                    new Claim("tipo", JsonConvert.SerializeObject(tipo))
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.token = tokenHandler.WriteToken(token);

            return user.WithoutPassword();
        }

        public IEnumerable<Usuario> GetAll()
        {
            return _context.Usuario.WithoutPasswords();
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
            List<Menu> rows = _context.Menu.ToList();
		    List<Menu2> menus = new List<Menu2>();

            foreach(Menu row in rows){
                Menu2 menu = new Menu2();
                menu.cod_menu = row.cod_menu;
                menu.nombre = row.nombre;
                menu.orden = row.orden;
                menu.icono = row.icono;
                menu.enlace = row.enlace;
                menu.inicio = row.inicio;

                List<MenuOpcion> rowsP  = (from m in _context.MenuOpcion
                                            join n in _context.Permiso on m.cod_menu_opcion equals n.cod_menu_opcion
                                            where m.cod_menu == menu.cod_menu && n.cod_rol == codRol && n.estado == 1
                                            orderby m.orden ascending
                                            select m).ToList();
                
                List<MenuOpcion> permisos  = new List<MenuOpcion>();
                int cnt = 0;
                foreach(MenuOpcion rowP in rowsP){
                    MenuOpcion per = new MenuOpcion();
                    per.cod_menu_opcion = rowP.cod_menu_opcion;
                    per.nombre = rowP.nombre;
                    per.estado = rowP.estado;
                    per.orden = rowP.orden;
                    per.enlace = rowP.enlace;
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
            var menuOpciones = (from m in _context.MenuOpcion
                                join n in _context.Menu on m.cod_menu equals n.cod_menu
                                orderby m.orden ascending, n.orden ascending
                                select m).ToList();

            List<MenuOpcion2> menus = new List<MenuOpcion2>();

            foreach(MenuOpcion item in menuOpciones){
                var menu =_context.Menu.SingleOrDefault(x => x.cod_menu == item.cod_menu);

                var permiso =(from n in _context.Permiso
                            where n.cod_rol == codRol && n.cod_menu_opcion == item.cod_menu_opcion
                            select n).SingleOrDefault();

                MenuOpcion2 nuevo = new MenuOpcion2();
                nuevo.cod_menu_opcion = item.cod_menu_opcion;
                nuevo.nombre = item.nombre;
                nuevo.estado = item.estado;
                nuevo.orden = item.orden;
                nuevo.cod_menu = item.orden;
                nuevo.enlace = item.enlace;
                
                if (permiso != null){
                    nuevo.estado_permiso = permiso.estado;
                }else{
                    nuevo.estado_permiso = 0;
                }

                nuevo.nom_menu = menu.nombre;
                nuevo.cod_rol = codRol;
                menus.Add(nuevo);
            }
            return menus;
        }
    }
}