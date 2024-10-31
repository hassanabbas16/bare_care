// app/api/posts/[id]/route.js

// Simulated in-memory blog data for demonstration. Replace with real database logic in production.
let blogs = [
    { id: 1, title: 'The Importance of Skincare', content: 'Skincare is crucial...' },
    { id: 2, title: 'Best Skincare Products', content: 'Here are the top 5 products...' }
];

export async function GET(req, { params }) {
    const { id } = params; // Get the blog ID from the route parameters
    const blog = blogs.find((b) => b.id == id); // Find the blog with the matching ID

    if (blog) {
        return new Response(JSON.stringify(blog), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify({ error: 'Blog not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
