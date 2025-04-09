using Microsoft.EntityFrameworkCore;
using shape_assignment.Models;
using System;

namespace shape_assignment.Data
{
    public class Shapedbcontext:DbContext
    {
        public Shapedbcontext(DbContextOptions<Shapedbcontext> options)
           : base(options)
        {
        }

        public DbSet<SignUp> SignUps { get; set; }
    }
}
