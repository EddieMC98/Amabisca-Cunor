using System.Collections.Generic;
using System.Linq;
using amb_002_backend.Models;

namespace amb_002_backend.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<TbUsuario> WithoutPasswords(this IEnumerable<TbUsuario> users) {
            return users.Select(x => x.WithoutPassword());
        }

        public static TbUsuario WithoutPassword(this TbUsuario user) {
            user.Contraseña = null;
            return user;
        }
    }
}