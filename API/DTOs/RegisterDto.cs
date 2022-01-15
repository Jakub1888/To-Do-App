using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [RegularExpression(@"^[A-Za-z0-9]+$")]
        public string Username { get; set; }

        [Required]
        [RegularExpression(@"^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*){6,20}$")]
        public string Password { get; set; }
    }
}