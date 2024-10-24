// app/api/posts/route.js

let blogs = []; // Simulated in-memory data. Use a database in production.

export async function GET(req) {
    return new Response(JSON.stringify(blogs), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req) {
    const newBlog = await req.json();
    newBlog.id = Date.now(); // Assign a unique ID
    blogs.push(newBlog);

    return new Response(JSON.stringify(newBlog), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}
