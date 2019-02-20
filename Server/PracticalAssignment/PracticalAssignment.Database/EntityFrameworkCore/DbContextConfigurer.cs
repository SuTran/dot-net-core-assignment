using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace PracticalAssignment.Database.EntityFrameworkCore
{
    public static class DbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<AppDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<AppDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
