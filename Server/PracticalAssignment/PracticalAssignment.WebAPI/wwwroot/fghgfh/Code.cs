/*
	Trong thư mục Respository
	IRepository.cs bổ sung thêm hàm sau

*/
T Single(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            bool disableTracking = true);

/*
	Repository.cs bổ sung thêm hàm sau
	
*/
public T Single(Expression<Func<T, bool>> predicate = null,
	Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
	Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
	bool disableTracking = true)
{
	IQueryable<T> query = _dbSet;
	if (disableTracking) query = query.AsNoTracking();

	if (include != null) query = include(query);

	if (predicate != null) query = query.Where(predicate);

	if (orderBy != null)
		return orderBy(query).FirstOrDefault();
	return query.FirstOrDefault();
}

/*
	Cách sử dụng
	
	//Hàm get trả về 1 Data Object
	var repo = _unitOfWork.GetRepository<Entity>();
	tham số truyền vào là Id
	var data = repo.Single(x => x.Id == Id);
	
	var data = Mapper.Map<Lớp Model>(data);
	return data;
	
	//Hàm update
	var dataMapUpdate = Mapper.Map<Lớp Model>(model);
	 repo.Update(dataMapUpdate);
	_unitOfWork.SaveChanges();

*/
