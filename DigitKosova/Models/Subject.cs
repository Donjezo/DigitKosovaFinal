using System;
using System.Collections.Generic;

namespace DigitKosova.Models
{
    public class Subject
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Literature { get; set; }
        public string Topics { get; set; }
        public string News { get; set; }
        public ICollection<Professor> Professors { get; set; }
    }
}
