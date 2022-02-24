using System;

namespace DigitKosova.Models
{
    public class Grading
    {
        public Guid Id { get; set; }
        public string Grade { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public Student Student { get; set; }
        public string StudentId { get; set; }
        public Professor Professor { get; set; }
        public string ProfessorId { get; set; }
    }
}
