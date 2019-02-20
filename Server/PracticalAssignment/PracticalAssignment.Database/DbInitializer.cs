using Microsoft.AspNetCore.Identity;
using PracticalAssignment.Database.Entities.Entity;
using PracticalAssignment.Database.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticalAssignment.Database
{
    public class DbInitializer
    {
        private readonly AppDbContext _context;

        public DbInitializer(AppDbContext context)
        {
            _context = context;
        }
        public async Task Seed()
        {
            if (_context.Users.Count() == 0)
            {
                List<User> listUser = new List<User>()
                {
                    new User() {
                        Id=Guid.NewGuid(),
                        Username="admin",
                        IsAdmin=true
                    },
                     new User() {
                        Id=Guid.NewGuid(),
                        Username="user",
                        IsAdmin=false
                    },
                };
                _context.Users.AddRange(listUser);
            }
            await _context.SaveChangesAsync();
        }
    }
}
