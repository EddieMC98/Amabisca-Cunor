using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class Repositorio : IRepository
    {
        private readonly BDContext _context;

        public Repositorio(BDContext context)
        {
            _context = context;
        }
        public Task CreateAsync<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteAsync<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public Task<List<T>> FindAll<T>() where T : class
        {
            throw new System.NotImplementedException();
        }

        public Task<T> FindById<T>(long id) where T : class
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<T>> FindPaged<T>(int page, int pageSize) where T : class
        {
            return await this._context.Set<T>().Skip(page * pageSize).Take(pageSize).ToListAsync();
        }

        public Task UpdateAsync<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }
    }

   
}