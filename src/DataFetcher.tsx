import React, { useState, useEffect } from "react";
export {};

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * DataFetcher component fetches and displays posts from a JSONPlaceholder API.
 */
function DataFetcher() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Fetches posts from the API.
     */
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      // Cleanup if needed
    };
  }, []);

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
