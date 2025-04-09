using shape_assignment.Interfaces;
using shape_assignment.Data;
using shape_assignment.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

public class SignUpService : ISignUp
{
    private readonly Shapedbcontext _context;

    public SignUpService(Shapedbcontext context)
    {
        _context = context;
    }

    public async Task<string> SignedUp(SignUp signUp)
    {
        try
        {
            // Check if email already exists
            var existingUser = await _context.SignUps
                .FirstOrDefaultAsync(u => u.Email == signUp.Email);

            if (existingUser != null)
            {
                return "Email is already registered.";
            }

            // Hash the password
            var hasher = new PasswordHasher<object>();
            signUp.Password = hasher.HashPassword(null, signUp.Password);

            // Save new user
            await _context.SignUps.AddAsync(signUp);
            await _context.SaveChangesAsync();

            return "User signed up successfully!";
        }
        catch (Exception ex)
        {
            // Optional: log the error here
            return $"Error occurred: {ex.Message}";
        }
    }
}
