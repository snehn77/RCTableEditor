using Microsoft.EntityFrameworkCore;
using RCTableEditor.Server.Data;
using RCTableEditor.Server.Models;
using RCTableEditor.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure SQLite database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=RCTableEditor.db";
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

// Configure LiteDB for draft storage
builder.Services.AddSingleton<DraftStorageService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5248", "http://localhost:1302", "https://localhost:7259", "https://localhost:62869", "http://localhost:62869", "http://localhost:5173") // Assuming this is your React app URL
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Add Swagger/OpenAPI
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
app.UseCors("CorsPolicy");
app.UseAuthorization();
app.MapControllers();

// Create/migrate database automatically
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();
    AppDbContext.SeedData(context);
}

app.Run();