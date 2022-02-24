 using DigitKosova.Dto;
using DigitKosova.Models;
using DigitKosova.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DigitKosova.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly TokenService tokenService;

        public UserController(DataContext dataContext, UserManager<User> userManager, 
                SignInManager<User> signInManager, TokenService tokenService)
        {
            this.dataContext = dataContext;
            this.userManager = userManager;
            this.signInManager = signInManager;  
            this.tokenService = tokenService;
        }




        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }
        private UserDto CreateUserObject(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                Token = tokenService.CreateToken(user),
                UserName = user.UserName,
                Role = user.Role
            };
        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            return await dataContext.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(string id)
        {
            var user = await dataContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await dataContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            dataContext.Users.Remove(user);
            await dataContext.SaveChangesAsync();

            return NoContent();
        }
        //[HttpPost]
        //public async Task<ActionResult<User>> PostUser(User user)
        //{
        //    var userCreated = PersonService.GetPerson(user.Type);

        //    _context.User.Add(user);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUser", new { id = user.Id }, user);
        //}

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }
            if (await userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username is taken");
                return ValidationProblem();
            }

            User user = null;

            if (registerDto.Role.ToLower().Equals("admin"))
            {
                user = new Admin
                {
                    Firstname = registerDto.Firstname,
                    Lastname = registerDto.Lastname,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.PasswordHash,
                    Role = registerDto.Role
                };
            }

            else if (registerDto.Role.ToLower().Equals("student"))
            {
                user = new Student
                {
                    Firstname = registerDto.Firstname,
                    Lastname = registerDto.Lastname,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.PasswordHash,
                    PersonalInfo = null,
                    Role = registerDto.Role
                };
            }
            else if (registerDto.Role.ToLower().Equals("parent"))
            {
                user = new Student
                {
                    Firstname = registerDto.Firstname,
                    Lastname = registerDto.Lastname,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.PasswordHash,
                    PersonalInfo = null,
                    Subjects = null,
                    Role = registerDto.Role
                };
            }

            var result = await userManager.CreateAsync(user, registerDto.PasswordHash);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        [HttpGet("prof/{id}")]

        public async Task<ActionResult<Professor>> GetProfessor(string Id)
        {
            Professor prof = (Professor)await userManager.Users.FirstOrDefaultAsync(x => x.Id == Id);

            if (prof == null) return null;

            PersonalInfo perInfo = await dataContext.PersonalInfos.FindAsync(prof.PersonalInfoId);
            Subject subject = await dataContext.Subjects.FindAsync(prof.SubjectId);

            prof.PersonalInfo = perInfo;
            prof.Subject = subject;

            return Ok(prof);
        }


        [HttpPost("register/professor")]
        public async Task<ActionResult<UserDto>> RegisterProfessor(Professor professor)
        {
            if (await userManager.Users.AnyAsync(x => x.Email == professor.Email))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }
            if (await userManager.Users.AnyAsync(x => x.UserName == professor.UserName))
            {
                ModelState.AddModelError("username", "Username is taken");
                return ValidationProblem();
            }

            Professor user = new Professor
            {
                Firstname = professor.Firstname,
                Lastname = professor.Lastname,
                UserName = professor.UserName,
                Email = professor.Email,
                Role = professor.Role,
                PasswordHash = professor.PasswordHash,
                SubjectId = professor.SubjectId,
                PersonalInfo = new PersonalInfo
                {
                    PersonalNumber = professor.PersonalInfo.PersonalNumber,
                    DateOfBirth = professor.PersonalInfo.DateOfBirth,
                    Gender = professor.PersonalInfo.Gender,
                    PhoneNumber = professor.PersonalInfo.PhoneNumber,
                    Address = professor.PersonalInfo.Address,
                    MaritalStatus = professor.PersonalInfo.MaritalStatus,
                }
            };

            var result = await userManager.CreateAsync(user, professor.PasswordHash);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

    }
}
