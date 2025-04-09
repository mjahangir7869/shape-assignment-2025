using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace shape_assignment.Models
{
    public class SignUp
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "This Field is Required")]
        [StringLength(12, ErrorMessage = "Name is too long.")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "This Field is Required")]
        [StringLength(16, ErrorMessage = "Name is too long.")]
        public string LastName { get; set; }

        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", ErrorMessage = "Please enter a valid e-mail adress")]
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$",
           ErrorMessage = "Password must be at least 8 characters and include an uppercase, lowercase, number, and special character.")]
        public string Password { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$",
          ErrorMessage = "Password must be at least 8 characters and include an uppercase, lowercase, number, and special character.")]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        [NotMapped]
        public string ConfirmPassword { get; set; }
    }
}
