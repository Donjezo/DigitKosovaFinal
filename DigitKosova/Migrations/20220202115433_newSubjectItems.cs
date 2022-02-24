using Microsoft.EntityFrameworkCore.Migrations;

namespace DigitKosova.Migrations
{
    public partial class newSubjectItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Literature",
                table: "Subjects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "News",
                table: "Subjects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Topics",
                table: "Subjects",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Literature",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "News",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "Topics",
                table: "Subjects");
        }
    }
}
