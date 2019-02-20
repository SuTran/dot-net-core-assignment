using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PracticalAssignment.Database.Entities.Entity
{
    [Table("Library", Schema = "practical_admin")]
    public class Library
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        public string Description { get; set; }

        /// <summary>
        /// Child Document where [Document].[Id] point to this entity (FK_Document_Library)
        /// </summary>
        public virtual ICollection<Document> Documents { get; set; } // Document.FK_Document_CatMain
    }
}
