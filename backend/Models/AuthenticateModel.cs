using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}