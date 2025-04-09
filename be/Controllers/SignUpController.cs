using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using shape_assignment.Interfaces;
using shape_assignment.Models;

namespace shape_assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private readonly ISignUp _signUp;

        // Constructor Injection
        public SignUpController(ISignUp signUp)
        {
            _signUp = signUp;
        }

        // POST: api/SignUp/UserSignUp
        [HttpPost("UserSignUp")]
        public async Task<IActionResult> UserSignup(SignUp signUp)
        {
            // Call the SignUp service method
            var result = await _signUp.SignedUp(signUp);

            if (result == "User signed up successfully!")
            {
                return Ok(result);  // Success response
            }

            return BadRequest(result);  // Error response
        }
    }
}
