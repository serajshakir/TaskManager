using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagerBackendTest.Api.Migrations
{
    /// <inheritdoc />
    public partial class initCreate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationUser",
                keyColumn: "Id",
                keyValue: "administrator",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b9a06c86-1f2f-457e-a4ec-a38bff8ffb08", "AQAAAAIAAYagAAAAEMb2ivj28wpih7Kx54JJnx8/7+WfTG8o8K0zROL46BhNB7UPF4d1JyzZIDUg7bZQDg==", "170b24a9-8d88-4eac-ac4c-6c1ecc4ad553" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ApplicationUser",
                keyColumn: "Id",
                keyValue: "administrator",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "215af363-196a-452a-9a35-0f1ecfe8fbca", "AQAAAAIAAYagAAAAEHdvCwyUU9OK412YUTCg1NiqsY5S7WMktWRJ8XJz5wLiXSTgcxBvgWVLFEoYcspqzg==", "0f8eb644-498d-4cc4-80c1-27d176e5657f" });
        }
    }
}
