using System;

namespace DigitKosova.Models
{
    public class Professor : User
    {
        public override string Role { get; set; }

        public Guid? PersonalInfoId { get; set; }
        public PersonalInfo PersonalInfo { get; set; }

        public Guid? SubjectId { get; set; }

        public Subject Subject { get; set; }
    }
}