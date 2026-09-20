// Query Bench V2
// E-commerce practice database

const QUERY_BENCH_DATABASE = {

    customers: {
        columns: [
            "customer_id",
            "name",
            "city",
            "segment",
            "signup_date"
        ],

        rows: [
            [1, "Ravi Sen", "Kolkata", "Retail", "2022-01-14"],
            [2, "Meera Iyer", "Bengaluru", "Retail", "2022-02-03"],
            [3, "Arjun Nair", "Kolkata", "Wholesale", "2021-11-20"],
            [4, "Priya Das", "Mumbai", "Retail", "2023-03-11"],
            [5, "Karan Mehta", "Delhi", "Wholesale", "2022-07-08"],
            [6, "Sara Khan", "Mumbai", "Retail", "2023-01-25"],
            [7, "Vikram Rao", "Chennai", "Wholesale", "2021-09-02"],
            [8, "Anita Roy", "Kolkata", "Retail", "2022-12-19"],
            [9, "Divya Pillai", "Bengaluru", "Retail", "2023-05-30"],
            [10, "Rohan Gupta", "Delhi", "Wholesale", "2022-04-17"],
            [11, "Neha Kapoor", "Pune", "Retail", "2023-07-01"]
        ]
    },

    products: {
        columns: [
            "product_id",
            "name",
            "category",
            "price"
        ],

        rows: [
            [1, "Wireless Mouse", "Electronics", 799],
            [2, "Mechanical Keyboard", "Electronics", 3499],
            [3, "USB-C Hub", "Electronics", 1299],
            [4, "Notebook Set", "Stationery", 249],
            [5, "Gel Pen Pack", "Stationery", 99],
            [6, "Desk Lamp", "Home", 1599],
            [7, "Office Chair", "Home", 6999],
            [8, "Water Bottle", "Home", 449],
            [9, "Backpack", "Accessories", 1899],
            [10, "Wireless Earbuds", "Electronics", 2299],
            [11, "Sticky Notes", "Stationery", 79],
            [12, "Monitor Stand", "Home", 899],
            [13, "Desk Organizer", "Home", 349]
        ]
    },

    orders: {
        columns: [
            "order_id",
            "customer_id",
            "order_date",
            "status"
        ],

        rows: [
            [1, 1, "2023-01-10", "Delivered"],
            [2, 2, "2023-01-15", "Delivered"],
            [3, 3, "2023-01-20", "Cancelled"],
            [4, 4, "2023-02-05", "Delivered"],
            [5, 5, "2023-02-14", "Pending"],
            [6, 6, "2023-02-20", "Delivered"],
            [7, 7, "2023-03-01", "Delivered"],
            [8, 8, "2023-03-12", "Pending"],
            [9, 9, "2023-03-18", "Delivered"],
            [10, 10, "2023-04-02", "Delivered"],
            [11, 11, "2023-04-15", "Delivered"],
            [12, 1, "2023-05-01", "Delivered"],
            [13, 2, "2023-05-10", "Cancelled"],
            [14, 3, "2023-05-22", "Delivered"],
            [15, 4, "2023-06-03", "Delivered"],
            [16, 5, "2023-06-17", "Pending"],
            [17, 6, "2023-07-02", "Delivered"],
            [18, 7, "2023-07-14", "Delivered"],
            [19, 8, "2023-08-01", "Delivered"],
            [20, 9, "2023-08-15", "Pending"]
        ]
    },

    order_items: {
        columns: [
            "order_item_id",
            "order_id",
            "product_id",
            "quantity"
        ],

        rows: [
            [1, 1, 1, 2],
            [2, 1, 4, 1],
            [3, 2, 2, 1],
            [4, 3, 5, 3],
            [5, 4, 7, 1],
            [6, 5, 3, 1],
            [7, 5, 6, 2],
            [8, 6, 9, 1],
            [9, 7, 10, 1],
            [10, 7, 11, 5],
            [11, 8, 1, 1],
            [12, 9, 7, 1],
            [13, 10, 2, 1],
            [14, 10, 8, 2],
            [15, 11, 4, 2],
            [16, 11, 5, 4],
            [17, 12, 12, 1],
            [18, 13, 9, 1],
            [19, 14, 3, 2],
            [20, 14, 10, 1],
            [21, 15, 7, 1],
            [22, 16, 1, 3],
            [23, 16, 6, 1],
            [24, 17, 8, 3],
            [25, 17, 10, 1],
            [26, 18, 2, 1],
            [27, 18, 4, 1],
            [28, 19, 6, 1],
            [29, 20, 12, 2],
            [30, 20, 9, 1]
        ]
    }

};

// Create all Query Bench tables in AlaSQL
function initializeQueryBenchDatabase() {

    // Remove existing tables
    Object.keys(QUERY_BENCH_DATABASE).forEach(function(tableName) {
        alasql("DROP TABLE IF EXISTS " + tableName);
    });

    // Create and populate each table
    Object.keys(QUERY_BENCH_DATABASE).forEach(function(tableName) {

        var table = QUERY_BENCH_DATABASE[tableName];

        // Build CREATE TABLE statement
        var columnDefinitions = table.columns.map(function(columnName, index) {

            var sampleValue = table.rows.length > 0
                ? table.rows[0][index]
                : null;

            var dataType = "STRING";

            if (typeof sampleValue === "number") {
                dataType = Number.isInteger(sampleValue)
                    ? "INT"
                    : "NUMBER";
            }

            return columnName + " " + dataType;

        }).join(", ");

        alasql(
            "CREATE TABLE " +
            tableName +
            " (" +
            columnDefinitions +
            ")"
        );

        // Insert rows
        if (table.rows.length > 0) {

            var placeholders = table.columns
                .map(function() {
                    return "?";
                })
                .join(", ");

            var insertSQL =
                "INSERT INTO " +
                tableName +
                " VALUES (" +
                placeholders +
                ")";

            table.rows.forEach(function(row) {
                alasql(insertSQL, row);
            });
        }
    });

    console.log(
        "Query Bench database initialized:",
        Object.keys(QUERY_BENCH_DATABASE)
    );
}