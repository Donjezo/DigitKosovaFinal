using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitKosova.Models;
using Microsoft.AspNetCore.Identity;

namespace DigitKosova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradingsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> userManager;

        public GradingsController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        // GET: api/Gradings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grading>>> GetGrading()
        {
            return await _context.Grading.ToListAsync();
        }

        // GET: api/Gradings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grading>> GetGrading(Guid id)
        {
            var grading = await _context.Grading.FindAsync(id);

            if (grading == null)
            {
                return NotFound();
            }

            return grading;
        }

        [HttpGet("student/{studentId}")]
        public async Task<ActionResult<List<Grading>>> GetGradesByStudent(string studentId)
        {

            var grades = await _context.Gradings.Where(x => x.StudentId == studentId).ToListAsync();
            return grades;
        }




        //[HttpGet("student/{studentId}")]
        //public async Task<ActionResult<List<Grading>>> GetGradesByStudent(string id)
        //{
        //    var grades = await _context.Gradings
        //        .Where(x => x.StudentId == id)
        //        .ToListAsync();

        //    foreach (Grading a in grades)
        //    {
        //        a.Student = (Student)await _context.Users.FindAsync(a.StudentId);
        //        //a.Professor = (Professor)await _context.Users.FindAsync(a.ProfessorId);
        //    }

        //    return Ok(grades);
        //}

        // PUT: api/Gradings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrading(Guid id, Grading grading)
        {
            if (id != grading.Id)
            {
                return BadRequest();
            }

            _context.Entry(grading).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Gradings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Grading>> PostGrading(Grading grading)
        {
            _context.Grading.Add(grading);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGrading", new { id = grading.Id }, grading);
        }

        // DELETE: api/Gradings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrading(Guid id)
        {
            var grading = await _context.Grading.FindAsync(id);
            if (grading == null)
            {
                return NotFound();
            }

            _context.Grading.Remove(grading);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GradingExists(Guid id)
        {
            return _context.Grading.Any(e => e.Id == id);
        }
    }
}
