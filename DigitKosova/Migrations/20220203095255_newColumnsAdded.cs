using Microsoft.EntityFrameworkCore.Migrations;

namespace DigitKosova.Migrations
{
    public partial class newColumnsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfessorId",
                table: "Grading",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Grading_ProfessorId",
                table: "Grading",
                column: "ProfessorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Grading_AspNetUsers_ProfessorId",
                table: "Grading",
                column: "ProfessorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grading_AspNetUsers_ProfessorId",
                table: "Grading");

            migrationBuilder.DropIndex(
                name: "IX_Grading_ProfessorId",
                table: "Grading");

            migrationBuilder.DropColumn(
                name: "ProfessorId",
                table: "Grading");
        }
    }
}
