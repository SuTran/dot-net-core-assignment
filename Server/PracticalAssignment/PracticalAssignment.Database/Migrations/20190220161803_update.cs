using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PracticalAssignment.Database.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Document_Library_LibraryId",
                schema: "practical_admin",
                table: "Document");

            migrationBuilder.AlterColumn<Guid>(
                name: "LibraryId",
                schema: "practical_admin",
                table: "Document",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Document_Library_LibraryId",
                schema: "practical_admin",
                table: "Document",
                column: "LibraryId",
                principalSchema: "practical_admin",
                principalTable: "Library",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Document_Library_LibraryId",
                schema: "practical_admin",
                table: "Document");

            migrationBuilder.AlterColumn<Guid>(
                name: "LibraryId",
                schema: "practical_admin",
                table: "Document",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddForeignKey(
                name: "FK_Document_Library_LibraryId",
                schema: "practical_admin",
                table: "Document",
                column: "LibraryId",
                principalSchema: "practical_admin",
                principalTable: "Library",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
