import Image from "next/image";
import { Search, MessageSquare } from 'lucide-react';


export default function Home() {
  return (

    <div className="col">
      <div className="bg-indigo-50 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800 mb-2">Welcome to Connection Currency</h1>
            <p className="text-gray-700">Make meaningful connections and earn rewards for helping others.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded">NOVICE NETWORKER</span>
          </div>
        </div>

        {/* Two Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">I need a connection</h3>
            <p className="text-gray-600 text-sm mb-3">Post a request when you need to be connected with someone. You don't need points to post a request!</p>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center justify-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span>Post a Connection Request</span>
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">I can help connect people</h3>
            <p className="text-gray-600 text-sm mb-3">Browse requests and make connections to earn points when you successfully connect people.</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center">
              <Search className="h-5 w-5 mr-2" />
              <span>Find People to Connect</span>
            </button>
          </div>
        </div>
      </div>
    </div>



  );
}
