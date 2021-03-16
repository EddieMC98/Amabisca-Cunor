using System.ComponentModel.DataAnnotations;

namespace amb_002_backend.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}