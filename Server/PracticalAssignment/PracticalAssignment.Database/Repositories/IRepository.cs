using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace PracticalAssignment.Database.Repositories
{
    public interface IRepository<T>
    {
        T GetById(object id);
        bool GetAny(Expression<Func<T, bool>> predicate);
        IQueryable<T> GetAll();
        List<T> GetList();
        T FirstOrDefault(Expression<Func<T, bool>> predicate);
        void ExcQuery(string sql, params object[] parameters);
        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
