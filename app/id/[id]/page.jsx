const DynamicPage = async ({ params }) => {
    const { id } = await params;
    return (
        <div>
            <h1>Dynamic Page</h1>
            <p>Current ID: {id}</p>
        </div>
    );
};

export default DynamicPage;
