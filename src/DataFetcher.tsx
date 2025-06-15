import React, { useState, useEffect } from "react";
export {};
// Define the interface for the data we expect to receive
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function DataFetcher() {
  // Use the Post[] type for the 'posts' state
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch data from JSONPlaceholder API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        // Check if the response is ok (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response as an array of Post objects
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        // Type narrowing for error handling
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Call the fetch function when the component mounts

    // Optional: Cleanup function (e.g., for aborting fetch requests)
    return () => {
      // Use AbortController for cleanup if needed
    };
  }, []); // Empty dependency array ensures this effect runs only once

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Posts from JSONPlaceholder</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetcher;
