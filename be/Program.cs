using Microsoft.EntityFrameworkCore;
using shape_assignment.Data;
using shape_assignment.Interfaces;
using shape_assignment.Models;
using System;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<Shapedbcontext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//builder.Services.AddScoped<SignUp>();
builder.Services.AddScoped<ISignUp, SignUpService>(); // Registering ISignUp interface and its implementation

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
