﻿using Microsoft.EntityFrameworkCore;

namespace TodoApi
{
    public partial class ToDoDbContext : DbContext
    {
        public ToDoDbContext() { }

        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options) { }

        public virtual DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasKey(e => e.IdItems).HasName("PRIMARY");
                entity.ToTable("items");
                entity.Property(e => e.IdItems)
                      .HasColumnName("idItems")
                      .ValueGeneratedOnAdd();
                entity.Property(e => e.Name)
                      .HasMaxLength(100)
                      .IsRequired();
                entity.Property(e => e.IsComplete)
                      .HasColumnName("isComplete")
                      .HasDefaultValue(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
