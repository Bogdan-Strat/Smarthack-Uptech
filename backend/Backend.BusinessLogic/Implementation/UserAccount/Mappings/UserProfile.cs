using AutoMapper;
using Backend.BusinessLogic.Implementation.UserAccount.Models;
using Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.BusinessLogic.Implementation.UserAccount.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            /*CreateMap<RegisterUserModel, User>()
                .ForMember(a => a.Id, r => r.MapFrom(s => Guid.NewGuid()))
                .ForMember(a => a.Salt, r => r.MapFrom(s => Guid.NewGuid()))
                .ForMember(a => a.Password, r => r.Ignore())
                .ForMember(a => a.Email, r => r.MapFrom(s => s.Email))
                .ForMember(a => a.UserName, r => r.MapFrom(s => s.Username))
                ;*/
        }
    }
}
