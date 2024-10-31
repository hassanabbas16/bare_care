// app/api/posts/[id]/like/route.js

let blogs = [
    { id: 1, title: 'The Importance of Skincare', content: 'Skincare is crucial...', comments: [], likes: 0 },
    { id: 2, title: 'Best Skincare Products', content: 'Here are the top 5 products...', comments: [], likes: 0 }
];

export async function POST(req, { params }) {
    const { id } = params; // Get the blog post ID from the route parameters

    const blog = blogs.find((b) => b.id == id); // Find the blog with the matching ID
    if (!blog) {
        return new Response(JSON.stringify({ error: 'Blog not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    blog.likes += 1; // Increment the likes count

    return new Response(JSON.stringify({ likes: blog.likes }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
