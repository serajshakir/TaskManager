using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagerBackendTest.Api.Migrations
{
    /// <inheritdoc />
    public partial class initCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "TaskManagers");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "TaskManagers");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "TaskManagers");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "TaskManagers",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationUser",
                keyColumn: "Id",
                keyValue: "administrator",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2099ccda-6e16-474e-bbfe-21791b4f8a6c", "AQAAAAIAAYagAAAAEBdxqmg8cyxjX7iORFT17hfD2sIzXU7Gzv1gFs2ib4yH9XydI8LpEKX/O1xWJCfSbw==", "3b2aa3c6-23ab-455c-a42f-9b637eb9221b" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "TaskManagers",
                type: "varchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IsCompleted",
                table: "TaskManagers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "TaskManagers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "TaskManagers",
                type: "longtext",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ApplicationUser",
                keyColumn: "Id",
                keyValue: "administrator",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "872606f1-bc0c-4e07-aaf1-2634446c1eb4", "AQAAAAIAAYagAAAAEIaqpZcAC4aavJffP15xx94LuzESWKex3ICioMCVYBIuufyc78+iQWZZBe/Pt6Tk9A==", "29732807-82bd-44f4-a088-4e17f642cf08" });
        }
    }
}
