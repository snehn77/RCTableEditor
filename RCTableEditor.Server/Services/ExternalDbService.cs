using Microsoft.Data.SqlClient;
using RCTableEditor.Server.Models;
using System.Data;
using System.Text;

namespace RCTableEditor.Server.Services
{
    public class ExternalDbService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<ExternalDbService> _logger;

        public ExternalDbService(IConfiguration configuration, ILogger<ExternalDbService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<(IEnumerable<TableData> data, int totalCount)> QueryTableDataAsync(
            int processId,
            IEnumerable<int> layerIds,
            IEnumerable<int>? operationIds = null,
            int page = 1,
            int pageSize = 50)
        {
            var connectionString = _configuration.GetConnectionString("ExternalDatabase");

            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            // Build the query with parameters to prevent SQL injection
            var queryBuilder = new StringBuilder();
            queryBuilder.Append("SELECT * FROM TableData WHERE ProcessId = @ProcessId AND LayerId IN (");

            // Add parameters for layer IDs
            for (int j = 0; j < layerIds.Count(); j++)
            {
                queryBuilder.Append(j > 0 ? ", " : "");
                queryBuilder.Append($"@LayerId{j}");
            }
            queryBuilder.Append(")");

            // Add operation IDs if provided
            // Add operation IDs if provided
            if (operationIds != null && operationIds.Any())
            {
                queryBuilder.Append(" AND OperationId IN (");
                for (int j = 0; j < operationIds.Count(); j++)
                {
                    queryBuilder.Append(j > 0 ? ", " : "");
                    queryBuilder.Append($"@OperationId{j}");
                }
                queryBuilder.Append(")");
            }

            // Count query to get total records
            var countQuery = $"SELECT COUNT(*) FROM ({queryBuilder}) AS CountQuery";

            // Add pagination
            queryBuilder.Append(" ORDER BY LayerId, OperationId");
            queryBuilder.Append(" OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY");

            using var command = new SqlCommand(queryBuilder.ToString(), connection);

            // Add parameters
            command.Parameters.AddWithValue("@ProcessId", processId);

            int i = 0;
            foreach (var layerId in layerIds)
            {
                command.Parameters.AddWithValue($"@LayerId{i}", layerId);
                i++;
            }

            if (operationIds != null)
            {
                i = 0;
                foreach (var operationId in operationIds)
                {
                    command.Parameters.AddWithValue($"@OperationId{i}", operationId);
                    i++;
                }
            }

            command.Parameters.AddWithValue("@Offset", (page - 1) * pageSize);
            command.Parameters.AddWithValue("@PageSize", pageSize);

            // First get the total count
            var countCommand = new SqlCommand(countQuery, connection);
            // Add same parameters
            countCommand.Parameters.AddWithValue("@ProcessId", processId);

            i = 0;
            foreach (var layerId in layerIds)
            {
                countCommand.Parameters.AddWithValue($"@LayerId{i}", layerId);
                i++;
            }

            if (operationIds != null)
            {
                i = 0;
                foreach (var operationId in operationIds)
                {
                    countCommand.Parameters.AddWithValue($"@OperationId{i}", operationId);
                    i++;
                }
            }

            int totalCount = (int)await countCommand.ExecuteScalarAsync();

            // Execute the main query
            using var reader = await command.ExecuteReaderAsync();
            var results = new List<TableData>();

            while (await reader.ReadAsync())
            {
                results.Add(MapReaderToTableData(reader));
            }

            return (results, totalCount);
        }

        private TableData MapReaderToTableData(SqlDataReader reader)
        {
            return new TableData
            {
                TableDataId = reader.GetInt32(reader.GetOrdinal("TableDataId")),
                ProcessId = reader.GetInt32(reader.GetOrdinal("ProcessId")),
                LayerId = reader.GetInt32(reader.GetOrdinal("LayerId")),
                DefectTypeId = reader.GetInt32(reader.GetOrdinal("DefectTypeId")),
                OperationId = reader.GetInt32(reader.GetOrdinal("OperationId")),
                ClassType = reader.IsDBNull(reader.GetOrdinal("ClassType")) ? null : reader.GetString(reader.GetOrdinal("ClassType")),
                ProductId = reader.IsDBNull(reader.GetOrdinal("ProductId")) ? null : reader.GetInt32(reader.GetOrdinal("ProductId")),
                EntityConfidence = reader.IsDBNull(reader.GetOrdinal("EntityConfidence")) ? null : reader.GetInt32(reader.GetOrdinal("EntityConfidence")),
                Comments = reader.IsDBNull(reader.GetOrdinal("Comments")) ? null : reader.GetString(reader.GetOrdinal("Comments")),
                GenericData1 = reader.IsDBNull(reader.GetOrdinal("GenericData1")) ? null : reader.GetString(reader.GetOrdinal("GenericData1")),
                GenericData2 = reader.IsDBNull(reader.GetOrdinal("GenericData2")) ? null : reader.GetString(reader.GetOrdinal("GenericData2")),
                GenericData3 = reader.IsDBNull(reader.GetOrdinal("GenericData3")) ? null : reader.GetString(reader.GetOrdinal("GenericData3")),
                EdiAttribution = reader.IsDBNull(reader.GetOrdinal("EdiAttribution")) ? null : reader.GetString(reader.GetOrdinal("EdiAttribution")),
                EdiAttributionList = reader.IsDBNull(reader.GetOrdinal("EdiAttributionList")) ? null : reader.GetString(reader.GetOrdinal("EdiAttributionList")),
                SecurityCode = reader.IsDBNull(reader.GetOrdinal("SecurityCode")) ? null : reader.GetInt32(reader.GetOrdinal("SecurityCode")),
                LastModified = reader.GetDateTime(reader.GetOrdinal("LastModified")),
                LastModifiedBy = reader.GetString(reader.GetOrdinal("LastModifiedBy")),
                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                CreatedBy = reader.IsDBNull(reader.GetOrdinal("CreatedBy")) ? null : reader.GetString(reader.GetOrdinal("CreatedBy")),
                RowVersion = reader.GetInt32(reader.GetOrdinal("RowVersion")),
                IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted"))
            };
        }
    }
}