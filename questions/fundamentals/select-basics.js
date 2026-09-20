const FUNDAMENTALS_QUESTIONS = [

    {
        id: "INT-001",

        title: "Customers Who Never Ordered",

        topic: "Interview SQL",

        subtopic: "LEFT JOIN",

        difficulty: "medium",

        experience: "2-4 years",

        roles: [
            "Data Analyst",
            "Data Engineer",
            "ETL Tester"
        ],

        tables: [
            "customers",
            "orders"
        ],

        prompt:
            "Find the name and city of every customer who has never placed an order.",

        hint:
            "Try a LEFT JOIN between customers and orders. What value will appear when a customer has no matching order?",

        solution:
            `SELECT c.name, c.city
             FROM customers c
             LEFT JOIN orders o
             ON c.customer_id = o.customer_id
             WHERE o.order_id IS NULL`,

        explanation:
            "A LEFT JOIN keeps every customer. Customers who have never placed an order will have NULL values for the matching orders columns. Filtering for NULL identifies those customers.",

        tags: [
            "LEFT JOIN",
            "NULL",
            "Anti Join"
        ]
    }

];