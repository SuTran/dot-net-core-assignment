using Microsoft.EntityFrameworkCore;
using PracticalAssignment.Database.Entities.Entity;

namespace PracticalAssignment.Database.EntityFrameworkCore
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Document> Documents { set; get; }
        public DbSet<Library> Libraries { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }

}
