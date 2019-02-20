using PracticalAssignment.Database.Entities.Entity;
using PracticalAssignment.Database.EntityFrameworkCore;
using PracticalAssignment.Database.Repositories;

namespace PracticalAssignment.Database.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private IRepository<Library> _library;

        private readonly AppDbContext _dbContext;
        public UnitOfWork(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IRepository<Library> Libraries
        {
            get
            {
                if (_library == null)
                    _library = new Repository<Library>(_dbContext);

                return _library;
            }
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}
