using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace API.Controllers
{
    public class TodoItemsController : BaseAPIController
    {
        private readonly DataContext _context;
        public TodoItemsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDto>>> GetTodoItems()
        {
            return await _context.TodoItems
                .Select(x => ItemToDto(x))
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDto>> GetTodoItem(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem is null)
            {
                return NotFound();
            }

            return ItemToDto(todoItem);
        }

        [HttpPost]
        public async Task<ActionResult<TodoItemDto>> PostTodoItem(TodoItemDto todoItemDto)
        {
            var todoItem = new TodoItem
            {
                Id = todoItemDto.Id,
                Name = todoItemDto.Name,
                Description = todoItemDto.Description,
                Done = todoItemDto.Done,
                CreationDate = todoItemDto.CreationDate,
                CompletionDate = todoItemDto.CompletionDate,
                TaskType = todoItemDto.TaskType
            };

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTodoItem),
                new { id = todoItem.Id },
                ItemToDto(todoItem));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoItemDto>> PutTodoItem(int id, TodoItemDto todoItemDto)
        {
            if (id != todoItemDto.Id)
            {
                return BadRequest();
            }

            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            todoItem.Done = todoItemDto.Done;
            todoItem.CompletionDate = todoItemDto.CompletionDate;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
            {
                return NotFound();

            }
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodoItem(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem is null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private static TodoItemDto ItemToDto(TodoItem todoItem) =>
            new TodoItemDto
            {
                Id = todoItem.Id,
                Name = todoItem.Name,
                Description = todoItem.Description,
                Done = todoItem.Done,
                CreationDate = todoItem.CreationDate,
                CompletionDate = todoItem.CompletionDate,
                TaskType = todoItem.TaskType
            };

        private bool TodoItemExists(int id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}