using shape_assignment.Models;

namespace shape_assignment.Interfaces
{
    public interface ISignUp
    {
        Task<string> SignedUp(SignUp signUp);
    }
}
