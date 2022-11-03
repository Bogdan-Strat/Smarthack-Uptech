using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public byte[] Password { get; set; } = null!;
        public Guid? Salt { get; set; }
        public string Username { get; set; } = null!;
    }
}
