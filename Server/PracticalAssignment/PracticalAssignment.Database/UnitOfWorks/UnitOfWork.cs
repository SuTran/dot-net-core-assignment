using PracticalAssignment.Database.Entities.Entity;
using PracticalAssignment.Database.EntityFrameworkCore;
using PracticalAssignment.Database.Repositories;

namespace PracticalAssignment.Database.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private IRepository<Library> _library;
        private IRepository<Document> _document;
        private IRepository<User> _user;


        private readonly AppDbContext _dbContext;
        public UnitOfWork(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IRepository<Document> Documents
        {
            get
            {
                if (_document == null)
                    _document = new Repository<Document>(_dbContext);

                return _document;
            }
        }

        public IRepository<User> Users
        {
            get
            {
                if (_user == null)
                    _user = new Repository<User>(_dbContext);

                return _user;
            }
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
