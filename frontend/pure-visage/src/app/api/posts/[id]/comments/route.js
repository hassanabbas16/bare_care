// app/api/posts/[id]/comments/route.js

let blogs = [
    { id: 1, title: 'The Importance of Skincare', content: 'Skincare is crucial...', comments: [], likes: 0 },
    { id: 2, title: 'Best Skincare Products', content: 'Here are the top 5 products...', comments: [], likes: 0 }
];

export async function POST(req, { params }) {
    const { id } = params; // Get the blog post ID from the route parameters
    const newComment = await req.json(); // Get the comment content from the request body

    const blog = blogs.find((b) => b.id == id); // Find the blog with the matching ID
    if (!blog) {
        return new Response(JSON.stringify({ error: 'Blog not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    blog.comments.push(newComment); // Add the new comment to the blog's comments

    return new Response(JSON.stringify(newComment), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}
