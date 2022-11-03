using System;
using System.Collections.Generic;

namespace Backend.Entities
{
    public partial class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public Guid? Salt { get; set; }
        public byte[] Password { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string UserName { get; set; } = null!;
    }
}
