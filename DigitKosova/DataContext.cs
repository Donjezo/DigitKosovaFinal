using Microsoft.EntityFrameworkCore;
using DigitKosova.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace DigitKosova
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<PersonalInfo> PersonalInfos { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Grading> Gradings { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Admin>();
            builder.Entity<Professor>();
            builder.Entity<Student>();
            builder.Entity<Parent>();

            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
        public DbSet<DigitKosova.Models.Grading> Grading { get; set; }
    }
}