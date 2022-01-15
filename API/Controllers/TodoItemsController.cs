using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class TodoItemsController : BaseAPIController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserRepository _userRepository;

        public TodoItemsController(DataContext context, IMapper mapper,
            UserManager<AppUser> userManager, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDto>>> GetTodoItems()
        {
            var userId = User.GetUserId();

            return await _context.TodoItems
                .Where(x => x.AppUserId == userId)
                .OrderBy(x => x.CompletionDate)
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
            var userId = User.GetUserId();
            var user = await _userRepository.GetUserByIdAsync(userId);

            var todoItem = new TodoItem
            {
                Id = todoItemDto.Id,
                Name = todoItemDto.Name,
                Description = todoItemDto.Description,
                Done = todoItemDto.Done,
                CreationDate = todoItemDto.CreationDate,
                CompletionDate = todoItemDto.CompletionDate,
                TaskType = todoItemDto.TaskType,
                AppUserId = user.Id
            };

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTodoItem),
                new { id = todoItem.Id },
                _mapper.Map<TodoItemDto>(todoItem));
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
            if (todoItem.Done == true)
            {
                todoItem.CompletionDate = DateTime.UtcNow;
            }
            else
            {
                todoItem.Name = todoItemDto.Name;
                todoItem.Description = todoItemDto.Description;
                todoItem.TaskType = todoItemDto.TaskType;
                todoItem.CompletionDate = null;
            }

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

        private bool TodoItemExists(int id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
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
                TaskType = todoItem.TaskType,
            };
    }
}