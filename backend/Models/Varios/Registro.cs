namespace backend.Models
{
    public class Registro
    {
       
        public string fullName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string confirmPassword { get; set; }
        public bool terms {get;set;}
        
    }
}