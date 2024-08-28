import { Button } from "@/components/ui/button";
import blogService from "@/features/services/blogService";
import { CreateBlogInput } from "@manikdevbhagat/common";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const [blog, setBlog] = useState<CreateBlogInput>({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [id]: value }));
  };

  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!blog.title || !blog.content) {
      toast.error("Please enter a title and content");
      return;
    }
    try {
      setIsLoading(true); // Set loading state to true
      await blogService.createBlog(blog);
      toast.success("Blog will be published after review!");
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 items-center p-5">
      <div className="w-full max-w-[720px] flex flex-col gap-2">
        <input
          ref={inputRef}
          type="text"
          id="title"
          value={blog.title}
          onChange={handleInputChange}
          className="w-full p-4 text-[48px] font-serif outline-none bg-transparent"
          placeholder="Title"
        />

        <textarea
          id="content"
          value={blog.content}
          onChange={handleInputChange}
          rows={15}
          className="w-full p-4 text-xl font-serif outline-none bg-transparent"
          placeholder="Tell your story..."
        />
        <Button
          onClick={handlePublish}
          className="fixed top-[12px] right-[100px] z-20 bg-green-600 hover:bg-green-700 rounded-2xl h-8"
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? "Loading..." : "Publish"}
        </Button>
      </div>
    </div>
  );
};

export default WriteBlog;
