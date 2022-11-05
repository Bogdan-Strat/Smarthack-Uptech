using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Backend.Entities;

namespace Backend.DataAccess
{
    public partial class uptechdbContext : DbContext
    {
        public uptechdbContext()
        {
        }

        public uptechdbContext(DbContextOptions<uptechdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BuilderOption> BuilderOptions { get; set; } = null!;
        public virtual DbSet<Candidate> Candidates { get; set; } = null!;
        public virtual DbSet<Company> Companies { get; set; } = null!;
        public virtual DbSet<Cv> Cvs { get; set; } = null!;
        public virtual DbSet<FeedbackFromCandidate> FeedbackFromCandidates { get; set; } = null!;
        public virtual DbSet<Interview> Interviews { get; set; } = null!;
        public virtual DbSet<InterviewXrecruiter> InterviewXrecruiters { get; set; } = null!;
        public virtual DbSet<Job> Jobs { get; set; } = null!;
        public virtual DbSet<JobLevel> JobLevels { get; set; } = null!;
        public virtual DbSet<JobType> JobTypes { get; set; } = null!;
        public virtual DbSet<Recruiter> Recruiters { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=tcp:uptech.database.windows.net,1433;Initial Catalog=uptechdb;Persist Security Info=False;User ID=uptech_admin;Password=Copernic@1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BuilderOption>(entity =>
            {
                entity.ToTable("BuilderOption");

                entity.Property(e => e.BuilderOptionId).ValueGeneratedNever();

                entity.Property(e => e.BuilderOptionMessage).HasMaxLength(50);
            });

            modelBuilder.Entity<Candidate>(entity =>
            {
                entity.HasKey(e => e.CandidateToken);

                entity.ToTable("Candidate");

                entity.Property(e => e.CandidateToken).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.Candidates)
                    .HasForeignKey(d => d.JobId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Candidate_Job");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("Company");

                entity.Property(e => e.CompanyId).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasMany(d => d.BuilderOptions)
                    .WithMany(p => p.Companies)
                    .UsingEntity<Dictionary<string, object>>(
                        "CompanyXbuilderOption",
                        l => l.HasOne<BuilderOption>().WithMany().HasForeignKey("BuilderOptionId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_CompanyXBuilderOptions_BuilderOption"),
                        r => r.HasOne<Company>().WithMany().HasForeignKey("CompanyId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_CompanyXBuilderOptions_Company"),
                        j =>
                        {
                            j.HasKey("CompanyId", "BuilderOptionId");

                            j.ToTable("CompanyXBuilderOptions");
                        });
            });

            modelBuilder.Entity<Cv>(entity =>
            {
                entity.HasKey(e => e.CandidateToken);

                entity.ToTable("CV");

                entity.Property(e => e.CandidateToken).ValueGeneratedNever();

                entity.Property(e => e.Cv1).HasColumnName("CV");

                entity.HasOne(d => d.CandidateTokenNavigation)
                    .WithOne(p => p.Cv)
                    .HasForeignKey<Cv>(d => d.CandidateToken)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CV_Candidate");
            });

            modelBuilder.Entity<FeedbackFromCandidate>(entity =>
            {
                entity.HasKey(e => e.CandidateToken);

                entity.ToTable("FeedbackFromCandidate");

                entity.Property(e => e.CandidateToken).ValueGeneratedNever();

                entity.HasOne(d => d.CandidateTokenNavigation)
                    .WithOne(p => p.FeedbackFromCandidate)
                    .HasForeignKey<FeedbackFromCandidate>(d => d.CandidateToken)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FeedbackFromCandidate_Candidate");
            });

            modelBuilder.Entity<Interview>(entity =>
            {
                entity.ToTable("Interview");

                entity.Property(e => e.InterviewId).ValueGeneratedNever();

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.HasOne(d => d.CandidateTokenNavigation)
                    .WithMany(p => p.Interviews)
                    .HasForeignKey(d => d.CandidateToken)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Interview_Candidate");
            });

            modelBuilder.Entity<InterviewXrecruiter>(entity =>
            {
                entity.HasKey(e => new { e.InterviewId, e.RecruiterId });

                entity.ToTable("InterviewXRecruiter");

                entity.HasOne(d => d.Interview)
                    .WithMany(p => p.InterviewXrecruiters)
                    .HasForeignKey(d => d.InterviewId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InterviewXRecruiter_Interview");

                entity.HasOne(d => d.Recruiter)
                    .WithMany(p => p.InterviewXrecruiters)
                    .HasForeignKey(d => d.RecruiterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InterviewXRecruiter_Recruiter");
            });

            modelBuilder.Entity<Job>(entity =>
            {
                entity.ToTable("Job");

                entity.Property(e => e.JobId).ValueGeneratedNever();

                entity.Property(e => e.Title).HasMaxLength(50);

                entity.HasOne(d => d.JobLevelNavigation)
                    .WithMany(p => p.Jobs)
                    .HasForeignKey(d => d.JobLevel)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Job_JobLevel");

                entity.HasOne(d => d.JobTypeNavigation)
                    .WithMany(p => p.Jobs)
                    .HasForeignKey(d => d.JobType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Job_JobType");

                entity.HasOne(d => d.Recruiter)
                    .WithMany(p => p.Jobs)
                    .HasForeignKey(d => d.RecruiterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Job_Recruiter");
            });

            modelBuilder.Entity<JobLevel>(entity =>
            {
                entity.ToTable("JobLevel");

                entity.Property(e => e.JobLevelId).ValueGeneratedNever();

                entity.Property(e => e.JobLevel1)
                    .HasMaxLength(50)
                    .HasColumnName("JobLevel");
            });

            modelBuilder.Entity<JobType>(entity =>
            {
                entity.ToTable("JobType");

                entity.Property(e => e.JobTypeId).ValueGeneratedNever();

                entity.Property(e => e.JobType1)
                    .HasMaxLength(50)
                    .HasColumnName("JobType");
            });

            modelBuilder.Entity<Recruiter>(entity =>
            {
                entity.ToTable("Recruiter");

                entity.Property(e => e.RecruiterId).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Recruiters)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recruiter_Company");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Recruiters)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recruiter_Role");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.RoleId).ValueGeneratedNever();

                entity.Property(e => e.Role1)
                    .HasMaxLength(50)
                    .HasColumnName("Role");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
