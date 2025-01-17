import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from "..";

interface PagenationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagenation: React.FC<PagenationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow px-6 py-4 mb-8">
      <Button
        onClick={() => setPage((prev) => Math.max(0, prev - 1))}
        disabled={page === 0}
        className="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Previous
      </Button>
      <span className="text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
        Page {page + 1}/{totalPages}
      </span>
      <Button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page + 1 === totalPages}
        className="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <FaArrowRight className="ml-2" />
      </Button>
    </div>
  );
};

export default Pagenation;
