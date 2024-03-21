import React, { useState, useEffect } from "react";
import axios from "axios";

interface InfiniteScrollProps {
  fetchData: (page: number) => Promise<any>; // Function to fetch data for a given page
  renderItem: (item: any) => React.ReactNode; // Function to render each item
  threshold?: number; // Optional threshold for triggering loading before reaching the bottom
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  fetchData,
  renderItem,
  threshold = 300,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage)
      .then((newItems: any[]) => {
        setItems((prevItems) => [...prevItems, ...newItems]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage, fetchData]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - threshold
    ) {
      if (!loading) {
        setLoading(true);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
