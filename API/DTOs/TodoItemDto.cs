using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class TodoItemDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Done { get; set; } = false;
        public DateTime CreationDate { get; set; }
        public DateTime? CompletionDate { get; set; } = null;
        public TaskType TaskType { get; set; }
    }
}