using PracticalAssignment.Database.Entities.Entity;
using PracticalAssignment.Database.EntityFrameworkCore;
using PracticalAssignment.Database.Repositories;
using System;

namespace PracticalAssignment.Database.UnitOfWorks
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Library> Libraries { get; }
        IRepository<Document> Documents { get; }
        IRepository<User> Users { get; }
        /// <summary>
        /// Call save change from db context
        /// </summary>
        void Save();
    }
}
