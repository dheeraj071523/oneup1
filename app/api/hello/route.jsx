export const GET = async (request) => {
    return new Response("<h1>Hello, API! this is get</h1>", {
        status: 200,
        headers: {
            "Content-Type": "text/html",
        },
    });
};

export const POST = async (request) => {
    const body = await request.json();
    console.log(body);
    return new Response(`Hello, API! this is post. your post is: ${JSON.stringify(body)}`);
};
