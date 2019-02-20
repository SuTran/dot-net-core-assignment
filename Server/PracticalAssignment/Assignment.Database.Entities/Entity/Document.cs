using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PracticalAssignment.Database.Entities.Entity
{
    [Table("Document", Schema = "practical_admin")]
   public class Document
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string FileUrl { get; set; }

        public string Description { get; set; }

        [ForeignKey("LibraryId")]
        public Guid LibraryId { get; set; }

        public virtual Library Library { get; set; } // FK_Document_Library
    }
}
