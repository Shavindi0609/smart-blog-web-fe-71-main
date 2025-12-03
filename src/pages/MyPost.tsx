import { useEffect, useState } from "react"
import axios from "axios"

export default function MyPost() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMyPosts()
  }, [])

  const loadMyPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/posts/my-posts")
      setPosts(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`)
      setPosts(posts.filter((p: any) => p._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div>Loading your posts...</div>

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Posts
      </h1>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-xl">
          You haven't created any posts yet.
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow-md p-5 
            hover:shadow-xl transition-all duration-300 
            border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.content}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => alert("Edit page not implemented")}
                className="
                  bg-blue-600 text-white px-3 py-1 rounded-lg 
                  hover:bg-blue-700 transition
                "
              >
                Edit
              </button>

              <button
                onClick={() => deletePost(post._id)}
                className="
                  bg-red-600 text-white px-3 py-1 rounded-lg 
                  hover:bg-red-700 transition
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
