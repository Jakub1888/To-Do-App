using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
  public class TodoItem
  {
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Description { get; set; }
    public bool Done { get; set; } = false;
    public DateTime CreationDate { get; set; }
    public DateTime? CompletionDate { get; set; } = null;
  }
}