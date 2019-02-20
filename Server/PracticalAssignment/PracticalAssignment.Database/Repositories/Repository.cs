using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace PracticalAssignment.Database.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        public DbContext _dbContext;
        internal DbSet<T> _dbSet;
        public Repository(DbContext context)
        {
            _dbContext = context ?? throw new ArgumentNullException(nameof(context));
            _dbSet = _dbContext.Set<T>();
        }

        public void Delete(T entity)
        {
            var existing = _dbSet.Find(entity);
            if (existing != null)
            {
                _dbSet.Remove(existing);
            }
        }

        public void ExcQuery(string sql, params object[] parameters)
        {
            //_dbContext.Database.(sql, parameters);
        }

        public T FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.FirstOrDefault(predicate);
        }


        public IQueryable<T> GetAll()
        {
            return _dbSet.AsQueryable();
        }

        public bool GetAny(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.AsQueryable().Any(predicate);
        }

        public T GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public List<T> GetList()
        {
            return _dbSet.ToList();
        }

        public void Insert(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Update(T entity)
        {
            //_dbSet.Update(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
    }
}
