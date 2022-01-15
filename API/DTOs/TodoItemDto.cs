using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class TodoItemDto
    {
        [Required] public int Id { get; set; }
        [Required] [StringLength(20, MinimumLength = 3)] public string Name { get; set; }
        [StringLength(80, MinimumLength = 0)] public string Description { get; set; }
        [Required] public bool Done { get; set; } = false;
        [Required] public DateTime CreationDate { get; set; } = DateTime.Now;
        public DateTime? CompletionDate { get; set; } = null;
        [Required] public TaskType TaskType { get; set; }

    }
}