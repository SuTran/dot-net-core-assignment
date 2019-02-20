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

            if (_context.Libraries.Count() == 0)
            {
                List<Library> listLib = new List<Library>()
                {
                    new Library() {
                        Id=Guid.NewGuid(),
                        Name="test",
                        Description="test"
                    },
                     new Library() {
                        Id=Guid.NewGuid(),
                        Name="test2",
                        Description="test2"
                    },
                };
                _context.Libraries.AddRange(listLib);
            }
            await _context.SaveChangesAsync();
        }
    }
}
