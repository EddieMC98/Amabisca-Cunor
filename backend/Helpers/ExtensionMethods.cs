using System.Collections.Generic;
using System.Linq;
using backend.Models;

namespace backend.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<Usuario> WithoutPasswords(this IEnumerable<Usuario> users) {
            return users.Select(x => x.WithoutPassword());
        }

        public static Usuario WithoutPassword(this Usuario user) {
            user.contrasenia = null;
            return user;
        }
    }
}