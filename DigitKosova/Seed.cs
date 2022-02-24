using DigitKosova.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitKosova
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<User>
                {
                    new Admin
                    {
                        Firstname="Admin",
                        Lastname="Admin",
                        Email="admin@test.com",
                        UserName="admin",
                        Role = "admin"
                    },
                    new Professor
                    {
                        Firstname="Professor",
                        Lastname="Professor",
                        Email="professor@test.com",
                        UserName="professor",
                        Role = "professor"
                    },
                    new Student
                    {
                        Firstname="Student",
                        Lastname="Student",
                        Email="student@test.com",
                        UserName="student",
                        Role = "student"

                    },
                     new Parent
                    {
                        Firstname="Parent",
                        Lastname="Parent",
                        Email="parent@test.com",
                        UserName="parent",
                        Role = "parent"

                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
        }
    }
}
