"use client";

const Error = ({ error, reset }) => {
    return (
        <div>
            <p>Error: {error.message}</p>
            <button onClick={() => reset()}>Retry</button>
        </div>
    );
};

export default Error;
