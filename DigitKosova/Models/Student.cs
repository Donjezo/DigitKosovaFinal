using System;
using System.Collections.Generic;

namespace DigitKosova.Models
{
    public class Student : User
    {
        public override string Role { get; set; }
        public Guid? PersonalInfoId { get; set; }
        public PersonalInfo PersonalInfo { get; set; }
        public ICollection<Subject> Subjects { get; set; }
        public ICollection<Grading> Gradings { get; set; }

    }
}
