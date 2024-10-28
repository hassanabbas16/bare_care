// app/api/user/route.js

export async function GET(req) {
    // Simulated user data (replace this with database logic)
    const userData = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        orderHistory: [],
        addresses: [
            { name: 'Home', address: '123 Main St, Anytown, 12345' },
            { name: 'Office', address: '456 Office Rd, Bigcity, 67890' },
        ],
    };

    return new Response(JSON.stringify(userData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
