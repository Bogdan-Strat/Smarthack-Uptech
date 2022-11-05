using Backend.Common;
using Backend.Entities;

namespace Backend.DataAccess
{
    public class UnitOfWork
    {
        private readonly uptechdbContext Context;

        public UnitOfWork(uptechdbContext context)
        {
            Context = context;
        }

        private IRepository<Company> companies;
        public IRepository<Company> Companies => companies ?? (companies = new BaseRepository<Company>(Context));

        private IRepository<Candidate> candidates;
        public IRepository<Candidate> Candidates => candidates ?? (candidates = new BaseRepository<Candidate>(Context));

        private IRepository<Cv> cvs;
        public IRepository<Cv> Cvs => cvs ?? (cvs = new BaseRepository<Cv>(Context));

        private IRepository<FeedbackFromCandidate> feedbackFromCandidates;
        public IRepository<FeedbackFromCandidate> FeedbackFromCandidates => feedbackFromCandidates ?? (feedbackFromCandidates = new BaseRepository<FeedbackFromCandidate>(Context));

        private IRepository<Interview> interviews;
        public IRepository<Interview> Interviews => interviews ?? (interviews = new BaseRepository<Interview>(Context));

        private IRepository<InterviewXrecruiter> interviewXrecruiters;
        public IRepository<InterviewXrecruiter> InterviewXrecruiters => interviewXrecruiters ?? (interviewXrecruiters = new BaseRepository<InterviewXrecruiter>(Context));

        private IRepository<Job> jobs;
        public IRepository<Job> Jobs => jobs ?? (jobs = new BaseRepository<Job>(Context));

        private IRepository<JobLevel> jobLevels;
        public IRepository<JobLevel> JobLevels => jobLevels ?? (jobLevels = new BaseRepository<JobLevel>(Context));

        private IRepository<JobType> jobTypes;
        public IRepository<JobType> JobTypes => jobTypes ?? (jobTypes = new BaseRepository<JobType>(Context));

        private IRepository<Recruiter> recruiters;
        public IRepository<Recruiter> Recruiters => recruiters ?? (recruiters = new BaseRepository<Recruiter>(Context));

        private IRepository<Role> roles;
        public IRepository<Role> Roles => roles ?? (roles = new BaseRepository<Role>(Context));


        public void SaveChanges()
        {
            Context.SaveChanges();
        }
    }
}
